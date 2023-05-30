import { getNewFills } from './images'
import { getStoreLanguage } from './store'
import { generateRandom, convertHSLtoRGB } from './utilities'
import { createBaseColor } from './color'
import placeholder1 from '../app/assets/images/placeholders/1.jpg'
import {
  getCharityData,
  getCurrentTemplate,
  getStoreImagesForExport,
  getPatternRenders
} from './store'

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

function renderImage(element, rectangle) {
  let template = getCurrentTemplate()
  let imageID = [template.id, element.id].join()
  const imageBytes = getImageBytesFromImagesForExportById(imageID)
  rectangle.fills = getNewFills(rectangle, imageBytes)

  return rectangle
}

function renderFigmaFrame(imagesForExport) {
  const charityData = getCharityData()
  const template = getCurrentTemplate()

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
        ;(async () => {
          const text = figma.createText()

          console.log('font', charityData.identityFonts)

          text.x = element.x * template.width
          text.y = element.y * template.height

          await figma.loadFontAsync({
            // family: charityData.identityFonts,
            family: 'Inter',
            style: 'Regular'
          })
          text.fontName = {
            // family: charityData.identityFonts,
            family: 'Inter',
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
          text.lineHeight = {
            value: element.lineHeight.slice(0, -1) * 1,
            unit: 'PERCENT'
          }
          if (element.width !== 'auto') {
            text.resize(
              element.width * template.width,
              element.height * template.width
            )
            text.textAutoResize = 'HEIGHT'
          }
          frame.appendChild(text)
        })()
        break

      case 'img':
        const imageNode = figma.createRectangle()

        imageNode.x = element.x * template.width
        imageNode.y = element.y * template.height
        imageNode.resize(
          element.width * template.width,
          element.height * template.width
        )

        renderImage(element, imageNode)

        let cornerRadius = 0
        switch (element.borderRadius) {
          case '3cqw':
            cornerRadius = 32
            break

          default:
            break
        }
        imageNode.cornerRadius = cornerRadius
        frame.appendChild(imageNode)

        break

      case 'pattern':
        const patternID = template.id + element.id
        const patternToRender = getPatternRenders(patternID)
        const patternFrame = figma.createFrame()

        let gridModuleSize

        if (template.width > template.height) {
          gridModuleSize =
            template.width / charityData.identityPatternParams.gridModule
        } else {
          gridModuleSize =
            template.height / charityData.identityPatternParams.gridModule
        }

        patternFrame.x = element.x * template.width
        patternFrame.y = element.y * template.height
        patternFrame.resize(
          element.width * template.width,
          element.height * template.width
        )

        patternFrame.fills = [
          {
            type: 'SOLID',
            color: {
              r: charityData.identityColors[element.background].r,
              g: charityData.identityColors[element.background].g,
              b: charityData.identityColors[element.background].b
            }
          }
        ]

        patternToRender.map(circle => {
          const circleNode = figma.createEllipse()

          circleNode.x = gridModuleSize * (circle.column + circle.transformX)
          circleNode.y = gridModuleSize * (circle.row + circle.transformY)

          circleNode.resize(
            gridModuleSize * circle.size,
            gridModuleSize * circle.size
          )

          circleNode.fills = [
            {
              type: 'SOLID',
              color: {
                r: circle.color.r,
                g: circle.color.g,
                b: circle.color.b
              }
            }
          ]

          patternFrame.appendChild(circleNode)
        })

        frame.appendChild(patternFrame)
        break
      default:
        break
    }
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

export { createDesignFrame, renderFigmaFrame }
