import { saveImageDataOrExportToFigma } from './images'
import { renderFigmaFrame } from './render'
import { helloWorld } from './design'
import {
  setStoreImagesForExport,
  setCharityData,
  setCurrentTemplate
} from './store'

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
  } else if (msg.type === 'create-frame') {
    let newCurrentImages = []

    Object.keys(msg.template.elements).forEach(element => {
      if (msg.template.elements[element].type === 'img') {
        console.log('imageID', [msg.template.id, element].join())
        newCurrentImages.push({
          id: [msg.template.id, element].join(),
          image: msg.template.elements[element].cover,
          loaded: false
        })
      }
    })

    setCharityData(msg.charityData)
    setCurrentTemplate(msg.template)
    setStoreImagesForExport(newCurrentImages)

    newCurrentImages.forEach(image => {
      figma.ui.postMessage({ type: 'image', id: image.id, image: image.image })
    })
    // renderFigmaFrame(msg.template, msg.charityData)
  } else {
    console.log('unknown message')
  }
}
