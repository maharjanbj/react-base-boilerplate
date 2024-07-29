

import {
    DeleteRequest,
    GetRequest,
    PostRequest,
    PutRequest,
} from '../plugins/https'

import {
    NOTIFICATIONS_COUNT_FILTER,
    NOTIFICATIONS_TABLE_FILTER,
} from '../store/modules/notifications/filters'

export const APIGetAllNotificationHistory = (page: number) => {
    return GetRequest('/admin-message-notifications?page=' + page)
}

export const APIGetAllScheduledNotificationHistory = (page: number = 1) => {
    return GetRequest('/admin-scheduled-notifications?page=' + page)
}

export const APIGetNotificationHistoryyId = () => {}

export const APIAddNotificationHistory = (data: any) => {
    return PostRequest('/create-notification', data)
}

export const APIUpdateNotificationHistory = () => {}

export const APIDeleteNotificationHistory = (id: string) => {
    return DeleteRequest('/notifications/' + id)
}
export const APIGetNotificationById = (id: string) =>
    GetRequest('/notifications/' + id)

export const APIGetNotificationHistoryCount = () => {
    return GetRequest('/admin-message-notifications/count')
}

export const APIGetMyNotifications = () => {
    return GetRequest('/admin-notifications', {})
}

export const APIGetMyMerchantNotifications = (page: number = 1) => {
    return GetRequest('/my-notifications?page=' + page, {})
}

export const APIGetMyMerchantNotificationsCount = (page: number = 1) => {
    return GetRequest('/my-notifications/count')
}

export const APIPutNotificationsById = (id: string, data: any) =>
    PutRequest('/notifications/' + id, { ...data })
