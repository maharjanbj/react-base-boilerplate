

import { loadUserDTO } from './user.dto'
import {
    APIGetAllClients,
    APIGetAllMerchants,
    APIGetAllUsersCount,
    APIGetAllAdmins,
    APIGetUserById,
    APIGetMerchantCount,
    APIGetClientCount,
    APIGetAllDeliveryMerchants,
    APIGetAllUsers,
} from '../../../../api/users'

export const getAdmins = async (
    page: number,
    status: string = 'active',
    sortBy: string = 'createdAt DESC',
    from?: any,
    to?: any,
    keyword: string = '',
) => {
    const res: any = await APIGetAllAdmins(
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    )
    return { data: res.map((v: any) => loadUserDTO(v)) }
}

export const getUserCount = async (type: string, status: string = 'active') => {
    const count: any = await APIGetAllUsersCount(type, status)
    return { count: count.count }
}

export const getMerchantCount = async (
    page: number,
    status: string = 'active',
    sortBy: string = 'createdAt DESC',
    from: any,
    to: any,
    keyword: string = '',
) => {
    const count: any = await APIGetMerchantCount(
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    )
    return { count: count.count }
}

export const getMerchants = async (
    page: number,
    status: string = 'active',
    sortBy: string = 'createdAt DESC',
    from: any,
    to: any,
    keyword: string = '',
) => {
    const res: any = await APIGetAllMerchants(
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    )
    return { data: res.map((v: any) => loadUserDTO(v)) }
}
export const getUsersList = async (
    page: number,
    status: string = 'active',
    sortBy: string = 'createdAt DESC',
    from: any,
    to: any,
    keyword: string = '',
) => {
    const res: any = await APIGetAllUsers(
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    )
    return { data: res.map((v: any) => loadUserDTO(v)) }
}

export const getDeliveryMerchants = async (
    page: number,
    status: string = 'active',
    sortBy: string = 'createdAt DESC',
    from: any,
    to: any,
    keyword: string = '',
) => {
    const res: any = await APIGetAllDeliveryMerchants(
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    )
    return { data: res.map((v: any) => loadUserDTO(v)) }
}

export const getClientCount = async (
    page: number,
    status: string = 'active',
    sortBy: string = 'createdAt DESC',
    from: any,
    to: any,
    keyword: string = '',
) => {
    const count: any = await APIGetClientCount(
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    )
    return { count: count.count }
}

export const getClients = async (
    page: number,
    status: string = 'active',
    sortBy: string = 'createdAt DESC',
    from: any,
    to: any,
    keyword: string = '',
) => {
    const res: any = await APIGetAllClients(
        page,
        status,
        sortBy,
        from,
        to,
        keyword,
    )
    return { data: res.map((v: any) => loadUserDTO(v)) }
}

export const getUserById = async (id: string) => {
    const res: any = await APIGetUserById(id)
    return { data: loadUserDTO(res) }
}
