

import {
    LOGOUT_USER,
    SET_AUTH_DATA,
    SET_TOKEN,
    SET_USER,
    SET_DEFAULT_SETTINGS,
} from './actionTypes'
import {
    getDefaultSettings,
    getToken,
    getUser,
} from '../../../utils/helpers/tokenStorage.helper'
import { isAuthenticated } from '../../../utils/helpers/checkIfAuthenticated'

interface IAuthenticationState {
    readonly authenticated: any
    readonly user: any
    readonly isLoggedIn: boolean
    readonly token: string | null
    readonly defaultSettings: any
}

const initialState: IAuthenticationState = {
    authenticated: {},
    user: getUser() ?? null,
    isLoggedIn: true,
    // isLoggedIn: isAuthenticated(),
    token: getToken(),
    defaultSettings: getDefaultSettings(),
}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                authenticated: action.payload.authenticated,
                user: action.payload.user,
                isLoggedIn: true,
            }
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
                isLoggedIn: !!action.payload,
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case SET_DEFAULT_SETTINGS:
            return {
                ...state,
                defaultSettings: action.payload,
            }
        default:
            return state
    }
}
