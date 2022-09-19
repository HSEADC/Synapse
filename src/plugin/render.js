import { getNewFills } from './images'
import { getStoreLanguage } from './store'

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

function renderMainFrame(background) {
  //фрейм самого экспорта
  let frame = figma.createFrame()
  frame.x = figma.viewport.center.x
  frame.y = figma.viewport.center.y
  frame.paddingTop = 23
  frame.itemSpacing = 23
  frame.resize(768, 1659)
  frame.layoutMode = 'VERTICAL'
  frame.primaryAxisSizingMode = 'AUTO'
  frame.counterAxisSizingMode = 'FIXED'
  frame.counterAxisAlignItems = 'CENTER'
  frame.fills = background

  return frame
}

function renderFigmaTemplate(imagesForExport) {
  const background = [
    { type: 'SOLID', color: { r: 0.965, g: 0.956, b: 0.952 } }
  ]

  const mainFrame = renderMainFrame(background)

  figma.currentPage.selection = mainFrame
  figma.viewport.scrollAndZoomIntoView(mainFrame)
}

export { renderFigmaTemplate }
