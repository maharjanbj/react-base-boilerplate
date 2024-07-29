

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, Input, TextInput } from '@mantine/core'
import { APIValidateAdmin } from '../../api/users'
import { errorNotification } from '../../utils/helpers/notifications'
import { StackTitleComponent } from '../../components/common/StackTitleComponent'
import { APIForgetPasswordVerification } from '../../api/auth'

export const ForgotPassword = () => {
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
            await APIForgetPasswordVerification(form.values.email)
            navigate(`/auth/validate-admin-code`)
        } catch (e) {
            errorNotification({
                title: 'Error',
                message: 'Could not validate admin',
            })
        }
    }
    return (
        <section className="h-full flex-col overflow-auto flex items-center justify-center w-full">
            <div className="w-full">
                <StackTitleComponent>
                    <div className="text-3xl mb-none font-bold text-primary-700">
                        Forgot Password
                    </div>
                </StackTitleComponent>
            </div>
            <form
                className={'w-4/5'}
                onSubmit={form.onSubmit(validateAdminUser)}
            >
                <div className={'font-bold text-lg'}>
                    Please enter your email to continue
                </div>
                <div className="my-lg">
                    <Input.Wrapper label={'Email'}>
                        <TextInput
                            placeholder="Enter your email"
                            {...form.getInputProps('email')}
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
                    Send verification code
                </Button>

                {/*<Group position="right" mt="md">*/}
                {/*</Group>*/}
            </form>
        </section>
    )
}
