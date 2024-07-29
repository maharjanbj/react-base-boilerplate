

import baseAxios from '../../../plugins/axios'
import {
    SET_AUTH_DATA,
    SET_TOKEN,
    SET_USER,
    SET_DEFAULT_SETTINGS,
} from './actionTypes'
import {
    APIAuthenticateGoogleSignin,
    APIAuthenticateUser,
    APIForgetPassword,
    APIGetMyData,
    APIRegisterUser,
    APIUpdatePassword,
    APIVerifyEmail,
} from '../../../api/auth'
import { AxiosResponse } from 'axios'
import {
    clearStorage,
    getToken,
    saveToken,
    saveUser,
    saveDefaultSettings,
} from '../../../utils/helpers/tokenStorage.helper'

import {
    ILoginUser,
    IRegisterUser,
    IUpdatePassword,
    IUserEmail,
} from '../../../utils/interfaces/LoginUser.interface'
import { showNotification } from '@mantine/notifications'
import { errorNotification } from '../../../utils/helpers/notifications'
import { CredentialResponse } from '@react-oauth/google'

interface ILoginResponse {
    readonly authentication: any
    readonly data: any
    readonly message: string
    readonly status: string
    readonly statusCode: number
}

const setAuthorizationHeader = (token: string) => {
    baseAxios.defaults.headers.common = {
        ...baseAxios.defaults.headers.common,
        Authorization: 'Bearer ' + (token ?? getToken()),
    }
}

const deleteAuthorizationHeader = () => {
    delete baseAxios.defaults.headers.common.Authorization
}

export const setAuthData = (data: any) => {
    return {
        type: SET_AUTH_DATA,
        payload: data,
    }
}

export const setUserData = (data: any) => {
    saveUser(data)
    return {
        type: SET_USER,
        payload: data,
    }
}

export const setDefaultSettings = (data: any) => {
    saveDefaultSettings(data)
    return {
        type: SET_DEFAULT_SETTINGS,
        payload: data,
    }
}

export const loadMyData = () => async (dispatch: any) => {
    const res: any = await APIGetMyData()
    console.log(res)
    dispatch(setUserData(res?.user))
    dispatch(setDefaultSettings(res?.defaultSettings))
}

export const authenticateUser = (user: ILoginUser) => async (dispatch: any) => {
    try {
        const res: any = await APIAuthenticateUser(user)
        // if (res) {
        if (['admin', 'support', 'creator'].includes(res?.user.role)) {
            dispatch(
                setAuthData({
                    user: res?.user,
                }),
            )
            saveToken(res.token)
            saveUser(res?.user)
            saveDefaultSettings(res?.defaultSettings)
            setAuthorizationHeader(res?.token || '')
        }
    } catch (e: any) {
        return e
    }
}

export const authenticateUserUsingGoogle =
    (token: string) => async (dispatch: any) => {
        try {
            const res: any = await APIAuthenticateGoogleSignin({
                token: token,
            })
            if (res.token) {
                dispatch(
                    setAuthData({
                        user: res?.user,
                    }),
                )
                saveToken(res.token)
                saveUser(res?.user)
                setAuthorizationHeader(res?.token || '')
            } else {
                dispatch(logoutUser())
                errorNotification({
                    title: 'Error',
                    message: res.message ?? 'Authentication error',
                })
            }
        } catch (e: any) {
            return e
        }
    }

export const createUser = (user: IRegisterUser) => async (dispatch: any) => {
    const res = await APIRegisterUser(user)
}

export const forgetPassword = (data: IUserEmail) => {
    const res = APIForgetPassword(data)
}

export const verifyEmail = (data: IUserEmail) => {
    const res = APIVerifyEmail(data)
}

export const updatePassword = (data: IUpdatePassword) => {
    const res = APIUpdatePassword(data)
}

export const logoutUser = () => (dispatch: any) => {
    clearStorage()
    deleteAuthorizationHeader()
    dispatch(setToken(null))
}

export const setToken = (token: string | null) => {
    return {
        type: SET_TOKEN,
        payload: token,
    }
}

export const checkIfAuthenticated = () => (dispatch: any) => {
    const token: string | null = getToken() ?? null
    dispatch(setToken(token))
}

export const authenticateGoogleSignin =
    (user: CredentialResponse, register?: string) => async (dispatch: any) => {
        try {
            const res = await APIAuthenticateGoogleSignin(user)

            if (res) {
                // saveTokenAndId(res.data);
                // dispatch(setUserProfile(res.data.userProfile));
            }
            return res
        } catch (error) {
            throw new Error(error?.toString())
        }
    }
