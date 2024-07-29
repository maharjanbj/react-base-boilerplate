

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { APIChangeAdminPassword, APIValidateAdmin } from '../../api/users'
import { errorNotification } from '../../utils/helpers/notifications'
import { Check } from 'tabler-icons-react'

export const PasswordChanged = () => {
    const navigate = useNavigate()

    return (
        <section className="h-full overflow-auto flex items-center justify-center w-full flex-col">
            <div className="text-green-700">
                <Check size={120} />
            </div>
            <div className="text-xl font-bold">
                Your password has been changed successfully.
            </div>
            <div className="text-lg">
                Please go to login screen and enter your credentials to access
                the dashboard.
            </div>
            <Button onClick={() => navigate('/')} mt={'3xl'}>
                Go to login
            </Button>
        </section>
    )
}
