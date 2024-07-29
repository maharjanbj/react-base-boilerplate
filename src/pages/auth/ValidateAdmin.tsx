

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { APIChangeAdminPassword, APIValidateAdmin } from '../../api/users'
import { errorNotification } from '../../utils/helpers/notifications'

export const ValidateAdmin = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            id: '',
            code: '',
            password: '',
            confirmPassword: '',
        },
        validate: values => {
            const errors: any = {}

            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 8) {
                errors.password = 'Password must be at least 8 characters long'
            } else if (!/\d/.test(values.password)) {
                errors.password = 'Password must contain at least one digit'
            } else if (!/[a-zA-Z]/.test(values.password)) {
                errors.password = 'Password must contain at least one letter'
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Confirm Password is required'
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Passwords do not match'
            }
            return errors
        },
    })
    useEffect(() => {
        form.setFieldValue('id', searchParams.get('id') ?? '')
        form.setFieldValue('code', searchParams.get('code') ?? '')
        isAdminValidated().then(_ => {})
    }, [searchParams])

    const isAdminValidated = async () => {
        try {
            const res: any = await APIValidateAdmin({
                id: searchParams.get('id') ?? '',
                code: searchParams.get('code') ?? '',
            })
            if (res.count === 0) {
                errorNotification({
                    title: 'Error',
                    message: 'User id or code is wrong',
                })
                navigate('/')
            }
        } catch (e: any) {
            console.log(e)
        }
    }

    const validateAdminUser = async () => {
        try {
            const res = await APIChangeAdminPassword({
                id: searchParams.get('id') ?? '',
                code: searchParams.get('code') ?? '',
                password: form.values.password,
            })
            navigate('/auth/password-changed')
        } catch (e) {
            errorNotification({
                title: 'Error',
                message: 'Could not change password',
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
                    Please enter new password
                </div>
                <div className="my-lg">
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        placeholder="Enter your password"
                        {...form.getInputProps('password')}
                        className={'mt-md'}
                        required
                    />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        placeholder="Enter your password"
                        {...form.getInputProps('confirmPassword')}
                        className={'mt-md'}
                        required
                    />
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
