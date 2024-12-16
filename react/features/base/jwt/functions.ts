// @ts-ignore
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";

import { IReduxState } from "../../app/types";
import { getLocalParticipant } from "../participants/functions";
import { parseURLParams } from "../util/parseURLParams";

import { JWT_VALIDATION_ERRORS, MEET_FEATURES } from "./constants";
import logger from "./logger";

/**
 * Retrieves the JSON Web Token (JWT), if any, defined by a specific
 * {@link URL}.
 *
 * @param {URL} url - The {@code URL} to parse and retrieve the JSON Web Token
 * (JWT), if any, from.
 * @returns {string} The JSON Web Token (JWT), if any, defined by the specified
 * {@code url}; otherwise, {@code undefined}.
 */
export function parseJWTFromURLParams(
    url: URL | typeof window.location = window.location
) {
    // @ts-ignore
    return parseURLParams(url, true, "search").jwt;
}

/**
 * Returns the user name after decoding the jwt.
 *
 * @param {IReduxState} state - The app state.
 * @returns {string}
 */
export function getJwtName(state: IReduxState) {
    const { user } = state["features/base/jwt"];

    return user?.name;
}

/**
 * Check if the given JWT feature is enabled.
 *
 * @param {IReduxState} state - The app state.
 * @param {string} feature - The feature we want to check.
 * @param {boolean} ifNoToken - Default value if there is no token.
 * @param {boolean} ifNotInFeatures - Default value if features prop exists but does not have the {@code feature}.
 * @returns {bolean}
 */
export function isJwtFeatureEnabled(
    state: IReduxState,
    feature: string,
    ifNoToken = false,
    ifNotInFeatures = false
) {
    const { jwt } = state["features/base/jwt"];

    if (!jwt) {
        return ifNoToken;
    }

    const { features } = getLocalParticipant(state) || {};

    // If `features` is undefined, act as if everything is enabled.
    if (typeof features === "undefined") {
        return true;
    }

    if (typeof features[feature as keyof typeof features] === "undefined") {
        return ifNotInFeatures;
    }

    return String(features[feature as keyof typeof features]) === "true";
}

/**
 * Checks whether a given timestamp is a valid UNIX timestamp in seconds.
 * We convert to milliseconds during the check since `Date` works with milliseconds for UNIX timestamp values.
 *
 * @param {any} timestamp - A UNIX timestamp in seconds as stored in the jwt.
 * @returns {boolean} - Whether the timestamp is indeed a valid UNIX timestamp or not.
 */
function isValidUnixTimestamp(timestamp: number | string) {
    return (
        typeof timestamp === "number" &&
        timestamp * 1000 === new Date(timestamp * 1000).getTime()
    );
}

/**
 * Returns a list with all validation errors for the given jwt.
 *
 * @param {string} jwt - The jwt.
 * @returns {Array} - An array containing all jwt validation errors.
 */
