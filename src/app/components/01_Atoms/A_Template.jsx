import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_Template extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, charityData, handleClick } = this.props

    const classes = classnames({
      A_Template: true,
      [`${type}`]: true
    })

    return <div className={classes}></div>
  }
}
