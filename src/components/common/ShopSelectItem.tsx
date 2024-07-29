

import React, { forwardRef } from 'react'
import { Avatar, Group } from '@mantine/core'
import { getImageUrl } from '../../utils/helpers/imageUrlHandler'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string
    label: string
    phone: string
}

export const ShopSelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, phone, ...others }: ItemProps, ref) => (
        <div className={'flex items-center py-xs'} ref={ref} {...others}>
            <Group wrap="nowrap">
                <Avatar
                    src={image ? getImageUrl(image) : ''}
                    radius={20}
                    size={40}
                >
                    {label[0] ?? 'N/A'}
                </Avatar>
                <div className={'pl-xs'}>
                    <div className="text-lg font-bold capitalize">{label}</div>
                    {/*<div className="text-lg">{phone}</div>*/}
                </div>
            </Group>
        </div>
    ),
)
