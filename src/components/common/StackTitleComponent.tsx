

import { useNavigate } from 'react-router-dom'
import { ActionIcon } from '@mantine/core'
import { ChevronLeft } from 'tabler-icons-react'

export const StackTitleComponent = (props: any) => {
    const navigate = useNavigate()
    return (
        <div className={'flex items-center px-sm py-xs'}>
            <ActionIcon onClick={() => navigate(-1)} variant={'subtle'}>
                <ChevronLeft />
            </ActionIcon>
            <div className={'text-lg text-primary-700 font-bold'}>
                {props.children}
            </div>
        </div>
    )
}
