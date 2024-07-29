

import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginScreen } from '../pages/auth/Login.screen'
import { DashboardLayout } from '../layouts/Dashboard.layout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AuthLayout } from '../layouts/Auth.layout'
import { loadMyData } from '../store/modules/auth/actions'
import { DynamicRedirection } from '../pages/auth/DynamicRedirection'

const MainRoute = () => {
    const isLoggedIn = useSelector(
        (state: any) =>
            state.authReducer.isLoggedIn || !!state.authReducer.token,
    )

    const dispatch: any = useDispatch()
    const user = useSelector((state: any) => state.authReducer.user)
    const setDefaultPath = isLoggedIn ? '/dashboard' : '/auth'
    const [redirection, setRedirection] = useState('/dashboard')

    const loadUserData = async () => {
        if (isLoggedIn) {
            await dispatch(loadMyData())
        }
    }

    useEffect(() => {
        loadUserData()
    }, [])

    return (
        <Routes>
            <Route
                path={'/auth/*'}
                element={
                    !isLoggedIn ? (
                        <AuthLayout />
                    ) : (
                        <Navigate to={'/dashboard'} />
                    )
                }
            />
            <Route
                path={'/dashboard/*'}
                element={
                    isLoggedIn ? <DashboardLayout /> : <Navigate to={'/auth'} />
                }
            />
            <Route path={'/redirect'} element={<DynamicRedirection />} />
            <Route path="*" element={<Navigate to={setDefaultPath} />} />
        </Routes>
    )
}

export default MainRoute
