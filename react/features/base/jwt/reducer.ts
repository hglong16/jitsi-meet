import PersistenceRegistry from '../redux/PersistenceRegistry';
import ReducerRegistry from '../redux/ReducerRegistry';
import { equals } from '../redux/functions';

import { SET_JWT } from './actionTypes';

const STORE_NAME = 'features/base/jwt';

const DEFAULT_STATE: IJwtState = {
    callee: undefined,
    group: undefined,
    isAuthenticated: false,
    jwt: undefined,
    server: undefined,
    tenant: undefined,
    user: undefined,
};

/**
 * Sets up the persistence of the feature {@code base/jwt}.
 */
const filterSubtree: IJwtState = {};

// start with the default state
Object.keys(DEFAULT_STATE).forEach(key => {
    const key1 = key as keyof typeof filterSubtree;
    // @ts-ignore
    filterSubtree[key1] = true;
});


export interface IJwtState {
    callee?: {
        name: string;
    };
    group?: string;
    jwt?: string;
    isAuthenticated?: boolean;
    server?: string;
    tenant?: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}

PersistenceRegistry.register(STORE_NAME, filterSubtree, DEFAULT_STATE);

/**
 * Reduces redux actions which affect the JSON Web Token (JWT) stored in the
 * redux store.
 *
 * @param {Object} state - The current redux state.
 * @param {Object} action - The redux action to reduce.
 * @returns {Object} The next redux state which is the result of reducing the
 * specified {@code action}.
 */
ReducerRegistry.register<IJwtState>(
    STORE_NAME,
    (state = DEFAULT_STATE, action): IJwtState => {
        switch (action.type) {
        case SET_JWT: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { type, ...payload } = action;
            const nextState = {
                ...payload
            };

            return equals(state, nextState) ? state : nextState;
        }
        }

        return state;
    });

