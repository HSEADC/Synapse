import { generateRandom } from './utilities'

// COLORS

// Design

async function helloWorld(template, charityData) {
  const frame = figma.createFrame()
  frame.resize(template[0], template[1])

  const text = figma.createText()
  const { identityColors } = charityData

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
    {
      type: 'SOLID',
      color: {
        r: identityColors.text.r > 1 ? 1 : Math.abs(identityColors.text.r),
        g: identityColors.text.g > 1 ? 1 : Math.abs(identityColors.text.g),
        b: identityColors.text.b > 1 ? 1 : Math.abs(identityColors.text.b)
      }
    }
  ]
  frame.fills = [
    {
      type: 'SOLID',
      color: {
        r:
          identityColors.background.r > 1
            ? 1
            : Math.abs(identityColors.background.r),
        g:
          identityColors.background.g > 1
            ? 1
            : Math.abs(identityColors.background.g),
        b:
          identityColors.background.b > 1
            ? 1
            : Math.abs(identityColors.background.b)
      }
    }
  ]

  const rect = figma.createRectangle()
  rect.x = 0
  rect.y = frame.height / 2
  rect.resize(frame.width, frame.height / 2)
  rect.fills = [
    {
      type: 'SOLID',
      color: {
        r:
          identityColors.primary.r > 1 ? 1 : Math.abs(identityColors.primary.r),
        g:
          identityColors.primary.g > 1 ? 1 : Math.abs(identityColors.primary.g),
        b: identityColors.primary.b > 1 ? 1 : Math.abs(identityColors.primary.b)
      }
    }
  ]

  frame.appendChild(text)
  frame.appendChild(rect)
}

export { helloWorld }
