

import {
    Button,
    Checkbox,
    Grid,
    Group,
    PasswordInput,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../store/modules/auth/actions'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleSignInButton } from '../../components/common/oauth/GoogleButton'
export const LoginScreen = () => {
    const [loading, setLoading] = useState(false)
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: value => !value && 'Username cannot be empty',
            password: value => !value && 'Password cannot be empty',
        },
    })

    const authenticate = async () => {
        setLoading(true)
        await dispatch(
            authenticateUser({
                email: form.values.email.trim(),
                password: form.values.password,
            }),
        )
        setLoading(false)
    }

    return (
        <section className="h-full overflow-auto flex items-center justify-center w-full">
            <form className={'w-4/5'} onSubmit={form.onSubmit(authenticate)}>
                <div className="text-3xl mb-none font-bold text-primary-700">
                    Login
                </div>
                <div className={'font-bold text-lg'}>
                    Enter your details to login
                </div>
                <div className="my-lg">
                    <TextInput
                        withAsterisk
                        label="Username"
                        placeholder="Enter your username"
                        {...form.getInputProps('email')}
                        name={'username'}
                    />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        name={'password'}
                        placeholder="Enter your password"
                        {...form.getInputProps('password')}
                        className={'mt-md'}
                    />

                    {/*<Checkbox*/}
                    {/*    mt="md"*/}
                    {/*    label="I agree to sell my privacy"*/}
                    {/*    {...form.getInputProps('termsOfService', { type: 'checkbox' })}*/}
                    {/*/>*/}
                    <div className="text-right mt-md text-lg text-primary-700 font-bold">
                        <Button
                            variant={'subtle'}
                            onClick={() => navigate('/auth/forgot-password')}
                            name={'forget-password-btn'}
                        >
                            Forgot Password
                        </Button>
                    </div>
                </div>
                <Button
                    type="submit"
                    size={'lg'}
                    className={'w-full'}
                    loading={loading}
                    name={'login-btn'}
                >
                    Login
                </Button>
                <Button
                    size={'lg'}
                    className={'w-full'}
                    variant={'subtle'}
                    loading={loading}
                    mt={'md'}
                    mb={'md'}
                    name={'code-btn'}
                    onClick={() => navigate('/auth/validate-admin-code')}
                >
                    I have a code
                </Button>
                <GoogleSignInButton />
                {/*<Group position="right" mt="md">*/}
                {/*</Group>*/}
            </form>
        </section>
    )
}
