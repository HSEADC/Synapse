import { generateRandom, convertHSLtoRGB } from './utilities'

// COLORS

// function adjustHue(val) {
//   if (val < 0) val += Math.ceil(-val / 360) * 360
//
//   return val % 360
// }

function createScientificPalette() {
  const baseColor = {
    l: String(Math.random()).slice(0, 4) * 100,
    s: String(Math.random()).slice(0, 4) * 100,
    h: Math.floor(Math.random() * 360)
  }

  const baseColorRGB = convertHSLtoRGB(baseColor.h, baseColor.s, baseColor.l)

  // console.log('basecolorRGB:', baseColorRGB)
  return baseColorRGB

  // const targetHueSteps = {
  //   analogous: [0, 30, 60],
  //   triadic: [0, 120, 240],
  //   tetradic: [0, 90, 180, 270],
  //   complementary: [0, 180],
  //   splitComplementary: [0, 150, 210]
  // }
  //
  // const palette = {}
  //
  // for (const type of Object.keys(targetHueSteps)) {
  //   palettes[type] = targetHueSteps[type].map(step => ({
  //     l: baseColor.l,
  //     c: baseColor.c,
  //     h: adjustHue(baseColor.h + step),
  //     mode: 'lch'
  //   }))
  // }
  //
  // return palette
}

// function paletteGeneration() {
//   for (var i = 0; i < 5; i++) {
//     var rect = figma.createRectangle()
//     rect.x = 50
//     rect.y = 50
//     rect.resize(200, 100)
//     rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]
//   }
// }

// Design

async function helloWorld(frame) {
  const text = figma.createText()

  createScientificPalette()

  text.x = 10
  text.y = -20
  await figma.loadFontAsync(text.fontName)
  text.characters = 'Hello world!'
  text.fontSize = 220
  text.letterSpacing = {
    value: -7,
    unit: 'PERCENT'
  }
  text.fills = [{ type: 'SOLID', color: { r: 1, g: 0.8, b: 1 } }]

  const rect = figma.createRectangle()
  rect.x = 0
  rect.y = frame.height / 2
  rect.resize(frame.width, frame.height / 2)
  rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.8, b: 1 } }]

  frame.appendChild(text)
  frame.appendChild(rect)
}

export { helloWorld }
