import React, { memo, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
export default memo(function Input({
  extra,
  onExtraClick,
  className,
  autoFocus,
  ...rest
}) {
  const inputRef = useRef(null)
  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus()
    }
  }, [autoFocus])
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        {...rest}
        className={classNames('input', className)}
      />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  )
})
