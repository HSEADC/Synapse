import { getStoreImagesForExport } from './store'
import { renderFigmaFrame } from './render'

function saveImageDataOrExportToFigma(id, bytes) {
  let imagesForExport = getStoreImagesForExport()
  let status = []

  imagesForExport.map(image => {
    if (image.id === id) {
      image.image = bytes
      image.loaded = true
    }

    return image
  })

  imagesForExport.forEach((image, i) => {
    status.push(image.loaded)
  })

  if (!status.includes(false)) {
    renderFigmaFrame(imagesForExport)
  }
}

function getNewFills(rectangle, imageBytes) {
  const fills = []

  for (const paint of rectangle.fills) {
    fills.push(getNewPaint(paint, imageBytes))
  }

  return fills
}

function getNewPaint(paint, imageBytes) {
  const newPaint = {}

  newPaint.blendMode = 'NORMAL'
  newPaint.type = 'IMAGE'

  newPaint.imageHash = figma.createImage(imageBytes).hash

  newPaint.filters = {
    contrast: 0,
    exposure: 0,
    highlights: 0,
    saturation: 0,
    shadows: 0,
    temperature: 0,
    tint: 0
  }

  newPaint.opacity = 1
  newPaint.scaleMode = 'FILL'
  newPaint.scalingFactor = 0.5

  newPaint.imageTransform = [
    [1, 0, 0],
    [0, 1, 0]
  ]

  newPaint.visible = true

  return newPaint
}

export { saveImageDataOrExportToFigma, getNewFills }
