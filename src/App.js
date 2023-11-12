import React, { memo } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
const Login = React.lazy(() => import( '@/pages/Login'))
const Home = React.lazy(() => import( '@/pages/Home'))
export default memo(function App() {
  return (
      <Router>
        <div className='app'>
          <Switch>
            <Redirect from='/' exact to='/login'></Redirect>
            <Route path='/login' component={Login}></Route>
            <Route path='/home' component={Home}></Route>
          </Switch>
        </div>
      </Router>
  )
})
