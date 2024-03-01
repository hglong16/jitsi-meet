import React, { Component, useState } from "react";
import { WithTranslation } from "react-i18next";
import { connect as reduxConnect, useDispatch } from "react-redux";

import { translate } from "../../../base/i18n/functions";

import Navbar from "../../../welcome/components/Navbar";
import Footer from "../../../welcome/components/Footer";
import { Box, Button, TextField, Typography } from "@mui/material";
import { requestLoggingIn } from "../../functions.any";
import { setJWT } from "../../../base/jwt/actions";
import { red } from "@mui/material/colors";
import { validateJwt } from "../../../base/jwt/functions";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import LoadingIndicator from "../../../base/layouts/dashboard/LoadingIndicator";

/**
 * The type of the React {@code Component} props of {@link LoginPage}.
 */
interface IProps extends WithTranslation {}

/**
 * The type of the React {@code Component} state of {@link LoginPage}.
 */
interface IState {
    /**
     * The user entered password for logging in.
     */
    password: string;

    /**
     * The email entered for logging in.
     */
    email: string;

    /**
     * Authenticate Error
     */
    error: string;

    /**
     * Logging in state
     */
    loggingIn: boolean;
}

/**
 * Component that renders the login in conference dialog.
 *
 *  @returns {React$Element<any>}
 */
const LoginPage = (props: IProps) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        error: "",
    });
    console.log("#### ", formData.error);
    const [loggingIn, setLoggingIn] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    /**
     * Notifies this LoginPage that the login button (OK) has been pressed by
     * the user.
     *
     * @private
     * @returns {void}
     */
    const _onLogin = async () => {
        setLoggingIn(true);
        try {
            const { password, email } = formData;

            // TODO: Integrate with Auth API
            const result = await requestLoggingIn(email, password);

            if (result?.error) {
                setFormData({
                    ...formData,
                    error: result.error.message,
                });
            }

            const jwt = result?.result?.jwt;
            if (jwt) {
                const authErrors = validateJwt(jwt ?? "");

                if (authErrors.length === 0) {
                    dispatch(setJWT(jwt));
                    return navigate("/");
                }
            }
        } catch (error) {
            console.log("####oncatch ", error);
            setFormData({
                ...formData,
                error: (error as any).message,
            });
        } finally {
            setLoggingIn(false);
        }
    };

    /**
     * Callback for the onChange event of the field.
     *
     * @param {string} value - The static event.
     * @returns {void}
     */
    const _onPasswordChange = (event: any) => {
        setFormData({
            ...formData,
            password: event.target.value,
        });
    };

    /**
     * Callback for the onChange event of the username input.
     *
     * @param {string} value - The new value.
     * @returns {void}
     */
    const _onEmailChange = (event: any) => {
        setFormData({
            ...formData,
            email: event.target.value,
        });
    };

    /**
     * Prevents submission of the form and delegates login logic.
     *
     * @param {Event} event - The HTML Event which details the form submission.
     * @private
     * @returns {void}
     */
    const _onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        _onLogin();
    };
    const { t } = props;

    const { email, password } = formData;

    return (
        <div className="welcome login" id="welcome_page">
            {loggingIn && <LoadingIndicator />}
            <div className="banner d-flex flex-column justify-between">
                <Navbar />
                <Footer />
            </div>
            <div className="action-wrapper flex-column d-flex justify-between align-center">
                <div className="d-flex flex-column justify-center align-center flex-grow-1">
                    <div className="login-container">
                        <img
                            alt="powered-by"
                            src="images/powered-by.svg"
                            width={180}
                        />
                        <div className="content__mobile-setting">
                            <h1 className="content__title">Đăng nhập</h1>
                        </div>
                        <div className="mb-2 mt-6 form-wrapper">
                            <div className="form">
                                <Box
                                    component="form"
                                    onSubmit={_onFormSubmit}
                                    noValidate
                                    sx={{ mt: 1 }}
                                >
                                    <TextField
                                        margin="normal"
                                        value={email}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Địa chỉ Email"
                                        name="email"
                                        autoComplete="email"
                                        onChange={_onEmailChange}
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        value={password}
                                        required
                                        fullWidth
                                        name="password"
                                        label={t("dialog.password")}
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={_onPasswordChange}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="large"
                                        sx={{ mt: 3, mb: 2 }}
                                        variant="contained"
                                        color="primary"
                                    >
                                        {t("dialog.login")}
                                    </Button>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "red" }}
                                    >
                                        {formData.error &&
                                        formData.error
                                            .toLowerCase()
                                            .includes("odoo")
                                            ? "Email hoặc mật khẩu không đúng"
                                            : "Xin vui lòng kiểm tra lại đường truyền mạng"}
                                    </Typography>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="powered-by">
                    <div className="d-mobile">
                        <img
                            className="red-logo"
                            alt="powered-by"
                            src="images/Logo-Digital.svg"
                            width={180}
                        />
                        <p className="highlight">
                            CƠ QUAN CỦA TÒA ÁN NHÂN DÂN TỐI CAO
                        </p>
                        <p>Trụ sở Tòa soạn: 262 Đội Cấn, Ba Đình, Hà Nội</p>
                    </div>
                    <p>Powered By Sky Media Group</p>
                </div>
            </div>
        </div>
    );
};

export default translate(LoginPage);
