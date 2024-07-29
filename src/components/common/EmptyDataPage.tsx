import React, { useEffect, useState } from 'react'
import flashSalesImg from '../../assets/images/empty-data/flash-sales.svg'
import merchantShopImg from '../../assets/images/empty-data/merchant-shop.svg'
import productImg from '../../assets/images/empty-data/product.svg'
import couponImg from '../../assets/images/empty-data/coupons.svg'
import eventsImg from '../../assets/images/empty-data/events.svg'
import campaignsImg from '../../assets/images/empty-data/campaigns.svg'

export const EmptyDataPage = (props: any) => {
    const { displayPage, message } = props

    const emptyImg: any = {
        'flash sales': flashSalesImg,
        merchants: merchantShopImg,
        products: productImg,
        coupons: couponImg,
        events: eventsImg,
        'featured events': eventsImg,
        'featured products': productImg,
        campaigns: campaignsImg,
    }

    const emptyComponent: any = (type: string = '') => (
        <div className={'flex flex-col items-center'}>
            <div className={'rounded'}>
                <img src={emptyImg[type] ?? productImg} className={'h-full'} />
            </div>
            <div className={'text-lg mt-md text-center'}>
                {message ?? (
                    <div>
                        There are currently no
                        <span className={'capitalize'}>
                            {type || 'products'}
                        </span>{' '}
                        available at the moment
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <div
            className={
                'flex flex-col justify-center items-center h-max w-auto mt-lg'
            }
        >
            {emptyComponent(displayPage)}
        </div>
    )
}
