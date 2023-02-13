import React from 'react'
import ReactDOM from 'react-dom'

export default class A_OnboardingImage extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { image } = this.props
    return <img className="A_OnboardingImage" src={image} />
  }
}
