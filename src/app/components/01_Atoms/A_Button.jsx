import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_Button extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      type,
      icon,
      text,
      handleClick,
      disable,
      disableParam,
      color
    } = this.props

    const classes = classnames({
      A_Button: true,
      [`${type}`]: true,
      [`${icon}`]: true
    })

    let disableSwitch = false

    if (disable === true) {
      disableSwitch = !disableParam
    }

    let background

    if (color) {
      background = color
    }

    return (
      <button
        className={classes}
        onClick={handleClick}
        disabled={disableSwitch}
        style={
          color
            ? {
                backgroundColor: `rgba(${background.r * 255}, ${background.g *
                  255}, ${background.b * 255}, 1)`
              }
            : {}
        }
      >
        {text}
      </button>
    )
  }
}
