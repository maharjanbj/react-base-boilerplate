

import React, { useEffect, useState } from 'react'
import { AppShell, useMantineTheme } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../utils/helpers/tokenStorage.helper'
import { Navbar } from '../components/partials/Navbar'
import { HeaderNav } from '../components/partials/HeaderNav'
import dashboardBG from '../assets/images/dashboardBackground.svg'
import { DashboardRoutes } from '../components/modules/dashboard/Dashboard.routes'

export const DashboardLayout = () => {
    const user = getUser()
    const navigate = useNavigate()
    const theme = useMantineTheme()
    const [opened, setOpened] = useState(true)

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'xs',
                collapsed: { mobile: true },
            }}
            padding={0}
            className={'dashboard-layout'}
        >
            <AppShell.Header p={0}>
                <HeaderNav />
            </AppShell.Header>
            <AppShell.Navbar p={0}>
                <Navbar opened={opened} setOpened={setOpened} />
            </AppShell.Navbar>
            <AppShell.Main>
                <div className="relative w-full">
                    <DashboardRoutes />
                </div>
            </AppShell.Main>
        </AppShell>
    )
}
