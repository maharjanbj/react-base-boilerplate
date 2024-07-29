import axios, { AxiosInstance } from 'axios'
import { getToken } from '../utils/helpers/tokenStorage.helper'
import { isAuthenticated } from '../utils/helpers/checkIfAuthenticated'
import { errorNotification } from '../utils/helpers/notifications'
import {
    BASE_URL,
    BASE_URL_DEVELOP,
    BASE_URL_PROD_URL,
} from '../config/baseURL'
import { store } from '../store/store'
import { logoutUser } from '../store/modules/auth/actions'

const baseAxios: AxiosInstance = axios.create()

baseAxios.defaults.baseURL = BASE_URL

if (isAuthenticated()) {
    baseAxios.defaults.headers.common.Authorization = `Bearer ${getToken()}`
}

// Add a request interceptor
baseAxios.interceptors.request.use(
    function (config) {
        return config
    }, // function(config)
    function (error) {
        return Promise.reject(error)
    }, // function(error)
) // baseAxios.interceptors.request.use

baseAxios.interceptors.response.use(
    function (response) {
        if (response.status === 200) {
            // console.log('data loaded successfully');
        }

        if (response.status === 201) {
            // console.log('data created    successfully');
        }
        return response.data
    }, // function(response)
    function (error) {
        const errorVal = error?.response?.data?.error
        errorNotification({
            title: errorVal?.name ?? 'Error',
            message: errorVal?.message ?? 'Action could not be completed',
        })

        // if ([403, 401].includes(error?.response?.status)) {
        if ([401].includes(error?.response?.status)) {
            store.dispatch(logoutUser())
        }
        return Promise.reject(errorVal)
    }, // function(error)
) // baseAxios.interceptors.response.use

export default baseAxios
