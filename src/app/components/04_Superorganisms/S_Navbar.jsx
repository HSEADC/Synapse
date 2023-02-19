import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_Button from '../01_Atoms/A_Button'
import M_ProgressBar from '../02_Molecules/M_Progress_Bar'

export default class S_Navbar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      back,
      progressBar,
      totalSteps,
      currentStep,
      text,
      type,
      handleClick
    } = this.props

    const classes = classnames({
      S_Navbar: true,
      [`${type}`]: true
    })

    return (
      <div className={classes}>
        {back && <A_Button text="back" type="icon" icon="back" />}
        {text}
      </div>
    )
  }
}
