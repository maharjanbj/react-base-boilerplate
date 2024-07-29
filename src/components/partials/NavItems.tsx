

import {
    HomeCog,
    LayoutGrid,
    TruckDelivery,
    Users
} from "tabler-icons-react";

export const adminNavItems: any[] = [
    {
        type: 'default',
        label: 'Dashboard',
        icon: <LayoutGrid />,
        link: '/dashboard',
        isAdminRoute: false,
        subItems: [],
    },
    {
        type: 'group',
        label: 'Application Settings',
        icon: <HomeCog/>,
        link: '',
        isAdminRoute: false,
        subItems: [
            {
                label: 'Users',
                icon: <Users />,
                isAdminRoute: true,
                link: '/dashboard/admin',
            },
            {
                label: 'Delivery Partners',
                icon: <TruckDelivery />,
                isAdminRoute: false,
                link: '/dashboard/delivery-partners',
            },
        ],
    },

    // {
    // type:'default',label: 'Wallet', icon: <Wallet/>, link: '/dashboard/wallet', isAdminRoute:false, subItems: []},
] as any[]
