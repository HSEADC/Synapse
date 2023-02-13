import React from 'react'
import ReactDOM from 'react-dom'

const A_Spacer = ({ size, axis, style = {} }) => {
  const width = axis === 'vertical' ? 1 : size
  const height = axis === 'horizontal' ? 1 : size
  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height
      }}
    />
  )
}
export default A_Spacer
