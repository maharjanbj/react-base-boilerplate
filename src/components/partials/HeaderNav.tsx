

import {
    ActionIcon,
    Avatar,
    Grid,
    Group,
    Text,
    Menu,
    TextInput,
    useMantineColorScheme,
    Indicator,
    Badge,
} from '@mantine/core'
import {
    Bell,
    Globe,
    Logout,
    Moon,
    Search,
    Sun,
    User,
} from 'tabler-icons-react'
import { logoutUser } from '../../store/modules/auth/actions'
import { getUser } from '../../utils/helpers/tokenStorage.helper'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getInitials } from '../../utils/helpers/typo'
import { Logo } from '../common/Logo'
import { useForm } from '@mantine/form'
import { LogoHorizontal } from '../common/LogoHorizontal'
import { useEffect, useState } from 'react'
import { APIGetMyNotifications } from '../../api/notification'
import { getImageUrl } from '../../utils/helpers/imageUrlHandler'
import { formatDate } from '../../utils/helpers/date.helper'
import { USER_ROLE_ENUM } from '../../utils/constants/user-status.helper'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../../plugins/i18n'

export const HeaderNav = () => {
    const user = getUser() ?? {
        firstName: 'admin',
        lastName: 'admin',
        role: 'admin',
    }
    const navigate = useNavigate()
    const dispatch: any = useDispatch()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const dark = colorScheme === 'dark'
    const [notifications, setNotifications] = useState([] as any)
    const [totalUnread, setTotalUnread] = useState(0)
    const { t, i18n } = useTranslation()

    const languageOptions = [
        { code: 'en', label: 'English' },
    ]

    const activeLanguage = languageOptions.find(
        lang => lang.code === i18n.language,
    )

    const handleLanguageChange = (code: string) => {
        changeLanguage(code)
    }

    const loadNotifications = async () => {
        const res: any = await APIGetMyNotifications()
        const count = res.reduce((acc: any, obj: any) => {
            if (obj.view === false) {
                return acc + 1
            }
            return acc
        }, 0)
        setTotalUnread(count)
        setNotifications(res)
    }

    useEffect(() => {
        loadNotifications()
    }, [])
    const logoutCurrentUser = () => {
        dispatch(logoutUser())
    }

    const form = useForm({
        initialValues: {
            keyword: '',
        },
    })

    const notificationHandler = (v: any) => {
        if (v?.referenceId && v.referenceId !== '') {
            navigate(`/dashboard/${v.type}/${v.referenceId}`)
        }
    }
    return (
        <header
            className={
                'text-white px-sm flex items-center justify-between w-full'
            }
            style={{
                height: '60px',
                borderBottom: '1px solid rgba(0,0,0,.05)',
            }}
        >
            <Grid className={'w-full'} p={0}>
                <Grid.Col span={3} p={0} className={'flex items-center'}>
                    <LogoHorizontal height={40} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <form
                        onSubmit={form.onSubmit((val: any) =>
                            navigate(
                                '/dashboard/search/' + form.values.keyword,
                            ),
                        )}
                    >
                        <TextInput
                            {...form.getInputProps('keyword')}
                            placeholder={'Search Everything'}
                            className="w-full"
                            leftSection={<Search />}
                            variant={'filled'}
                        />
                    </form>
                </Grid.Col>
                <Grid.Col span={3} className={'flex justify-end items-center'}>
                    {user.role === 'admin' && (
                        <div
                            className={
                                'mr-xs header-notification-bell flex items-center'
                            }
                        >
                            <Indicator
                                inline
                                label={totalUnread}
                                disabled={true}
                                size={16}
                            >
                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <Avatar
                                            color={'dark'}
                                            variant={'light'}
                                            radius={'xl'}
                                        >
                                            <Bell />
                                        </Avatar>
                                    </Menu.Target>
                                    <Menu.Dropdown style={{ width: '300px' }}>
                                        {notifications.map(
                                            (v: any, key: number) => (
                                                <Menu.Item
                                                    leftSection={
                                                        <Avatar
                                                            src={getImageUrl(
                                                                v.img,
                                                            )}
                                                        />
                                                    }
                                                    onClick={() =>
                                                        notificationHandler(v)
                                                    }
                                                    key={key}
                                                >
                                                    <div>{v.content}</div>
                                                    <div className={'text-xs'}>
                                                        {formatDate(
                                                            v.createdAt,
                                                        )}
                                                    </div>
                                                </Menu.Item>
                                            ),
                                        )}
                                    </Menu.Dropdown>
                                </Menu>
                            </Indicator>
                        </div>
                    )}

                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Group
                                align={'center'}
                                gap={8}
                                className={'cursor-pointer'}
                            >
                                <Avatar
                                    color="cyan"
                                    radius="xl"
                                    className={'uppercase'}
                                    src={getImageUrl(user?.img ?? '')}
                                >
                                    {getInitials(user.firstName, user.lastName)}
                                </Avatar>
                                <div className={'capitalize'}>
                                    <Text
                                        size={'xs'}
                                        color={'gray'}
                                        className={
                                            'flex items-center text-left capitalize font-bold'
                                        }
                                    >
                                        {user?.firstName} {user?.lastName}
                                    </Text>
                                    <div className="text-primary-700 text-xs capitalize">
                                        Admin
                                    </div>
                                </div>
                            </Group>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<User />}
                                onClick={() => navigate('/dashboard/profile')}
                            >
                                Profile
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<User />}
                                onClick={() =>
                                    navigate('/dashboard/user-settings')
                                }
                            >
                                User Settings
                            </Menu.Item>
                            <Menu position="left-start" width={'140px'}>
                                <Menu.Target>
                                    <div className="cursor-pointer ml-xs flex items-center pl-[2px] my-xs">
                                        <Globe />{' '}
                                        <div className={'ml-[10px]'}>
                                            {t('Switch Language')}
                                        </div>
                                    </div>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {languageOptions.map(lang => (
                                        <Menu.Item
                                            key={lang.code}
                                            onClick={() =>
                                                handleLanguageChange(lang.code)
                                            }
                                        >
                                            <div
                                                className={'flex items-center'}
                                            >
                                                <div className={'flex-1'}>
                                                    {lang.label}
                                                </div>
                                                {lang.code ===
                                                    i18n.language && (
                                                    <Badge
                                                        color="green"
                                                        size="xs"
                                                    >
                                                        Active
                                                    </Badge>
                                                )}
                                            </div>
                                        </Menu.Item>
                                    ))}
                                </Menu.Dropdown>
                            </Menu>
                            <Menu.Item
                                leftSection={<Logout />}
                                onClick={logoutCurrentUser}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>
            </Grid>
        </header>
    )
}
