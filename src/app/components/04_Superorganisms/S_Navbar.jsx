import classnames from 'classnames'
import { log } from 'prettierr/parser-postcss'
import React from 'react'
import ReactDOM from 'react-dom'
import A_Button from '../01_Atoms/A_Button'
import M_ProgressBar from '../02_Molecules/M_Progress_Bar'

export default class S_Navbar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    console.log('click')
  }

  render() {
    const {
      back,
      progressBar,
      totalSteps,
      currentStep,
      text,
      prevStepIdentity
    } = this.props

    return (
      <>
        <div className="S_Navbar">
          {back && (
            <A_Button type="icon" icon="back" handleClick={prevStepIdentity} />
          )}
          {text}
        </div>
        {progressBar && (
          <M_ProgressBar totalSteps={totalSteps} currentStep={currentStep} />
        )}
      </>
    )
  }
}
