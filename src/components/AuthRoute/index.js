import { isAuth } from '@/utils/storage'
import React from 'react'
import {
  Redirect,
  Route,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min'
export default function AuthRoute({ component: Component, ...rest }) {
  const location = useLocation()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuth()) {
          return <Component />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: location.pathname,
                },
              }}
            />
          )
        }
      }}
    ></Route>
  )
}
