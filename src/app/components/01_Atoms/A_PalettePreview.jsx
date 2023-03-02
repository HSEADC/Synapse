import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { createBaseColor, createScientificPalette } from '../../../plugin/color'

export default class A_PalettePreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  test = charityData => {
    createScientificPalette(createBaseColor(charityData), charityData)
  }

  createIdentityPalette = charityData => {
    const palette = []
    const colors = {
      primary: '',
      background: '',
      text: '',
      adOne: '',
      adTwo: ''
    }

    let key = 'primary'

    colors.primary = createBaseColor(charityData)

    for (let i = 1; i < 6; i++) {
      switch (i) {
        case 2:
          key = 'background'
          break

        case 3:
          key = 'text'
          break

        case 4:
          key = 'adOne'
          break

        case 5:
          key = 'adTwo'
          break
      }
      palette.push(this.swatch(eval(`colors.${key}`), i))
      console.log()
    }

    return palette
  }

  swatch = (color, i) => {
    console.log(color)
    const r = color.r * 255
    const g = color.g * 255
    const b = color.b * 255

    return (
      <div
        key={i}
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
        {this.test(charityData)}
      </div>
    )
  }
}
