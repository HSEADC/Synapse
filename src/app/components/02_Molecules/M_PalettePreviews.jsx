import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_PalettePreview from '../01_Atoms/A_PalettePreview'

let palettePreviews = []

export default class M_PalettePreviews extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  createPalettePreviews = (charityData, savePalette) => {
    for (let i = 0; i < 5; i++) {
      palettePreviews.push(
        <A_PalettePreview
          key={i}
          charityData={charityData}
          savePalette={savePalette}
        />
      )
    }
    return palettePreviews
  }

  render() {
    const { charityData, savePalette } = this.props
    return (
      <div className="M_PalettePreviews">
        {
          (palettePreviews = this.createPalettePreviews(
            charityData,
            savePalette
          ))
        }
      </div>
    )
  }
}
