import React from 'react'
import ReactDOM from 'react-dom'

export default class M_ProgressBar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { progressBarSteps, currentStep } = this.props

    return (
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}
