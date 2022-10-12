import { saveImageDataOrExportToFigma } from './images'

figma.showUI(__html__)
figma.ui.resize(668, 628)

figma.ui.onmessage = msg => {
  console.log('FIGMA JUST GOT A MESSAGE, YO', msg)

  if (msg.type === 'image-in-bytes') {
    saveImageDataOrExportToFigma(msg.id, msg.bytes)
  } else if (msg.type === 'font-pair-export') {
    // console.log(msg.pair)
    let currentPair = {}
    let newCurrentImages = []

    msg.recommendedPairs.forEach(recomendation => {
      newCurrentImages.push({
        id: recomendation.id,
        image: recomendation.cover,
        loaded: false
      })
    })

    setStoreImagesForExport(newCurrentImages)

    newCurrentImages.forEach(image => {
      figma.ui.postMessage({ id: image.id, image: image.image })
    })
  } else if (msg.type === 'set-storage') {
    figma.clientStorage.setAsync('test', { something: msg.id })
  } else if (msg.type === 'get-storage') {
    figma.clientStorage.getAsync('test').then(test => {
      console.log('from controller', test)
      figma.ui.postMessage({ type: 'get-storage', data: test })
    })
  } else {
    console.log('unknown message')
  }
}

function createDesign() {
  // const frame = figma.createFrame()
  // frame.x = 50
  // frame.y = 50
  //
  // frame.resize(1080, 1080)
  //
  // figma.viewport.scrollAndZoomIntoView([frame])
  document
    .getElementByID('create-design')
    .postMessage({ pluginMessage: 'create-frame' })
}

// export { createDesign }
