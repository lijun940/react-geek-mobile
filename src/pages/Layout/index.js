import React, { memo, lazy, Suspense } from 'react'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import AuthRoute from '@/components/AuthRoute'
const Home = lazy(() => import('@/pages/Home'))
const QA = lazy(() => import('@/pages/QA'))
const Video = lazy(() => import('@/pages/Video'))
const Profile = lazy(() => import('@/pages/Profile'))
const buttons = [
  { id: 1, title: '首页', to: '/home', icon: 'iconbtn_home' },
  { id: 2, title: '问答', to: '/home/qa', icon: 'iconbtn_qa' },
  { id: 3, title: '视频', to: '/home/video', icon: 'iconbtn_video' },
  { id: 4, title: '我的', to: '/home/profile', icon: 'iconbtn_mine' },
]
export default memo(function Layout() {
  const history = useHistory()
  const location = useLocation()
  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content">
        <Suspense fallback={<div>...loading</div>}>
          <Switch>
            <Route path="/home" component={Home} exact />
            <Route path="/home/qa" component={QA} exact />
            <Route path="/home/video" component={Video} exact />
            <AuthRoute path="/home/profile" component={Profile} exact />
          </Switch>
        </Suspense>
      </div>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {buttons.map((item) => (
          <div
            className={classNames(
              'tabbar-item',
              location.pathname === item.to ? 'tabbar-item-active' : ''
            )}
            key={item.title}
            onClick={() => history.push(item.to)}
          >
            <Icon
              type={
                location.pathname === item.to ? item.icon + '_sel' : item.icon
              }
            />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
})
