import React, { memo } from 'react'
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import { history } from './utils/history'
import AuthRoute from './components/AuthRoute'
const  ProfileFeedback = React.lazy(() => import('@/pages/Profile/Feedback'))
const Login = React.lazy(() => import('@/pages/Login'))
const Home = React.lazy(() => import('@/pages/Layout'))
const ProfileEdit = React.lazy(() => import('@/pages/Profile/Edit'))
const ProfileChat = React.lazy(() => import('@/pages/Profile/Chat'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))
export default memo(function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Redirect from="/" exact to="/login"></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
          <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
          <AuthRoute path="/profile/chat" component={ProfileChat}></AuthRoute>
          <AuthRoute path="/profile/feedback" component={ProfileFeedback}></AuthRoute>
          <Route component={NotFound}></Route>

        </Switch>
      </div>
    </Router>
  )
})
