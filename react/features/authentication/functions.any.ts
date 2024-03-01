import { IConfig } from '../base/config/configType';
import { getBackendSafeRoomName } from '../base/util/uri';
import { SKYMEET_API } from '../../../modules/API/constants';

/**
 * Checks if the token for authentication is available.
 *
 * @param {Object} config - Configuration state object from store.
 * @returns {boolean}
 */
export const isTokenAuthEnabled = (config: IConfig): boolean =>
    typeof config.tokenAuthUrl === 'string' && config.tokenAuthUrl.length > 0;

/**
 * Returns the state that we can add as a parameter to the tokenAuthUrl.
 *
 * @param {string?} roomName - The room name.
 * @param {string?} tenant - The tenant name if any.
 * @param {boolean} skipPrejoin - Whether to skip pre-join page.
 * @param {URL} locationURL - The location URL.
 * @returns {Object} The state object.
 */
export const _getTokenAuthState = (
        roomName: string | undefined,
        tenant: string | undefined,
        skipPrejoin: boolean | undefined = false,
        locationURL: URL): object => {
    const state = {
        room: roomName,
        roomSafe: getBackendSafeRoomName(roomName),
        tenant
    };

    if (skipPrejoin) {
        // We have already shown the prejoin screen, no need to show it again after obtaining the token.
        // @ts-ignore
        state['config.prejoinConfig.enabled'] = false;
    }

    const params = new URLSearchParams(locationURL.hash);

    for (const [ key, value ] of params) {
        // we allow only config and interfaceConfig overrides in the state
        if (key.startsWith('config.') || key.startsWith('interfaceConfig.')) {
            // @ts-ignore
            state[key] = value;
        }
    }

    return state;
};

export type LoginRequest = {
  method: "call";
  params: {
    login: string;
    password: string;
  },
  id: string | null;
}

export type LoginResponse = {
  jsonrpc: string;
  id: string | null;
  result?: {
    jwt: string
  };
  error?: {
    code: number;
    message: string;
    data: {
      name: string;
      message: string;
      arguments: string[];
    }
  }
}

/**
 * login
 *
 * @param {string} email - The email from quantri.congly.vn
 * @param {string} password - The password from quantri.congly.vn
 * @returns {Promise} LoginResponse
 */
export async function requestLoggingIn(email: string, password: string): Promise<LoginResponse> {
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    login: email,
    password: password,
  };

  try {
    const res = await fetch(`${SKYMEET_API}/api/auth`, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      console.log("Status error:", res.status);
    }

    return res.json();
  } catch (err) {
    console.log("Could not send request", err);
    return {
      jsonrpc: '',
      id: null,
      error: {
        code: 10001,
        message: 'Xin vui lòng kiểm tra lại đường truyền mạng',
        data: {
          name: 'Unknown Error',
          message: err.message,
          arguments: [],
        }
      }
    }
  }
}