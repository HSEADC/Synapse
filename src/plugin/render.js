import { getNewFills } from './images'
import { getStoreLanguage } from './store'
import { generateRandom, convertHSLtoRGB } from './utilities'
import { createBaseColor } from './color'

function getImageBytesFromImagesForExportById(id) {
  const imagesForExport = getStoreImagesForExport()
  let imageBytes

  imagesForExport.forEach((image, i) => {
    if (image.id === id) {
      imageBytes = image.image
    }
  })

  return imageBytes
}

function renderFigmaTemplate(imagesForExport) {
  figma.currentPage.selection = mainFrame
  figma.viewport.scrollAndZoomIntoView(mainFrame)
}

function renderFigmaFrame(template, charityData) {
  const frame = figma.createFrame()
  frame.resize(template.height, template.width)
  frame.x = figma.viewport.center.x + template.width
  frame.y = figma.viewport.center.y

  const colors = charityData.identityColors
  frame.fills = [
    {
      type: 'SOLID',
      color: {
        r: colors[template.background].r,
        g: colors[template.background].g,
        b: colors[template.background].b
      }
    }
  ]
  figma.viewport.scrollAndZoomIntoView([frame])

  Object.values(template.elements).map(element => {
    switch (element.type) {
      case 'text':
        console.log('charityData.identityFonts', charityData.identityFonts)
        ;(async () => {
          const text = figma.createText()
          console.log('create text')

          text.x = element.x * template.width
          text.y = element.y * template.height

          await figma.loadFontAsync({
            family: charityData.identityFonts,
            style: 'Regular'
          })
          text.fontName = {
            family: charityData.identityFonts,
            style: 'Regular'
          }
          text.characters = element.text

          text.fontSize =
            (Number(element.size.slice(0, -3)) / 100) * template.width
          text.fills = [
            {
              type: 'SOLID',
              color: {
                r: colors[element.color].r,
                g: colors[element.color].g,
                b: colors[element.color].b
              }
            }
          ]

          frame.appendChild(text)
        })()
        break

      case 'img':
        const image = figma.createRectangle()

        image.x = 50
        image.y = 50

        image.resize(200, 100)

        image.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]

        frame.appendChild(image)
        break

      default:
        break
    }
    // console.log("key", key);
  })
}

function createDesignFrame() {
  const frame = figma.createFrame()
  const color = createBaseColor()
  frame.resize(1080, 1080)
  frame.fills = [
    { type: 'SOLID', color: { r: color.r, g: color.g, b: color.b } }
  ]
  frame.layoutGrids = [
    { pattern: 'GRID', sectionSize: 27, color: { r: 1, g: 1, b: 1, a: 0.2 } },
    {
      pattern: 'COLUMNS',
      alignment: 'STRETCH',
      gutterSize: 27,
      count: 2,
      offset: 27,
      color: { r: 1, g: 1, b: 1, a: 0.2 }
    }
  ]
  figma.viewport.scrollAndZoomIntoView([frame])
  return frame
}

export { renderFigmaTemplate, createDesignFrame, renderFigmaFrame }
