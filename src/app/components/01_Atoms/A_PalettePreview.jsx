import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { createBaseColor, createScientificPalette } from '../../../plugin/color'

export default class A_PalettePreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  createIdentityPalette = charityData => {
    const primaryColor = createBaseColor(charityData)
    console.log(primaryColor)
  }

  swatch = color => {
    const r = color.r * 255
    const g = color.g * 255
    const b = color.b * 255

    return (
      <div
        className="swatch"
        style={{
          backgroundColor: `rgb(${r}, ${g}, ${b})`
        }}
      ></div>
    )
  }

  render() {
    const { charityData, createIdentityPalette, savePalette } = this.props
    const { friendliness, rationality, volume, charityCategory } = charityData

    return (
      <div className="A_PalettePreview" onClick={savePalette}>
        {this.createIdentityPalette(charityData)}
      </div>
    )
  }
}
