import { Accordion, Avatar, Button, Indicator, Tooltip } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { adminNavItems } from './NavItems'

export const Navbar = (props: any) => {

    const [indicators, setIndicators] = useState({} as any)
    const [orderCount, setOrderCount] = useState(0)
    const [merchantCount, setMerchantCount] = useState(0)
    const [userComplaintCount, setUserComplaintCount] = useState(0)
    const userRole = useSelector((state: any) => state.authReducer?.user?.role)

    const isAdminRoute = (val: boolean) => {
        return userRole === 'default' ? !val : true
    }

    return (
        <nav
            style={{
                height: 'calc(100vh - 62px)',
            }}
            className={`side-nav flex flex-col items-center justify-center overflow-auto ${
                props.opened ? 'opened' : 'closed'
            }`}
        >
            <div
                className={`nav-items w-full overflow-auto flex-grow ${
                    props.opened ? 'py-xs px-sm' : 'py-xs px-xs'
                }`}
            >
                {adminNavItems.map((v, key) =>
                    v.type === 'default'
                        ? isAdminRoute(v.isAdminRoute) && (
                              <Indicator
                                  inline
                                  label={
                                      v.label.toLowerCase() === 'merchants'
                                          ? merchantCount
                                          : v.label.toLowerCase() === 'orders'
                                            ? orderCount
                                            : ''
                                  }
                                  size={16}
                                  disabled={
                                      !['merchants', 'orders'].includes(
                                          v.label.toLowerCase(),
                                      ) || props.opened
                                  }
                                  className={'mt-xs'}
                                  key={key}
                              >
                                  <NavLink
                                      className={
                                          'nav-item default flex items-center items-center'
                                      }
                                      to={v.link ?? ''}
                                      end={v.label === 'Dashboard'}
                                  >
                                      {v.icon}
                                      {props.opened && (
                                          <div className="flex justify-between flex-grow">
                                              <label className={'block'}>
                                                  {v.label}
                                              </label>


                                          </div>
                                      )}
                                  </NavLink>
                              </Indicator>
                          )
                        : isAdminRoute(v.isAdminRoute) && (
                              <Accordion
                                  key={key}
                                  styles={{
                                      item: {
                                          backgroundColor: '#fff',
                                          border: 'none',
                                          // label: {
                                          //     fontSize: '1rem',
                                          //     paddingTop: '0px',
                                          //     paddingBottom: '0px',
                                          // },
                                      },
                                  }}
                              >
                                  <Accordion.Item value={v.label}>
                                      <Accordion.Control
                                          style={{ padding: '4px 18px' }}
                                      >
                                          {props.opened ? (
                                              <div className="flex items-center nav-item">
                                                  {v.icon}
                                                  {props.opened && (
                                                      <label>

                                                            {v.label}
                                                      </label>
                                                  )}
                                              </div>
                                          ) : (
                                              <Tooltip label={v.label}>
                                                  <div className="flex items-center nav-item">
                                                      {v.icon}
                                                      {props.opened && (
                                                          <label>
                                                              {v.label}
                                                          </label>
                                                      )}
                                                  </div>
                                              </Tooltip>
                                          )}
                                      </Accordion.Control>
                                      <Accordion.Panel>
                                          {v.subItems.map(
                                              (v2: any, key2: number) =>
                                                  isAdminRoute(
                                                      v2.isAdminRoute,
                                                  ) && (
                                                      <NavLink
                                                          className="nav-item "
                                                          key={key2 + 'subItem'}
                                                          to={v2.link ?? ''}
                                                          end={
                                                              v2.label ===
                                                              'Dashboard'
                                                          }
                                                      >
                                                          {v2.icon}
                                                          {props.opened && (
                                                              <div
                                                                  className={
                                                                      'flex justify-between items-center'
                                                                  }
                                                              >
                                                                  <label>
                                                                      {v.label}
                                                                  </label>
                                                              </div>
                                                          )}
                                                      </NavLink>
                                                  ),
                                          )}
                                      </Accordion.Panel>
                                  </Accordion.Item>
                              </Accordion>
                          ),
                )}
            </div>
            {/*<div className={`w-full p-sm`}>*/}
            {/*    <Button*/}
            {/*        onClick={() => props.setOpened(!props.opened)}*/}
            {/*        className={`w-full ${props.opened ? '' : 'p-xs'}`}*/}
            {/*        variant={'subtle'}*/}
            {/*    >*/}
            {/*        {props.opened ? <ChevronLeft /> : <ChevronRight />}*/}
            {/*        {props.opened && <label>Close Sidebar</label>}*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </nav>
    )
}
