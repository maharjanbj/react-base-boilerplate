

export const UserStatusChangeValues = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 4 },
    { label: 'Blocked', value: 2 },
]

export const USER_STATUS_COLORS = ['dark', 'green', 'red', 'orange', 'red']
export const USER_ROLE_COLOR: any = {
    creator: 'teal',
    client: 'orange',
    admin: 'blue',
    support: 'cyan',
}

export const getUserStatusDropdownValues = (status: number, role = 'admin') => {
    if (role === 'creator') {
        return [
            { label: 'Inactive', value: 4 },
            { label: 'Active', value: 1 },
        ].filter((v: any) => v !== status)
    }

    if (role === 'admin') {
        return status === 1 || status === 3
            ? [
                  { label: 'Inactive', value: 4 },
                  { label: 'Active', value: 1 },
                  { label: 'Blocked', value: 2 },
              ].filter((v: any) => v !== status)
            : [
                  { label: 'Inactive', value: 4 },
                  { label: 'Blocked', value: 2 },
                  { label: 'Active', value: 1 },
              ].filter((v: any) => v !== status)
    }

    return UserStatusChangeValues.filter(v => v.value !== status)
}

export const USER_ROLE_ENUM: any = {
    client: 'client',
    admin: 'admin',
    support: 'support',
}

export const getUserRole = (role: any) => {
    return USER_ROLE_ENUM[role] as string
}
