import React, { useState } from 'react'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { Button, Grid, Input, Paper, TextInput } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { CloudUpload } from 'tabler-icons-react'
import { StackTitleComponent } from '../../components/common/StackTitleComponent'
import { errorNotification } from '../../utils/helpers/notifications'
import { APIUploadFile } from '../../api/storage'

export const AddCategoryScreen = () => {
    const [coverImage, setCoverImage] = useState(null)
    const navigate = useNavigate()
    const handleDrop = (acceptedFiles: any) => {
        const file = acceptedFiles[0]
        setCoverImage(file)
    }

    const addCategory = async () => {
        try {
            if (coverImage) {
                const formData = new FormData()
                formData.append('file', coverImage)
                const res: any = await APIUploadFile(formData)
                const cover: any = res.files[0]?.originalname
                const res2 = []
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

    const form = useForm({
        initialValues: {
            name: '',
            nameAR: '',
            nameFR: '',
            ref: '',
        },
        validate: {
            name: val => !val && 'Name in English is required',
            nameAR: val => !val && 'Name in Arabic is required',
            nameFR: val => !val && 'Name in French is required',
            // ref: (val: string | null) =>
            //     val &&
            //     val.length > 4 &&
            //     'Code cannot be more than 4 characters',
        },
    })

    return (
        <section>
            <form onSubmit={form.onSubmit(val => addCategory())}>
                <Paper p={'sm'}>
                    <div className={'mb-md'}>
                        <StackTitleComponent>Add Category</StackTitleComponent>
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
                                            src={URL.createObjectURL(
                                                coverImage,
                                            )}
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
                                                here. Use ratio of 1:1
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Dropzone>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Input.Wrapper
                                className={'mb-sm'}
                                label={'Name in English'}
                            >
                                <TextInput
                                    {...form.getInputProps('name')}
                                    variant="filled"
                                    placeholder="Enter name in English of the category"
                                    required
                                />
                            </Input.Wrapper>
                            <Input.Wrapper
                                className={'mb-sm'}
                                label={'Name in Arabic'}
                            >
                                <TextInput
                                    {...form.getInputProps('nameAR')}
                                    variant="filled"
                                    placeholder="Enter name in Arabic of the category"
                                    required
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label={'Name in French'}>
                                <TextInput
                                    {...form.getInputProps('nameFR')}
                                    variant="filled"
                                    placeholder="Enter name in French of the category"
                                    required
                                />
                            </Input.Wrapper>
                            {/*<Input.Wrapper label={'Code'}>*/}
                            {/*    <TextInput*/}
                            {/*        {...form.getInputProps('ref')}*/}
                            {/*        variant="filled"*/}
                            {/*        placeholder="Enter code for the category"*/}
                            {/*        required*/}
                            {/*    />*/}
                            {/*</Input.Wrapper>*/}
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
