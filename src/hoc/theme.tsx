

import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import React, { useState } from 'react'
import { NavigationProgress } from '@mantine/nprogress'
import { ModalsProvider } from '@mantine/modals'

export const BaseTheme = (props: any) => {
    return (
        <>
            <MantineProvider
                cssVariablesSelector="html"
                theme={{
                    // Override any other properties from default theme
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    // colorSchemeManager: 'light',
                    spacing: {
                        xs: '8px',
                        sm: '16px',
                        md: '24px',
                        lg: '32px',
                        xl: '40px',
                    },
                    colors: {
                        dark: [
                            '#D5D7E0',
                            '#ACAEBF',
                            '#8C8FA3',
                            '#666980',
                            '#4D4F66',
                            '#34354A',
                            '#2B2C3D',
                            '#1D1E30',
                            '#0C0D21',
                            '#01010A',
                        ],
                        primary: [
                            '#CDD1DB',
                            '#B3B9C9',
                            '#9AA2B7',
                            '#818BA6',
                            '#4F5D82',
                            '#354570',
                            '#1C2E5E',
                            '#03174C',
                            '#031544',
                            '#02123D',
                        ],
                        secondary: [
                            '#FCDEDE',
                            '#FACECE',
                            '#F7ADAD',
                            '#F59C9C',
                            '#F48C8C',
                            '#F27B7B',
                            '#F16B6B',
                            '#EF5A5A',
                            '#EF5A5A',
                            '#A73F3F',
                        ],
                    },
                    primaryColor: 'primary',
                }}
            >
                <Notifications />
                <ModalsProvider>
                    <NavigationProgress />
                    {props.children}
                </ModalsProvider>
            </MantineProvider>
        </>
    )
}
