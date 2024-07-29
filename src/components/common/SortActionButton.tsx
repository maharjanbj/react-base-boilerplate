

import { ActionIcon } from '@mantine/core'
import { ChevronDown, ChevronUp, Minus } from 'tabler-icons-react'

export const SortActionButton = (props: any) => {
    if (!props.sortBy.includes(props.value)) {
        return (
            <ActionIcon
                variant={'subtle'}
                onClick={() => props.setSortBy(props.value + ' DESC')}
            >
                <Minus />
            </ActionIcon>
        )
    } else {
        if (props.sortBy.includes('ASC')) {
            return (
                <ActionIcon
                    onClick={() => props.setSortBy(props.value + ' DESC')}
                    variant="subtle"
                    color="gray"
                >
                    <ChevronDown />
                </ActionIcon>
            )
        } else {
            return (
                <ActionIcon
                    onClick={() => props.setSortBy(props.value + ' ASC')}
                    variant="subtle"
                    color="gray"
                >
                    <ChevronUp />
                </ActionIcon>
            )
        }
    }
}
