import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { createBaseColor, createScientificPalette } from '../../../plugin/color'

export default class A_PatternPreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  createIdentityPattern = charityData => {
    const {
      friendliness,
      rationality,
      volume,
      charityCategory,
      identityPattern,
      identityColors
    } = charityData

    return <div>boooo</div>
  }

  swatch = colors => {
    return <div></div>
  }

  render() {
    const { charityData, savePattern } = this.props
    const {
      friendliness,
      rationality,
      volume,
      charityCategory,
      identityPattern,
      identityColors
    } = charityData
    const pattern = this.createIdentityPattern(charityData)

    return (
      <div
        className="A_PatternPreview"
        onClick={() => {
          savePattern(pattern)
        }}
      >
        {pattern}
      </div>
    )
  }
}
