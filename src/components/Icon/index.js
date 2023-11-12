import classNames from 'classnames'
import React, { memo } from 'react'
import PropTypes from 'prop-types'
const Icon = memo(function Icon({type, className, ...rest}) {
  return (
    <svg {...rest} aria-hidden="true" className={classNames('icon', className)} >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
})

Icon.propTypes = {
  type: PropTypes.string.isRequired
}

export default Icon


