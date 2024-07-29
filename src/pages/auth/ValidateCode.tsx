

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, Input, TextInput } from '@mantine/core'
import { APIValidateAdmin } from '../../api/users'
import { errorNotification } from '../../utils/helpers/notifications'

export const ValidateCode = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            email: '',
            code: '',
        },
    })

    useEffect(() => {
        form.setFieldValue('code', searchParams.get('code') ?? '')
    }, [searchParams])

    const validateAdminUser = async () => {
        try {
            const res: any = await APIValidateAdmin({
                email: form.values.email,
                code: form.values.code,
            })
            if (res.count === 1) {
                navigate(
                    `/auth/validate-admin?id=${res.id}&code=${form.values.code}`,
                )
            } else {
                errorNotification({
                    title: 'Error',
                    message: 'Wrong code',
                })
            }
        } catch (e) {
            errorNotification({
                title: 'Error',
                message: 'Could not validate admin',
            })
        }
    }
    return (
        <section className="h-full overflow-auto flex items-center justify-center w-full">
            <form
                className={'w-4/5'}
                onSubmit={form.onSubmit(validateAdminUser)}
            >
                <div className="text-3xl mb-none font-bold text-primary-700">
                    Verify Admin User
                </div>
                <div className={'font-bold text-lg'}>
                    Please enter your email and code
                </div>
                <div className="my-lg">
                    <Input.Wrapper label={'Email'}>
                        <TextInput
                            placeholder="Enter your email"
                            {...form.getInputProps('email')}
                            required
                        />
                    </Input.Wrapper>
                    <Input.Wrapper label={'Code'} mt={'sm'}>
                        <TextInput
                            placeholder="Enter your code"
                            {...form.getInputProps('code')}
                            required
                        />
                    </Input.Wrapper>
                </div>
                <Button
                    type="submit"
                    size={'lg'}
                    className={'w-full'}
                    loading={loading}
                >
                    Login
                </Button>

                {/*<Group position="right" mt="md">*/}
                {/*</Group>*/}
            </form>
        </section>
    )
}
