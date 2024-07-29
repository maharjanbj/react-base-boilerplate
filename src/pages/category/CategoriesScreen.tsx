

import { Button, Grid, LoadingOverlay, Paper, Tabs } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconSquarePlus } from '@tabler/icons-react'
import { ILoadingInfo, iLoadingInfo } from '../../utils/interfaces/loadingInfo'
import { errorNotification } from '../../utils/helpers/notifications'
import { StackTitleComponent } from '../../components/common/StackTitleComponent'
import { CategoriesTab } from '../../components/modules/category/CategoriesTab'

export const CategoriesScreen = () => {
    const [categories, setCategories] = useState([])
    const [categoriesWithProducts, setCategoriesWithProducts] = useState([])
    const [loadingInfo, setLoadInfo] = useState<ILoadingInfo>({
        ...iLoadingInfo,
    })
    const [activeTab, setActiveTab] = useState<string | null>('All')

    const navigate = useNavigate()
    const loadCategories = async () => {
        setLoadInfo({ ...loadingInfo, pageLoading: true })

        try {
            if (activeTab === 'All') {
                // const res: any = await APIGetAllTags(1)
                // setCategories(res)
            }
            if (activeTab === 'WithProducts') {
                // const res2: any = await APIGetAllTagsWithProducts()
                // setCategoriesWithProducts(res2)
            }
            setLoadInfo({ ...loadingInfo, pageLoading: false })
        } catch (e: any) {
            setLoadInfo({ ...loadingInfo, pageLoading: false })

            errorNotification({
                title: 'Error',
                message: e.toString(),
            })
        }
    }

    useEffect(() => {
        loadCategories()
    }, [activeTab])

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

    const handleDragEnd = (result: any) => {
        try {
            if (!result?.destination) return

            const items: any = Array.from(categories)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(result.destination.index, 0, reorderedItem)
            setCategories(items)
            updateOrderCategories(items)
        } catch (e: any) {
            errorNotification({
                title: 'Error',
                message: e.toString(),
            })
        }
    }

    const handleDragEndWithProducts = (result: any) => {
        try {
            if (!result?.destination) return

            const items: any = Array.from(categoriesWithProducts)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(result.destination.index, 0, reorderedItem)
            setCategoriesWithProducts(items)
            updateOrderCategories(items)
        } catch (e: any) {
            errorNotification({
                title: 'Error',
                message: e.toString(),
            })
        }
    }

    return (
        <section>
            <LoadingOverlay
                visible={loadingInfo.pageLoading}
                overlayProps={{ blur: 2 }}
            />
            <Paper p={'sm'}>
                <div className="flex justify-between mb-sm">
                    <StackTitleComponent>
                        Categories
                    </StackTitleComponent>
                    <div>
                        <Button
                            onClick={() => navigate('/dashboard/add-category')}
                            leftSection={<IconSquarePlus />}
                        >
                           Category
                        </Button>
                    </div>
                </div>
                <Tabs
                    defaultValue="Active"
                    value={activeTab}
                    onChange={setActiveTab}
                    className={'mt-md'}
                >
                    <Tabs.List>
                        <Tabs.Tab value="All">
                           All
                        </Tabs.Tab>
                        <Tabs.Tab value="WithProducts">
                            Categories With Products
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="All" pt="md">
                        <CategoriesTab tab={activeTab} />
                        {/*<DragDropContext onDragEnd={handleDragEnd}>*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            display: 'flex',*/}
                        {/*            flexDirection: 'row',*/}
                        {/*            flexWrap: 'wrap',*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <Droppable*/}
                        {/*            droppableId={*/}
                        {/*                'droppable-categories-' + new Date()*/}
                        {/*            }*/}
                        {/*        >*/}
                        {/*            {(provided: any) => (*/}
                        {/*                <Grid*/}
                        {/*                    {...provided.droppableProps}*/}
                        {/*                    ref={provided.innerRef}*/}
                        {/*                >*/}
                        {/*                    {categories.map((v, key) => (*/}
                        {/*                        <Draggable*/}
                        {/*                            key={key}*/}
                        {/*                            draggableId={*/}
                        {/*                                'draggable-category-' +*/}
                        {/*                                key*/}
                        {/*                            }*/}
                        {/*                            index={key}*/}
                        {/*                        >*/}
                        {/*                            {(*/}
                        {/*                                provided: any,*/}
                        {/*                                snapshot: any,*/}
                        {/*                            ) => (*/}
                        {/*                                <Grid.Col*/}
                        {/*                                    span={12}*/}
                        {/*                                    key={key}*/}
                        {/*                                    p={0}*/}
                        {/*                                    ref={*/}
                        {/*                                        provided.innerRef*/}
                        {/*                                    }*/}
                        {/*                                    {...provided.draggableProps}*/}
                        {/*                                    {...provided.dragHandleProps}*/}
                        {/*                                >*/}
                        {/*                                    <CategoryCard*/}
                        {/*                                        data={v}*/}
                        {/*                                        reFresh={*/}
                        {/*                                            loadCategories*/}
                        {/*                                        }*/}
                        {/*                                    />*/}
                        {/*                                </Grid.Col>*/}
                        {/*                            )}*/}
                        {/*                        </Draggable>*/}
                        {/*                    ))}*/}
                        {/*                </Grid>*/}
                        {/*            )}*/}
                        {/*        </Droppable>*/}
                        {/*    </div>*/}
                        {/*</DragDropContext>*/}
                    </Tabs.Panel>
                    <Tabs.Panel value="WithProducts" pt="md">
                        <CategoriesTab tab={activeTab} />
                        {/*<DragDropContext onDragEnd={handleDragEndWithProducts}>*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            display: 'flex',*/}
                        {/*            flexDirection: 'row',*/}
                        {/*            flexWrap: 'wrap',*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <Droppable*/}
                        {/*            droppableId={*/}
                        {/*                'droppable-categories-with-products-' +*/}
                        {/*                new Date()*/}
                        {/*            }*/}
                        {/*        >*/}
                        {/*            {(provided: any) => (*/}
                        {/*                <Grid*/}
                        {/*                    {...provided.droppableProps}*/}
                        {/*                    ref={provided.innerRef}*/}
                        {/*                >*/}
                        {/*                    {categoriesWithProducts.map(*/}
                        {/*                        (v, key) => (*/}
                        {/*                            <Draggable*/}
                        {/*                                key={key}*/}
                        {/*                                draggableId={*/}
                        {/*                                    'draggable-category-' +*/}
                        {/*                                    key*/}
                        {/*                                }*/}
                        {/*                                index={key}*/}
                        {/*                            >*/}
                        {/*                                {(*/}
                        {/*                                    provided: any,*/}
                        {/*                                    snapshot: any,*/}
                        {/*                                ) => (*/}
                        {/*                                    <Grid.Col*/}
                        {/*                                        span={12}*/}
                        {/*                                        key={key}*/}
                        {/*                                        p={0}*/}
                        {/*                                        ref={*/}
                        {/*                                            provided.innerRef*/}
                        {/*                                        }*/}
                        {/*                                        {...provided.draggableProps}*/}
                        {/*                                        {...provided.dragHandleProps}*/}
                        {/*                                    >*/}
                        {/*                                        <CategoryCard*/}
                        {/*                                            data={v}*/}
                        {/*                                            reFresh={*/}
                        {/*                                                loadCategories*/}
                        {/*                                            }*/}
                        {/*                                        />*/}
                        {/*                                    </Grid.Col>*/}
                        {/*                                )}*/}
                        {/*                            </Draggable>*/}
                        {/*                        ),*/}
                        {/*                    )}*/}
                        {/*                </Grid>*/}
                        {/*            )}*/}
                        {/*        </Droppable>*/}
                        {/*    </div>*/}
                        {/*</DragDropContext>*/}
                    </Tabs.Panel>
                </Tabs>
            </Paper>
        </section>
    )
}
