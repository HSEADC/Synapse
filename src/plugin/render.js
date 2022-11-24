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
  console.log('frame created')
  return frame
}

export { renderFigmaTemplate, createDesignFrame }
