

import moment from 'moment'

const userDTODeliveryPartners = (data: any) => {
    let deliveryPartners = []
    if (data?.deliveryPartners) {
        deliveryPartners = data?.deliveryPartners?.map(
            (deliveryPartner: any) => deliveryPartner?.deliveryPartner,
        )
    }
    return deliveryPartners?.length > 0 ? deliveryPartners[0] : null
}
export const loadUserDTO = (data: any) => {
    const deliveryPartners = userDTODeliveryPartners(data)
    return {
        appleId: data.appleId,
        createdAt: moment(data.createdAt).format('MMM DD, YYYY'),
        ctrCode: data.ctrCode,
        currency: data.currency,
        email: data.email,
        firstName: data.firstName,
        gender: data.gender,
        id: data.id,
        img: data.img,
        lastName: data.lastName,
        role: data?.role ?? '',
        phone: data.phone,
        registrationId: data.registrationId,
        status: data.status,
        username: data.username,
        verified: data.verified,
        wallet: data.wallet,
        pickup: data.pickup,
        addresses: data.addresses ?? [],
        shop: data.shop?.length > 0 ? data.shop[0] : null,
        deliveryPartner: deliveryPartners,
    }
}

export const loadUserDetailsDTO = (data: any) => {
    return {
        appleId: data.appleId,
        createdAt: moment(data.createdAt).format('MMM DD, YYYY'),
        ctrCode: data.ctrCode,
        currency: data.currency,
        email: data.email,
        firstName: data.firstName,
        gender: data.gender,
        id: data.id,
        img: data.img,
        lastName: data.lastName,
        role: data?.role ?? '',
        phone: data.phone,
        registrationId: data.registrationId,
        status: data.status,
        username: data.username,
        verified: data.verified,
        wallet: data.wallet,
        pickup: data.pickup,
        addresses: data.addresses ?? [],
        shop: data.shop ?? null,
    }
}
