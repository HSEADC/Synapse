import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_Button from '../01_Atoms/A_Button'

export default class S_FixedActions extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      type,
      primButtonText,
      primButtonHandleClick,
      secButtonText,
      secButtonHandleClick,
      primButtonDisableParam,
      primButtonDisable,
      secButtonDisableParam,
      secButtonDisable
    } = this.props

    const classes = classnames({
      A_TextInput: true,
      [`${type}`]: true
    })

    return (
      <div className="S_FixedActions">
        {secButtonText && (
          <A_Button
            text={secButtonText}
            type="secondary"
            handleClick={secButtonHandleClick}
            disableParam={secButtonDisableParam}
            disable={secButtonDisable}
          />
        )}
        <A_Button
          text={primButtonText}
          handleClick={primButtonHandleClick}
          disableParam={primButtonDisableParam}
          disable={primButtonDisable}
        />
      </div>
    )
  }
}
