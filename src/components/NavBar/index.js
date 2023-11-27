import React, { memo } from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
const comp = memo(function ({ children, extra, onLeftClick, className }) {
  const history = useHistory()
  const back = () => {
    if (onLeftClick) {
      onLeftClick()
    } else {
      history.go(-1)
    }
  }

  return (
    <div className={classNames(styles.root, className)}>
      <div className="left">
        <Icon type="iconfanhui" onClick={back}></Icon>
      </div>
      <div className="title">{children}</div>
      <div className="right">{extra}</div>
    </div>
  )
})
const NavBar = withRouter(comp)
export default NavBar
