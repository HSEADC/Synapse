import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_DropdownButton extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, icon, text, handleClick, disable, disableParam } = this.props

    const classes = classnames({
      A_DropdownButton: true,
      [`${type}`]: true,
      [`${icon}`]: true
    })

    let disableSwitch = false

    if (disable === true) {
      disableSwitch = !disableParam
    }

    return (
      <button
        className={classes}
        onClick={handleClick}
        disabled={disableSwitch}
      >
        {text}
        <div className="unfold"></div>
      </button>
    )
  }
}
