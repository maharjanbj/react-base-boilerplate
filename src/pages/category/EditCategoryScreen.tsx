
import React, { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Button,
    Grid,
    Input,
    LoadingOverlay,
    Paper,
    TextInput,
} from '@mantine/core'
import { CloudUpload } from 'tabler-icons-react'
import { Dropzone } from '@mantine/dropzone'
import { errorNotification } from "../../utils/helpers/notifications";
import { APIUploadFile } from "../../api/storage";
import { StackTitleComponent } from '../../components/common/StackTitleComponent'
import { getImageUrl } from "../../utils/helpers/imageUrlHandler";
import { iLoadingInfo, ILoadingInfo } from "../../utils/interfaces/loadingInfo";


export const EditCategoryScreen = () => {
    const [coverImage, setCoverImage] = useState(null)
    const [loadingInfo, setLoadInfo] = useState<ILoadingInfo>({
        ...iLoadingInfo,
    })

    const form = useForm({
        initialValues: {
            name: null,
            ref: null,
        },
        validate: {
            name: val => !val && 'Name is required',
            //     ref: (val: string | null) =>
            //         val &&
            //         val.length > 4 &&
            //         'Code cannot be more than 4 characters',
            // },
        },
    })

    const navigate = useNavigate()
    const { id }: any = useParams()

    useEffect(() => {
        loadCategory()
    }, [id])

    const handleDrop = (acceptedFiles: any) => {
        const file = acceptedFiles[0]
        setCoverImage(file)
    }

    const loadCategory = async () => {
        try {
            // const cat: any = await APIGetTagById(id)
            // const tempCatValue = {
            //     name: cat.name ?? '',
            //     ref: cat.ref ?? '',
            //     img: cat.img ?? '',
            // }
            // setCoverImage(tempCatValue.img)
            // form.setValues(tempCatValue)
        } catch (e: any) {
            errorNotification({
                title: 'Error',
                message: e.toString(),
            })
        }
    }

    const saveCategory = async () => {
        try {
            let cover: any = coverImage
            if (coverImage) {
                if (typeof coverImage !== 'string') {
                    const formData = new FormData()
                    formData.append('file', coverImage)
                    const res: any = await APIUploadFile(formData)
                    cover = res.files[0]?.originalname
                }
                // const res2 = await APIUpdateTag(id, {
                //     name: form.values.name,
                //     ref: form.values.ref,
                //     img: cover,
                // })
                navigate('/dashboard/categories')
            } else {
                errorNotification({
                    title: 'Error',
                    message: 'Please add a cover image',
                })
            }
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

            <form onSubmit={form.onSubmit(val => saveCategory())}>
                <Paper p={'sm'}>
                    <div className={'mb-md'}>
                        <StackTitleComponent>Edit Category</StackTitleComponent>
                    </div>
                    <Grid>
                        <Grid.Col span={4}>
                            <Dropzone onDrop={handleDrop} multiple={false}>
                                {coverImage ? (
                                    <div
                                        style={{
                                            border: '2px dashed #999',
                                            borderRadius: '4px',
                                            minHeight: '150px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            aspectRatio: '1',
                                        }}
                                    >
                                        <img
                                            src={
                                                typeof coverImage === 'string'
                                                    ? getImageUrl(coverImage)
                                                    : URL.createObjectURL(
                                                          coverImage,
                                                      )
                                            }
                                            alt="Cover Image"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '300px',
                                                aspectRatio: '1',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className="flex flex-col items-center justify-center"
                                            style={{ minHeight: '150px' }}
                                        >
                                            <CloudUpload
                                                size={32}
                                                style={{
                                                    marginRight: '0.5rem',
                                                }}
                                            />
                                            <div>
                                                Drag and drop an image file
                                                here, or click to select a file
                                                from your computer.
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Dropzone>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Input.Wrapper label={'Name'}>
                                <TextInput
                                    {...form.getInputProps('name')}
                                    variant="filled"
                                    placeholder="Enter name of the category"
                                    required
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label={'Code'}>
                                <TextInput
                                    {...form.getInputProps('ref')}
                                    variant="filled"
                                    placeholder="Enter code for the category"
                                    readOnly={true}
                                    // required
                                />
                            </Input.Wrapper>
                        </Grid.Col>
                    </Grid>
                    <div className="flex justify-end">
                        <Button
                            ml={'xs'}
                            variant={'subtle'}
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        <Button type={'submit'}>Save</Button>
                    </div>
                </Paper>
            </form>
        </section>
    )
}
