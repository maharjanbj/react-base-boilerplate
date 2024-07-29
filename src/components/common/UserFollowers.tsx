

import React, { useEffect, useState } from 'react'
import { APILoadUserFollowers } from '../../api/followers'
import { Avatar } from '@mantine/core'
import { getImageUrl } from '../../utils/helpers/imageUrlHandler'
import { formatName } from '../../utils/helpers/stringHelper'

export const UserFollowers = ({ userId }: any) => {
    const [followers, setFollowers] = useState([] as any)

    useEffect(() => {
        loadFollowers()
    }, [])

    const loadFollowers = async () => {
        const res: any = await APILoadUserFollowers(userId)
        setFollowers(res)
    }
    return (
        <div>
            {followers.map((v: any) => (
                <div className="flex items-center mt-md">
                    <Avatar src={getImageUrl(v.img)} size={40} />
                    <div className={'pl-xs'}>
                        <div className="text-md font-bold">
                            {formatName(v.firstName, v.lastName)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
