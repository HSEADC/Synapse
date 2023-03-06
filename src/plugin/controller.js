import { saveImageDataOrExportToFigma } from './images'
import { createDesignFrame } from './render'
import { helloWorld } from './design'

figma.showUI(__html__)
figma.ui.resize(400, 680)

figma.ui.onmessage = msg => {
  if (msg.type === 'image-in-bytes') {
    saveImageDataOrExportToFigma(msg.id, msg.bytes)
  } else if (msg.type === 'set-storage') {
    figma.clientStorage.setAsync('identity', {
      charityTitle: msg.charityTitle,
      charityCategory: msg.charityCategory,
      friendliness: msg.friendliness,
      volume: msg.volume,
      rationality: msg.rationality,
      identityColors: msg.identityColors,
      identityFonts: msg.identityFonts,
      identityPatternParams: msg.identityPatternParams
    })
  } else if (msg.type === 'get-storage') {
    figma.clientStorage.getAsync('test').then(test => {
      console.log('from controller', test)
      figma.ui.postMessage({ type: 'get-storage', data: test })
    })
  } else if (msg.type === 'create-frame') {
    helloWorld(msg.template, msg.charityData)
    // console.log('createeee');
  } else {
    console.log('unknown message')
  }
}
