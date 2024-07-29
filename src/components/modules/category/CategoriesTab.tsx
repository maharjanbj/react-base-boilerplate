import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    iLoadingInfo,
    ILoadingInfo,
} from '../../../utils/interfaces/loadingInfo'
import { errorNotification } from '../../../utils/helpers/notifications'
import { getImageUrl } from '../../../utils/helpers/imageUrlHandler'
import placeholderImg from '../../../assets/images/placeholder.jpg'
import {
    formatDate,
    formatDateWithTime,
} from '../../../utils/helpers/date.helper'
import { ActionIcon, Text } from '@mantine/core'
import { Edit, Trash } from 'tabler-icons-react'
import { openConfirmModal } from '@mantine/modals'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'

export const CategoriesTab = (props: any) => {
    const [categories, setCategories] = useState([])
    const [loadingInfo, setLoadInfo] = useState<ILoadingInfo>({
        ...iLoadingInfo,
    })
    const [languageInUse, setLanguageInUse] = useState('en' as any)

    const navigate = useNavigate()

    const { i18n } = useTranslation()
    const currentLanguage: any = i18n.language
    useEffect(() => {
        setLanguageInUse(currentLanguage)
        loadData()
    }, [props.tab])

    const loadData = async () => {
        setLoadInfo({ ...loadingInfo, pageLoading: true })
        // try {
        if (props.tab === 'All') {
            // const res: any = await APIGetAllTags(1)
            // setCategories(res)
        }

        if (props.tab === 'WithProducts') {
            // const res2: any = await APIGetAllTagsWithProducts()
            // setCategories(res2)
        }
        setLoadInfo({ ...loadingInfo, pageLoading: false })
        // } catch (e: any) {
        //     setLoadInfo({...loadingInfo, pageLoading: false})
        //
        //     errorNotification({
        //         title: 'Error', message: e.toString(),
        //     })
        // }
    }

    const removeTags = async (id: any) => {
        // await APIDeleteTag(id)
        await loadData()
        await props.reFresh()
    }

    const openDeleteConfirmationModal = (id: any) => {
        try {
            openConfirmModal({
                title:'Application Settings.Categories.Models.Please confirm your action',
                children: (
                    <Text size="sm">
                               Application Settings.Categories.Models.Are you sure you want to delete this category?
                    </Text>
                ),
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                onCancel: () => console.log('Cancel'),
                onConfirm: async () => await removeTags(id),
            })
        } catch (e: any) {
            errorNotification({
                title: 'Error',
                message: e.toString(),
            })
        }
    }

    const onErrorImage = (event: any) => {
        event.target.src = placeholderImg
    }
    const updateOrderCategories = async (orderItems: any) => {
        try {
            const sendReOrderCategories = orderItems.map(
                (cateogry: any, key: number) => ({
                    id: cateogry.id,
                    order: key,
                }),
            )
            // const res = await APIReorderTags(sendReOrderCategories)
        } catch (e: any) {
            errorNotification({
                title: 'Error',
                message: e.toString(),
            })
        }
    }
    const handleDragEnd = async (result: any) => {
        try {
            if (!result?.destination) return

            const items: any = Array.from(categories)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(result.destination.index, 0, reorderedItem)
            setCategories(items)
            await updateOrderCategories(items)
        } catch (e: any) {
            errorNotification({
                title: 'Error',
                message: e.toString(),
            })
        }
    }

    return (
        <div
            className={'merchant-table gr-table'}
            style={{ maxHeight: '100%', overflow: 'auto' }}
        >
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="headers">
                    <div className="gr">
                        <div className="gd" style={{ width: '40%' }}>
                            Categories Name
                        </div>
                        <div className="gd" style={{ width: '30%' }}>
                            Created At
                        </div>

                        <div className="gd" style={{ width: '20%' }}>
                           Actions
                        </div>
                    </div>
                </div>
                <div className="order gr-table-data">
                    <Droppable droppableId={'droppable-' + new Date()}>
                        {(provided: any) => (
                            <div
                                className="gr-expandable relative"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {categories?.map((v: any, key: number) => (
                                    <Draggable
                                        key={v?.id}
                                        draggableId={'draggable-' + v?.id}
                                        index={key}
                                    >
                                        {(provided: any) => (
                                            <div className="gr relative">
                                                <div
                                                    className="gd"
                                                    style={{ width: '40%' }}
                                                >
                                                    <div className="flex items-center">
                                                        <img
                                                            src={getImageUrl(
                                                                v.img,
                                                            )}
                                                            alt=""
                                                            style={{
                                                                aspectRatio:
                                                                    '1',
                                                            }}
                                                            onError={
                                                                onErrorImage
                                                            }
                                                            className={
                                                                'h-[50px] object-cover rounded-md bg-gray-100'
                                                            }
                                                        />
                                                        <div className="text-primary-700 pl-xs capitalize">
                                                            {languageInUse ===
                                                            'ar'
                                                                ? v?.nameAR ??
                                                                  v.name
                                                                : languageInUse ===
                                                                    'fr'
                                                                  ? v?.nameFR ??
                                                                    v.name
                                                                  : v.name}
                                                            {/*{v.name}*/}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className="gd"
                                                    style={{ width: '30%' }}
                                                >
                                                    {formatDateWithTime(
                                                        v.createdAt,
                                                    )}
                                                </div>

                                                <div
                                                    className="gd"
                                                    style={{ width: '20%' }}
                                                >
                                                    <ActionIcon
                                                        mr={'xs'}
                                                        onClick={() =>
                                                            navigate(
                                                                '/dashboard/edit-category/' +
                                                                    (v?.id ??
                                                                        ''),
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
                                                        onClick={() =>
                                                            openDeleteConfirmationModal(
                                                                v.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash />
                                                    </ActionIcon>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}
