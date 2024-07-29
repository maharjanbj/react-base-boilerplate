

import {
    DeleteRequest,
    GetRequest,
    PostRequest,
    PutRequest,
} from '../plugins/https'
import {
    DELETED_USER_COUNT_FILTER,
    DELETED_USER_TABLE_FILTER,
    MERCHANT_USER_DROPDOWN,
    USER_COUNT_FILTER,
} from '../store/modules/user/filters'

export const APIGetAllAdmins = (
    page: number = 1,
    status: string = 'active',
    sortBy: string = 'createdAt DESC',
    from: any,
    to: any,
    keyword: string,
) => {
    // return GetRequest(
    //     '/users?filter=' +
    //         JSON.stringify(
    //             USER_TABLE_FILTER(page, USER_ENUM.ADMIN, status, false, false),
    //         ),
    // );
    return PostRequest('/get-admins', {
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    })
}

export const APIGetAllUsersCount = (
    type: string,
    status: string = 'active',
) => {
    return GetRequest(
        '/users/count?where=' + JSON.stringify(USER_COUNT_FILTER(type, status)),
    )
}

export const APIGetMerchantCount = (
    page: number,
    status: string = 'active',
    sortBy: string,
    from: any,
    to: any,
    keyword: string,
) => {
    return PostRequest('/get-merchants/count', {
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    })
}

export const APIGetClientCount = (
    page: number,
    status: string = 'active',
    sortBy: string,
    from: any,
    to: any,
    keyword: string,
) => {
    return PostRequest('/get-clients/count', {
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
        role: ['creator', 'client'],
    })
}
export const APIGetAllMerchants = (
    page: number,
    status: string = 'active',
    sortBy: string,
    from: any,
    to: any,
    keyword: string,
) => {
    return PostRequest('get-merchants', {
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    })
}
export const APIGetAllUsers = (
    page: number,
    status: string = 'active',
    sortBy: string,
    from: any,
    to: any,
    keyword: string,
) => {
    return PostRequest('get-users', {
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    })
}
export const APIGetAllDeliveryMerchants = (
    page: number,
    status: string = 'active',
    sortBy: string,
    from: any,
    to: any,
    keyword: string,
) => {
    return PostRequest('/delivery-partners/unassociated-merchants', {
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    })
}

export const APIGetAllClients = (
    page: number,
    status: string = 'active',
    sortBy: string,
    from: any,
    to: any,
    keyword: string,
) => {
    return PostRequest('get-clients', {
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    })
}

export const APIGetAllMerchantsDropdownList = () => {
    return GetRequest('/users/merchant-card')
}

export const APIGetAllShopsDropdownList = () => {
    return GetRequest('/shop-card')
}

export const APIGetAllCustomerDropdownList = () => {
    return GetRequest('/users/customer-card')
}

export const APIGetFeaturableMerchants = () => {
    return GetRequest('/users/featureable-merchant-card')
}
export const APIGetFeaturableMerchantsForEvents = () => {
    return GetRequest('/users/featureable-merchant-card-events')
}

export const APIGetAllUsersDropdownList = () => {
    return GetRequest('/users?filter=' + JSON.stringify(MERCHANT_USER_DROPDOWN))
}

// export const APIGetAllAdmins = (page: number) => {
//     return GetRequest(
//         '/users?filter=' +
//             JSON.stringify(USER_TABLE_FILTER(page, USER_ENUM.ADMIN)),
//     )
// }

export const APIGetAllDeletedUsers = (page: number) => {
    return GetRequest(
        '/users?filter=' + JSON.stringify(DELETED_USER_TABLE_FILTER(page)),
    )
}

export const APIGetAllDeletedUsersCount = (page: number) => {
    return GetRequest(
        '/users/count?filter=' + JSON.stringify(DELETED_USER_COUNT_FILTER()),
    )
}

export const APIGetUserById = (id: string) => {
    return GetRequest('/users/' + id)
}

export const APIAddUserStats = (id: string) => {
    return GetRequest('/user-profile-counts/' + id)
}

export const APIUpdateUser = (id: string, data: any) => {
    return PutRequest('/update-users/' + id, {
        ...data,
    })
}

export const APISaveProfile = (data: any) => {
    return PutRequest('/save-profile/', {
        ...data,
    })
}

export const APISaveAdminProfile = (data: any, id: string) =>
    PutRequest('save-admin-profile/' + id, { ...data })

export const APIDeleteUser = (id: string) => {
    return DeleteRequest('/users/' + id)
}

export const APIRestoreCustomer = (id: string) => {
    return PutRequest('/users/' + id, {
        status: 1,
    })
}

export const APIUpdateUserRole = (id: string, role: string) => {
    return PostRequest('/users/update-role/' + id, { role: role })
}

export const APIPostAddNewSupport = async (data: any) =>
    await PostRequest('/add-support-admin', data)

export const APISendEmailConfirmationToSupportAdmin = async (id: string) =>
    await GetRequest('/send-email-verification-to-support-admin/' + id)

export const APIPutEditNewSupportAdmin = async (data: any, id: string) =>
    await PutRequest(`/edit-support-admin/${id}`, data)

export const APIValidateAdmin = async (data: any) =>
    await PostRequest('/is-admin-user-validated', data)

export const APIChangeAdminPassword = async (data: any) =>
    await PostRequest('/validate-admin-user', data)

export const APIResendCode = async (userId: string) =>
    await PutRequest('/resend-verification-code/' + userId, {})

export const APIUpdateUserStatus = (id: any, data: any) =>
    PutRequest(`/update-user-status/${id}`, data)

export const APIPostChangePassword = async (data: any) =>
    await PostRequest('/users/change-password-admin', data)
