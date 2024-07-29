

import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../../../pages/auth/Login.screen'
import { ValidateAdmin } from '../../../pages/auth/ValidateAdmin'
import { Grid } from '@mantine/core'
import { PasswordChanged } from '../../../pages/auth/PasswordChanged'
import { ValidateCode } from '../../../pages/auth/ValidateCode'
import { ForgotPassword } from '../../../pages/auth/ForgotPassword'
import { DynamicRedirection } from '../../../pages/auth/DynamicRedirection'

export const AuthRoutes = () => (
    <section className={'h-screen auth max-h-screen w-full overflow-hidden'}>
        <Grid
            className={'h-full w-full'}
            styles={{
                inner: { height: '100%' },
            }}
        >
            <Grid.Col
                span={6}
                className={'h-full flex justify-center items-center'}
            >
                logo
            </Grid.Col>
            <Grid.Col span={6} className={'h-full'}>
                <Routes>
                    <Route path={'/'} element={<LoginScreen />} />
                    <Route
                        path={'/validate-admin'}
                        element={<ValidateAdmin />}
                    />
                    <Route
                        path={'/validate-admin-code'}
                        element={<ValidateCode />}
                    />
                    <Route
                        path={'/forgot-password'}
                        element={<ForgotPassword />}
                    />
                    <Route
                        path={'/password-changed'}
                        element={<PasswordChanged />}
                    />
                </Routes>
            </Grid.Col>
        </Grid>
    </section>
)
