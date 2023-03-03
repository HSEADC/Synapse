import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { createBaseColor, createScientificPalette } from '../../../plugin/color'

export default class A_PatternPreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  createIdentityPattern = charityData => {}

  swatch = colors => {
    return <div></div>
  }

  render() {
    const { charityData } = this.props
    const { friendliness, rationality, volume, charityCategory } = charityData

    const palette = this.createIdentityPattern(charityData)

    return <div className="A_PatternPreview"></div>
  }
}
