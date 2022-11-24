import { generateRandom } from './utilities'
import { createBaseColor, convertHSLtoRGB } from './color'

// COLORS

// Design

async function helloWorld(frame) {
  const text = figma.createText()

  const baseColor = createBaseColor()
  console.log(baseColor.r)

  text.x = 10
  text.y = -20
  await figma.loadFontAsync(text.fontName)
  text.characters = 'Hello world!'
  text.fontSize = 220
  text.letterSpacing = {
    value: -7,
    unit: 'PERCENT'
  }
  text.fills = [
    { type: 'SOLID', color: { r: baseColor.r, g: baseColor.g, b: baseColor.b } }
  ]

  const rect = figma.createRectangle()
  rect.x = 0
  rect.y = frame.height / 2
  rect.resize(frame.width, frame.height / 2)
  rect.fills = [
    { type: 'SOLID', color: { r: baseColor.r, g: baseColor.g, b: baseColor.b } }
  ]

  frame.appendChild(text)
  frame.appendChild(rect)
}

export { helloWorld, createBaseColor }
