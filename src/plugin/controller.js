import { saveImageDataOrExportToFigma } from './images'

figma.showUI(__html__)
figma.ui.resize(400, 680)

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
  } else if (msg.type === 'create-frame') {
    const frame = figma.createFrame()
    frame.x = 50
    frame.y = 50
    frame.resize(1080, 1080)
    frame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } }]

    async function helloWorld() {
      const text = figma.createText()

      // Move to (50, 50)
      text.x = 10
      text.y = -20

      // Load the font in the text node before setting the characters
      await figma.loadFontAsync(text.fontName)
      text.characters = 'Hello world!'

      // Set bigger font size and red color
      text.fontSize = 220
      text.letterSpacing = {
        value: -7,
        unit: 'PERCENT'
      }
      text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]

      frame.appendChild(text)
    }

    helloWorld()

    figma.viewport.scrollAndZoomIntoView([frame])
    console.log('frame created')
  } else {
    console.log('unknown message')
  }
}
