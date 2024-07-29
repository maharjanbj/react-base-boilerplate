

export enum USER_ENUM {
    MERCHANT = 'creator',
    CLIENT = 'client',
    ADMIN = 'admin',
}

export const USER_TABLE_FILTER = (
    page: number,
    type: string,
    status: string,
    from: any,
    to: any,
) => {
    const filter: any = {
        offset: 0,
        limit: 20,
        skip: 20 * (page - 1),
        order: 'createdAt DESC',
        fields: {
            appleId: true,
            createdAt: true,
            ctrCode: true,
            currency: true,
            email: true,
            firstName: true,
            gender: true,
            id: true,
            img: true,
            lastName: true,
            phone: true,
            registrationId: true,
            status: true,
            username: true,
            verified: true,
            wallet: true,
        },
        where: {
            and: [
                { role: type },
                { status: { inq: status === 'active' ? [1, 3] : [0] } },
            ],
        },
    }

    if (from) {
        // Add the where clause for start date to the filter
        filter['where'].and.push({
            createdAt: {
                gte: new Date(from),
            },
        })
    }
    if (to) {
        // Add the where clause for end date to the filter's "and" array
        filter['where'].and.push({
            createdAt: {
                lte: new Date(to),
            },
        })
    }

    // return filter;
    return {
        offset: 0,
        limit: 20,
        skip: 0,
        order: 'createdAt DESC',
        fields: {
            appleId: true,
            createdAt: true,
            ctrCode: true,
            currency: true,
            email: true,
            firstName: true,
            gender: true,
            id: true,
            img: true,
            lastName: true,
            phone: true,
            registrationId: true,
            status: true,
            username: true,
            verified: true,
            wallet: true,
        },
        where: {
            and: [
                {
                    role: 'creator',
                },
                {
                    status: {
                        inq: [0],
                    },
                },
                {
                    createdAt: {
                        gte: '2023-03-27T18:15:00.000Z',
                    },
                },
                {
                    createdAt: {
                        lte: '2023-04-06T18:15:00.000Z',
                    },
                },
            ],
        },
    }
}

export const MERCHANT_DROPDOWN_FILTER = {
    offset: 0,
    order: 'createdAt DESC',
    limit: 100000,
    fields: {
        email: true,
        firstName: true,
        id: true,
        img: true,
        lastName: true,
        phone: true,
    },
    where: { role: 'creator', status: { inq: [1, 3] } },
}

export const MERCHANT_USER_DROPDOWN = {
    offset: 0,
    order: 'createdAt DESC',
    limit: 100000,
    fields: {
        email: true,
        firstName: true,
        id: true,
        img: true,
        lastName: true,
        phone: true,
    },
    where: { status: { inq: [1, 3] } },
}

export const DELETED_USER_TABLE_FILTER = (page: number) => ({
    offset: 0,
    limit: 20,
    skip: 20 * (page - 1),
    order: 'id DESC',
    fields: {
        where: { status: { inq: [0, 3] } },
        include: [{ relation: 'delReason' }],
    },
})

export const DETAILS_FILTER = {
    offset: 0,
    limit: 100,
    skip: 0,
    order: 'id DESC',
    fields: {
        id: true,
        label: true,
        description: true,
        price: true,
        img: true,
        qte: true,
        sold: true,
        brand: true,
        status: true,
        createdAt: true,
        shipping: true,
        collect: true,
        address: true,
        currency: true,
        symbole: true,
        ownerId: true,
        tagId: true,
        wallet: true,
    },
}

export const USER_COUNT_FILTER = (type: string, status: string) => ({
    role: type,
    status: { inq: status === 'active' ? [1, 3] : [0] },
})

export const DELETED_USER_COUNT_FILTER = () => ({
    where: { status: 0 },
})
