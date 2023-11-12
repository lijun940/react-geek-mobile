import React, { memo } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
export default memo(function Input({extra,onExtraClick,className,...rest}) {
  return (
    <div className={styles.root}>
      <input {...rest} className={classNames('input', className)}/>
      {extra && <div className="extra" onClick={onExtraClick}>{extra}</div>}
    </div>
  )
})
