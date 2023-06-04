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
              figma.ui.postMessage({
                type: 'upload-image',
                bytes: u8bytes,
                activeElement: msg.activeElement
              })
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
    const bytes = msg.bytes
    figma.ui.postMessage({
      type: 'replace-image',
      bytes: msg.bytes,
      activeElement: msg.activeElement
    })
  } else if (msg.type === 'create-styles') {
    //Color style
    Object.keys(msg.charityData.identityColors).forEach(color => {
      const style = figma.createPaintStyle()
      let name
      switch (color) {
        case 'primary':
          name = 'Основной цвет'
          break

        case 'text':
          name = 'Текст'
          break

        case 'background':
          name = 'Фон'
          break

        case 'adOne':
          name = 'Дополнительный 1'
          break

        case 'adTwo':
          name = 'Дополнительный 2'
          break

        default:
          break
      }
      style.name = 'Брендбук/' + name
      style.paints = [
        {
          type: 'SOLID',
          color: {
            r:
              msg.charityData.identityColors[color].r > 1
                ? 1
                : Math.abs(msg.charityData.identityColors[color].r),
            g:
              msg.charityData.identityColors[color].g > 1
                ? 1
                : Math.abs(msg.charityData.identityColors[color].g),
            b:
              msg.charityData.identityColors[color].b > 1
                ? 1
                : Math.abs(msg.charityData.identityColors[color].b)
          }
        }
      ]
    })

    //Text style
    let bodyFontName = { family: 'Inter', style: 'Regular' }
    let headerFontName
    let lineHeight = {
      value: 80,
      unit: 'PERCENT'
    }
    switch (msg.charityData.identityFonts) {
      case 'Arial':
        headerFontName = { family: 'Arial', style: 'Regular' }
        bodyFontName = headerFontName
        break

      case 'Arial Narrow':
        headerFontName = { family: 'Arial Narrow', style: 'Regular' }
        bodyFontName = { family: 'Arial', style: 'Regular' }
        break

      case 'Alegreya':
        headerFontName = { family: 'Alegreya', style: 'Regular' }
        break

      case 'Felidae':
        headerFontName = { family: 'Felidae', style: 'Regular' }
        break

      case 'Forum':
        headerFontName = { family: 'Forum', style: 'Regular' }
        break

      case 'Kharkiv Tone':
        headerFontName = { family: 'Kharkiv Tone', style: 'Regular' }
        break

      case 'Le Murmure':
        headerFontName = { family: 'Le Murmure', style: 'Regular' }
        lineHeight = {
          value: 90,
          unit: 'PERCENT'
        }
        break

      case 'Lora':
        headerFontName = { family: 'Lora', style: 'Regular' }
        bodyFontName = headerFontName
        break

      case 'Manrope':
        headerFontName = { family: 'Manrope', style: 'Regular' }
        bodyFontName = headerFontName
        break

      case 'Miedinger*':
        headerFontName = { family: 'Miedinger*', style: 'Regular' }
        bodyFontName = headerFontName
        lineHeight = {
          value: 90,
          unit: 'PERCENT'
        }
        break

      case 'Soyuz Grotesk':
        headerFontName = { family: 'Soyuz Grotesk', style: 'Bold' }
        break

      case 'St.Sign':
        headerFontName = { family: 'St.Sign', style: 'Normal' }
        bodyFontName = headerFontName
        break

      case 'St.Sign Cond':
        headerFontName = { family: 'St.Sign', style: 'Condensed' }
        bodyFontName = { family: 'St.Sign', style: 'Normal' }
        break

      case 'Old Standard TT':
        headerFontName = { family: 'Old Standard TT', style: 'Regular' }
        break

      case 'Neutral Face':
        headerFontName = { family: 'Neutral Face', style: 'Regular' }
        lineHeight = {
          value: 90,
          unit: 'PERCENT'
        }
        break

      case 'Playfair Display':
        headerFontName = { family: 'Playfair Display', style: 'Regular' }
        break

      case 'Plup':
        headerFontName = { family: 'Plup', style: 'Regular' }
        break

      case 'Ramona':
        headerFontName = { family: 'Ramona', style: 'Regular' }
        break

      case 'Truin':
        headerFontName = { family: 'Truin', style: 'Regular' }
        break

      case 'Unlimited Pie':
        headerFontName = { family: 'Unlimited Pie', style: 'Regular' }
        break

      default:
        break
    }
    const bodyStyle = figma.createTextStyle()
    bodyStyle.name = 'Брендбук/Основной текст'
    await figma.loadFontAsync({
      family: bodyFontName.family,
      style: bodyFontName.style
    })
    bodyStyle.fontName = {
      family: bodyFontName.family,
      style: bodyFontName.style
    }
    bodyStyle.fontSize = 16

    const headerStyle = figma.createTextStyle()
    headerStyle.name = 'Брендбук/Заголовки'
    await figma.loadFontAsync({
      family: headerFontName.family,
      style: headerFontName.style
    })
    headerStyle.fontName = {
      family: headerFontName.family,
      style: headerFontName.style
    }
    headerStyle.fontSize = 32
    headerStyle.lineHeight = lineHeight

    //Logo
    const logoComponent = figma.createComponent()
    logoComponent.resize(500, 500)
    logoComponent.name = 'Логотип'
    const logoType = figma.createText()

    logoType.fontName = {
      family: headerFontName.family,
      style: headerFontName.style
    }
    logoType.lineHeight = lineHeight
    logoType.characters = msg.charityData.charityTitle.replace(' ', '\n')
    const flattenLogo = figma.flatten([logoType], logoComponent)

    let s = Math.min(
      500 / (flattenLogo.width + flattenLogo.height),
      (500 / flattenLogo.height) * 2
    )
    let new_width = s * flattenLogo.width
    let new_height = s * flattenLogo.height
    flattenLogo.resize(new_width, new_height)

    flattenLogo.x = (500 - new_width) / 2
    flattenLogo.y = (500 - new_height) / 2

    logoComponent.appendChild(flattenLogo)
  } else {
    console.log('unknown message')
  }
}
