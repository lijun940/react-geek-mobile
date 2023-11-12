import React, { memo } from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
const comp = memo(function ({children, extra}) {
  const history = useHistory()
  const back = () => {
    history.go(-1)
  }
  
  return (
    <div className={styles.root}>
    <div className="left">
      <Icon type='iconfanhui' onClick={back}></Icon>
    </div>
    <div className="title">
      {
        children
      }
    </div>
    <div className="right">
      {extra}
    </div>
  </div>
  )
})
const NavBar = withRouter(comp)
export default NavBar