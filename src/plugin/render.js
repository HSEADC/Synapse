import { getNewFills } from './images'
import { getStoreLanguage } from './store'
import { generateRandom, convertHSLtoRGB } from './utilities'
import { createBaseColor } from './color'
import placeholder1 from '../app/assets/images/placeholders/1.jpg'

async function getImageBytes(image) {
  const bytes = await image.getBytesAsync()
  console.log('bytes', bytes)
  return bytes
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
          text.lineHeight = {
            value: 100,
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
        // placeholder1.getBytesAsync().then(bytes => {
        //   const image = figma.createImage(bytes)
        //   console.log('bytes', bytes);

        //   const imageNode = figma.createRectangle()

        //   imageNode.x = element.x * template.width
        //   imageNode.y = element.y * template.height
        //   imageNode.resize(element.width * template.width, element.height * template.width)

        //   let cornerRadius
        //   switch (element.borderRadius) {
        //     case '5%/10%':
        //       cornerRadius = 32
        //       break;

        //     default:
        //       break;
        //   }
        //   imageNode.cornerRadius = cornerRadius
        //   imageNode.fills = [{
        //       imageHash: image.hash,
        //       scaleMode: "FILL",
        //       scalingFactor: 1,
        //       type: "IMAGE",
        //     }];
        //     frame.appendChild(imageNode);
        //   });

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
