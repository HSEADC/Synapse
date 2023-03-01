import React from 'react'
import ReactDOM from 'react-dom'
import { ProgressBar, Step } from 'react-step-progress-bar'

export default class M_ProgressBar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { totalSteps, currentStep } = this.props

    const steps = []
    for (let index = 0; index < totalSteps; index++) {
      steps.push(
        <>
          <div
            className={`A_Step ${currentStep > index ? 'accomplished' : ''}`}
          ></div>
          <div
            className={`A_StepDivider ${
              currentStep - 1 > index ? 'accomplished' : ''
            }`}
          ></div>
        </>
      )
    }

    return (
      //     <ProgressBar
      //       percent={(currentStep / totalSteps) * 100}
      //       unfilledBackground="#DBDDE0"
      //       filledBackground="#131D27"
      //       width="240px"
      //       height="2px"
      //     >
      //       <Step>
      //         {({ accomplished, index }) => (
      //           <div
      //             className={`indexedStep ${accomplished ? 'accomplished' : null}`}
      //           >
      //             {index}
      //           </div>
      //         )}
      //       </Step>
      //       <Step>
      //         {({ accomplished, index }) => (
      //           <div
      //             className={`indexedStep ${accomplished ? 'accomplished' : null}`}
      //           ></div>
      //         )}
      //       </Step>
      //       <Step>
      //         {({ accomplished, index }) => (
      //           <div
      //             className={`indexedStep ${accomplished ? 'accomplished' : null}`}
      //           ></div>
      //         )}
      //       </Step>
      //       <Step>
      //         {({ accomplished, index }) => (
      //           <div
      //             className={`indexedStep ${accomplished ? 'accomplished' : null}`}
      //           ></div>
      //         )}
      //       </Step>
      //       <Step>
      //         {({ accomplished, index }) => (
      //           <div
      //             className={`indexedStep ${accomplished ? 'accomplished' : null}`}
      //           ></div>
      //         )}
      //       </Step>
      //     </ProgressBar>

      <div className="M_ProgressBar">{steps}</div>
    )
  }
}
