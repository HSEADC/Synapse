import React from 'react'
import ReactDOM from 'react-dom'

export default class M_ProgressBar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { totalSteps, currentStep } = this.props

    const steps = []
    for (let index = 0; index < totalSteps; index++) {
      steps.push(
        <div key={index} className="stepWrapper">
          <div
            className={`A_Step ${currentStep > index ? 'accomplished' : ''}`}
          ></div>
          {index < totalSteps - 1 && (
            <div
              className={`A_StepDivider ${
                currentStep - 1 > index ? 'accomplished' : ''
              }`}
            ></div>
          )}
        </div>
      )
    }

    return <div className="M_ProgressBar">{steps}</div>
  }
}
