import { saveImageDataOrExportToFigma, getSelectedImageBytes } from './images'
import { renderFigmaFrame } from './render'
import { helloWorld } from './design'
import {
  setStoreImagesForExport,
  setCharityData,
  setCurrentTemplate,
  setAllPatternRenders
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
    let noImageCheck = true

    Object.values(msg.template.elements).forEach(element => {
      if (element.type === 'img') {
        noImageCheck = false
      }
    })

    if (noImageCheck) {
      setCharityData(msg.charityData)
      setCurrentTemplate(msg.template)
      setAllPatternRenders(msg.patternRenders)
      renderFigmaFrame(msg.template, msg.charityData)
    } else {
      let newCurrentImages = []

      Object.keys(msg.template.elements).forEach(element => {
        if (msg.template.elements[element].type === 'img') {
          newCurrentImages.push({
            id: [msg.template.id, element].join(),
            image: msg.template.elements[element].cover,
            loaded: false
          })
        }
      })

      setCharityData(msg.charityData)
      setCurrentTemplate(msg.template)
      setAllPatternRenders(msg.patternRenders)
      setStoreImagesForExport(newCurrentImages)

      newCurrentImages.forEach(image => {
        figma.ui.postMessage({
          type: 'image',
          id: image.id,
          image: image.image
        })
      })
    }
  } else if (msg.type === 'upload-image') {
    figma.on('selectionchange', () => {
      if (figma.currentPage.selection[0]) {
        switch (figma.currentPage.selection[0].fills[0].type) {
          case 'IMAGE':
            async function getSelectionBytes() {
              const u8bytes = await getSelectedImageBytes(
                figma.currentPage.selection[0].fills[0]
              )
              console.log('controller u8bytes', u8bytes)
              figma.ui.postMessage({ type: 'upload-image', bytes: u8bytes })
            }
            getSelectionBytes()
            break

          default:
            break
        }
      } else {
        figma.notify('Выберите слой с изображением')
      }
    })
  } else if (msg.type === 'image-in-base64') {
  } else {
    console.log('unknown message')
  }
}
