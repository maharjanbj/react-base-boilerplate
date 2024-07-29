

import { GetRequest, PostRequest, PutRequest } from '../plugins/https'
import {
    ILoginUser,
    IRegisterUser,
    IUpdatePassword,
    IUserEmail,
} from '../utils/interfaces/LoginUser.interface'

export const APIAuthenticateUser = (data: ILoginUser) => {
    return PostRequest('users/login', data)
}

export const APIRegisterUser = (data: IRegisterUser) => {
    return PostRequest('users/create', data)
}

export const APIForgetPassword = (data: IUserEmail) => {
    return PutRequest('users/forget-password', data)
}

export const APIForgetPasswordVerification = (email: string) => {
    return GetRequest('users/forgetPassword', {
        params: {
            email: email,
        },
    })
}

export const APIVerifyEmail = (data: IUserEmail) => {
    return PostRequest('users/verify-email', data)
}

export const APIUpdatePassword = (data: IUpdatePassword) => {
    return PutRequest('users/update-password', data)
}
export const APIGetMyProfile = () => {
    return GetRequest('/my-profile')
}
export const APIGetMyData = () => {
    return GetRequest('/users/me')
}

export const APIGetUserDetails = (id: string) => GetRequest('/users/' + id)

export const APIChangeUserPassword = (data: any) => {
    return PostRequest('/users/change-password', data)
}
export const APIAuthenticateGoogleSignin = (data: any) => {
    return PostRequest('/users/merchant-google-connect', data)
}
