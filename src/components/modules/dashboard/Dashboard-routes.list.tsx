import { DashboardScreen } from "../../../pages/dashboard/Dashboard.screen";

export const DashboardRoutesList = [
    {
        element: <DashboardScreen />,
        path: '*',
        isAdminRoute: false,
        title: 'Dashboard',
    },
]