import React from 'react'
import { generateNewIdentity } from '../../../plugin/identity'
import {
  createBaseColor,
  convertHSLtoRGB,
  createScientificPalette
} from '../../../plugin/color'

export const Style = () => {
  function ColorPreview() {
    return (
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: color,
          display: 'inline-block'
        }}
      ></div>
    )
  }

  function PalettePreview() {
    const palettePreview = []
    for (let i = 0; i < 5; i++) {
      palettePreview.push(<ColorPreview key={i} color={createBaseColor()} />)
    }
    return <PalettePreview />
  }

  return <PalettePreview />
}