export function validateJwt(jwt: string) {
    const errors: Object[] = [];
    const currentTimestamp = new Date().getTime();

    try {
        const header = jwtDecode(jwt, { header: true });
        const payload = jwtDecode(jwt);

        if (!header) {
            errors.push({ key: JWT_VALIDATION_ERRORS.HEADER_NOT_FOUND });

            return errors;
        }

        if (!payload) {
            errors.push({ key: JWT_VALIDATION_ERRORS.PAYLOAD_NOT_FOUND });

            return errors;
        }

        const { aud, context, exp, iss, nbf, sub } = payload;

        // JaaS only
        if (sub?.startsWith("vpaas-magic-cookie")) {
            const { kid } = header;

            // if Key ID is missing, we return the error immediately without further validations.
            if (!kid) {
                errors.push({ key: JWT_VALIDATION_ERRORS.KID_NOT_FOUND });

                return errors;
            }

            if (kid.substring(0, kid.indexOf("/")) !== sub) {
                errors.push({ key: JWT_VALIDATION_ERRORS.KID_MISMATCH });
            }

            if (aud !== "jitsi") {
                errors.push({ key: JWT_VALIDATION_ERRORS.AUD_INVALID });
            }

            if (iss !== "chat") {
                errors.push({ key: JWT_VALIDATION_ERRORS.ISS_INVALID });
            }

            if (!context?.features) {
                errors.push({ key: JWT_VALIDATION_ERRORS.FEATURES_NOT_FOUND });
            }
        }

        // if (!isValidUnixTimestamp(nbf)) {
        //     errors.push({ key: JWT_VALIDATION_ERRORS.NBF_INVALID });
        // } else if (currentTimestamp < nbf * 1000) {
        //     errors.push({ key: JWT_VALIDATION_ERRORS.NBF_FUTURE });
        // }

        // Allow permanent token
        if (exp) {
            if (!isValidUnixTimestamp(exp)) {
                errors.push({ key: JWT_VALIDATION_ERRORS.EXP_INVALID });
            } else if (currentTimestamp > exp * 1000) {
                errors.push({ key: JWT_VALIDATION_ERRORS.TOKEN_EXPIRED });
            }
        }

        if (!context) {
            errors.push({ key: JWT_VALIDATION_ERRORS.CONTEXT_NOT_FOUND });
        } else if (context.features) {
            const { features } = context;
            const meetFeatures = Object.values(MEET_FEATURES);

            Object.keys(features).forEach((feature) => {
                if (meetFeatures.includes(feature)) {
                    const featureValue = features[feature];

                    // cannot use truthy or falsy because we need the exact value and type check.
                    if (
                        featureValue !== true &&
                        featureValue !== false &&
                        featureValue !== "true" &&
                        featureValue !== "false"
                    ) {
                        errors.push({
                            key: JWT_VALIDATION_ERRORS.FEATURE_VALUE_INVALID,
                            args: { feature },
                        });
                    }
                } else {
                    errors.push({
                        key: JWT_VALIDATION_ERRORS.FEATURE_INVALID,
                        args: { feature },
                    });
                }
            });
        }
    } catch (e: any) {
        logger.error(
            `Unspecified JWT error${e?.message ? `: ${e.message}` : ""}`
        );
        errors.push({ key: JWT_VALIDATION_ERRORS.UNKNOWN });
    }

    return errors;
}

interface JwtPayload {
    sub: string;
    aud?: string;
    iss?: string;
    exp?: number;
    nbf?: number;
    context?: { features?: any };
}

export function fakeJwt(username: string): JwtPayload {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000); // Current time in seconds

    // Creating a fake JWT payload
    const fakePayload: JwtPayload = {
        sub: `${username}`, // Dynamically setting the sub with username
        aud: "jitsi", // Assuming "jitsi" as the audience
        iss: "chat", // Assuming "chat" as the issuer
        exp: currentTimestamp + 3600, // Setting expiration time to 1 hour from now
        nbf: currentTimestamp, // Setting the not-before time to now
        context: {
            features: {
                feature1: true,
                feature2: false,
            },
        },
    };

    return fakePayload;
}

function base64UrlEncode(str) {
    return btoa(str)
        .replace(/\+/g, "-") // Replace + with -
        .replace(/\//g, "_") // Replace / with _
        .replace(/=+$/, ""); // Remove padding
}

export function generateJwt(user) {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    const header = {
        alg: "HS256",
        typ: "JWT",
    };

    const payload = {
        context: {
            user: {
                id: user,
                name: user,
                email: user,
            },
        },
        aud: "jitsi",
        iss: "jitsi",
        nbf: currentTime, // Not before
        exp: currentTime + 360000, // Expires in 1 hour
        iat: currentTime, // Issued at
        room: "*",
    };

    // Encode header and payload
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    // Fake signature for demonstration purposes (replace with real signature in production)
    const fakeSignature = "fakeSignature";

    // Return the complete JWT
    return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
}

// Example usage:

/**
 * Extracts and returns the expiration date of jwt.
 *
 * @param {string|undefined} jwt - The jwt to check.
 * @returns {Date} The expiration date of the jwt.
 */
export function getJwtExpirationDate(jwt: string | undefined) {
    if (!jwt) {
        return;
    }

    const payload = jwtDecode(jwt);

    if (payload) {
        const { exp } = payload;

        return new Date(exp * 1000);
    }
}
