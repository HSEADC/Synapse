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

function renderFigmaTemplate(imagesForExport) {
  // const mainFrame = createDesign(frame)
  // figma.viewport.scrollAndZoomIntoView(mainFrame)
}

export { renderFigmaTemplate }
