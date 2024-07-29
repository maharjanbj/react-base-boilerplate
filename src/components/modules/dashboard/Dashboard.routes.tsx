import { Route, Routes } from 'react-router-dom'
import { DashboardRoutesList } from './Dashboard-routes.list'
import { useSelector } from 'react-redux'

export const DashboardRoutes = () => {
  const userRole = useSelector((state: any) => state.authReducer?.user?.role)
  const getSupportRoutes = () => {
    return DashboardRoutesList
  }

  return (
    <div className="overflow-auto" style={{ height: 'calc(100vh - 60px)' }}>
      <Routes>
        {getSupportRoutes().map((v: any, key) => (
          <Route
            key={key}
            path={v.path}
            element={v.element}
            index={true}
          />
        ))}
      </Routes>
    </div>
  )
}
