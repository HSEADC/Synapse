import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { createBaseColor, createScientificPalette } from '../../../plugin/color'

export default class A_PalettePreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  // добавлять цвета в стейт и для каждого цвета генерить превью
  // почитать про persistent storage

  renderIdentityPalette = colors => {
    const palettePreview = []

    let key = 'primary'

    for (let i = 1; i < 6; i++) {
      switch (i) {
        case 1:
          key = 'background'
          break

        case 2:
          key = 'adOne'
          break

        case 3:
          key = 'primary'
          break

        case 4:
          key = 'adTwo'
          break

        case 5:
          key = 'text'
          break
      }
      palettePreview.push(this.swatch(eval(`colors.${key}`), i))
    }
    return palettePreview
  }

  swatch = (color, i) => {
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
    const { colors, savePalette, checked } = this.props

    const classes = classnames({
      A_PalettePreview: true,
      checked: checked
    })

    return (
      <div
        className={classes}
        onClick={() => {
          savePalette(colors)
        }}
      >
        {this.renderIdentityPalette(colors)}
      </div>
    )
  }
}
