import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_PalettePreview from '../01_Atoms/A_PalettePreview'

let palettePreviews = []

export default class M_PalettePreviews extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { identityColorsProgress, identityColors, savePalette } = this.props

    return (
      <div className="M_PalettePreviews">
        {identityColorsProgress.map((colors, index) => (
          <A_PalettePreview
            key={index}
            colors={colors}
            savePalette={savePalette}
            checked={identityColors === colors}
          />
        ))}
      </div>
    )
  }
}
