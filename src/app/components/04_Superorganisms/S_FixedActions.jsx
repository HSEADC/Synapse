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
      secButtonDisable,
      noBorder
    } = this.props

    const classes = classnames({
      S_FixedActions: true,
      noBorder: noBorder
    })

    return (
      <div className={classes}>
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
