

import { GetRequest } from '../plugins/https'

export const APIGetDashboardStats = () => {
    return GetRequest('/dashboard/stats')
}

export const APIGetCustomerTrend = () => {
    return GetRequest('/dashboard/cutomers-trend')
}

export const APIGetOrderTrend = () => {
    return GetRequest('/orders/yearly-trend')
}
