import { saveImageDataOrExportToFigma } from './images'
import { createDesignFrame } from './render'
import { helloWorld } from './design'

figma.showUI(__html__)
figma.ui.resize(400, 680)

figma.ui.onmessage = async msg => {
  if (msg.type === 'image-in-bytes') {
    saveImageDataOrExportToFigma(msg.id, msg.bytes)
  } else if (msg.type === 'set-storage') {
    figma.clientStorage.setAsync('charityData', {
      charityTitle: msg.charityTitle,
      charityCategory: msg.charityCategory,
      friendliness: msg.friendliness,
      volume: msg.volume,
      rationality: msg.rationality,
      identityColors: msg.identityColors,
      identityFonts: msg.identityFonts,
      identityPatternParams: msg.identityPatternParams,
      identityColorsProgress: msg.identityColorsProgress,
      identityFontsProgress: msg.identityFontsProgress,
      identityPatternParamsProgress: msg.identityPatternParamsProgress
    })
  } else if (msg.type === 'get-storage') {
    const charityData = await figma.clientStorage.getAsync('charityData')
    figma.ui.postMessage({ type: 'get-storage', charityData: charityData })
    // console.log('from controller', charityData)
  } else if (msg.type === 'create-frame') {
    helloWorld(msg.template, msg.charityData)
    // console.log('createeee');
  } else {
    console.log('unknown message')
  }
}
