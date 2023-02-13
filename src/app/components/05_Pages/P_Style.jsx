import React, { useEffect, useMemo, useState } from 'react'
import { generateNewIdentity } from '../../../plugin/identity'
import {
  createBaseColor,
  convertHSLtoRGB,
  createScientificPalette
} from '../../../plugin/color'
import A_Button from '../01_Atoms/A_Button'

// class ColorPreview(color) extends React.Component {
//   constructor(params){

//   }

//   return (
//     <div
//       style={{
//         width: '100px',
//         height: '100px',
//         backgroundColor: color,
//         display: 'inline-block'
//       }}
//     >
//     </div>
//   )
// }

export const Style = () => {
  var isButtonPressed = useState(false)

  const preview = useMemo(() => {
    console.log('a')
    if (!isButtonPressed) {
      console.log('b')
      return <></>
    }
    const palettePreview = []
    for (let i = 0; i < 5; i++) {
      palettePreview.push(<ColorPreview key={i} color={createBaseColor()} />)
    }
    console.log(palettePreview)
    console.log('c')
    return <div>{palettePreview}</div>
  }, [isButtonPressed])

  return (
    <>
      <button
        onClick={() => {
          console.log('pressed')
          isButtonPressed = true
          console.log(isButtonPressed, 'isButtonPressed')
        }}
      >
        create
      </button>
      {preview}
    </>
  )
}

// если тру запусти функцию которая ретернит
// реактивное программирование
// выстроить на иф/элсах
