import { ActionIcon, Badge, Card, Grid, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Edit, Trash } from 'tabler-icons-react'
import { openConfirmModal } from '@mantine/modals'
import placeholderImg from '../../../assets/images/placeholder.jpg'
import { getImageUrl } from '../../../utils/helpers/imageUrlHandler'
import { useNavigate } from 'react-router-dom'
import { errorNotification } from '../../../utils/helpers/notifications'
import { formatDate } from '../../../utils/helpers/date.helper'

export const CategoryCard = (props: any) => {
    const { data } = props
    const navigate = useNavigate()
    const [catData, setCatData] = useState<any>({})

    useEffect(() => setCatData(data), [data])
    const onErrorImage = (event: any) => {
        event.target.src = placeholderImg
    }

    const removeTags = async (id: any) => {
    }

    const openDeleteConfirmationModal = () => {
        try {
            openConfirmModal({
                title: 'Please confirm your action',
                children: (
                    <Text size="sm">
                        Are you sure you want to delete this category?
                    </Text>
                ),
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                onCancel: () => console.log('Cancel'),
                onConfirm: async () => await removeTags(catData.id),
            })
        } catch (e: any) {
            errorNotification({
                title: 'Error',
                message: e.toString(),
            })
        }
    }

    return (
        <Card p={'xs'} withBorder mb={'xs'}>
            <Grid className={'w-full'}>
                <Grid.Col span={{ md: 4 }}>
                    <div className="flex items-center">
                        <img
                            src={getImageUrl(catData.img)}
                            alt=""
                            style={{ aspectRatio: '1' }}
                            onError={onErrorImage}
                            className={
                                'h-[50px] object-cover rounded-md bg-gray-100'
                            }
                        />
                        <div className="text-primary-700 pl-xs capitalize">
                            {catData.name}
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col span={{ md: 2 }}>
                    <div className={'flex pl-xs items-center flex-1 pt-xs'}>
                        <div className="category-description flex-grow">
                            <Badge variant="light">
                                Ref: {catData.ref ?? ''}
                            </Badge>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col span={{ md: 2 }}>
                    <div className={''}>
                        <div className="text-xs font-bold">Created At</div>
                        <div>{formatDate(catData.createdAt)}</div>
                    </div>
                </Grid.Col>
                <Grid.Col span={{ md: 3 }}>
                    <div className="btn-area flex items-center justify-end w-full">
                        <ActionIcon
                            mr={'xs'}
                            onClick={() =>
                                navigate(
                                    '/dashboard/edit-category/' +
                                        (catData?.id ?? ''),
                                )
                            }
                            ml={'xs'}
                            variant="subtle"
                            color="gray"
                        >
                            <Edit />
                        </ActionIcon>
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={openDeleteConfirmationModal}
                        >
                            <Trash />
                        </ActionIcon>
                    </div>
                </Grid.Col>
            </Grid>
        </Card>
    )
}
