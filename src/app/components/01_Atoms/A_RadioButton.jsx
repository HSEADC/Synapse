import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_RadioButton extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, text, handleClick } = this.props

    const classes = classnames({
      A_RadioButton: true,
      [`${type}`]: true
    })

    return (
      <div className={classes} onClick={handleClick}>
        <div className="checkzone"></div>
        {text}
      </div>
    )
  }
}
