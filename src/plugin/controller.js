import { saveImageDataOrExportToFigma, getSelectedImageBytes } from './images'
import { renderFigmaFrame } from './render'
import { helloWorld } from './design'
import {
  setStoreImagesForExport,
  setCharityData,
  setCurrentTemplate,
  setAllPatternRenders
} from './store'
import { convertRGBtoHEX } from './color'

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
    let styleIDs = {}
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
      styleIDs = {
        ...styleIDs,
        [color]: style.id
      }
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

    //Create brandbook
    const brandbook = figma.createFrame()
    brandbook.resize(1000, 2169)
    brandbook.name = ' Брендбук'

    const coverRect = figma.createRectangle()
    brandbook.appendChild(coverRect)
    coverRect.resize(1000, 250)
    coverRect.fillStyleId = styleIDs.primary

    const textStyles = {
      header: {
        fontSize: 56,
        lineHeight: {
          value: 60,
          unit: 'PIXELS'
        },
        fontName: {
          family: 'Inter',
          style: 'Medium'
        },
        textCase: 'UPPER',
        letterSpacing: {
          value: -5,
          unit: 'PERCENT'
        },
        fills: [{ type: 'SOLID', color: { r: 0.074, g: 0.113, b: 0.152 } }]
      },
      semiHeader: {
        fontSize: 24,
        lineHeight: {
          value: 80,
          unit: 'PERCENT'
        },
        fontName: {
          family: 'Inter',
          style: 'Medium'
        },
        textCase: 'UPPER',
        letterSpacing: {
          value: -3,
          unit: 'PERCENT'
        },
        fills: [{ type: 'SOLID', color: { r: 0.074, g: 0.113, b: 0.152 } }]
      },
      body: {
        fontSize: 24,
        lineHeight: {
          value: 100,
          unit: 'PERCENT'
        },
        fontName: {
          family: 'Inter',
          style: 'Medium'
        },
        textCase: 'ORIGINAL',
        letterSpacing: {
          value: -3,
          unit: 'PERCENT'
        },
        fills: [{ type: 'SOLID', color: { r: 0.074, g: 0.113, b: 0.152 } }]
      }
    }

    //Title
    const charityName = figma.createText()
    brandbook.appendChild(charityName)
    charityName.fontSize = textStyles.header.fontSize
    charityName.lineHeight = textStyles.header.lineHeight
    await figma.loadFontAsync({
      family: 'Inter',
      style: 'Medium'
    })
    charityName.fontName = textStyles.header.fontName
    charityName.textCase = textStyles.header.textCase
    charityName.fills = textStyles.header.fills
    charityName.letterSpacing = textStyles.header.letterSpacing
    charityName.characters = msg.charityData.charityTitle.replace(' ', '\n')
    charityName.x = 25
    charityName.y = 25

    const brandbookTitle = figma.createText()
    brandbook.appendChild(brandbookTitle)
    brandbookTitle.fontSize = textStyles.header.fontSize
    brandbookTitle.lineHeight = textStyles.header.lineHeight
    brandbookTitle.fontName = textStyles.header.fontName
    brandbookTitle.textCase = textStyles.header.textCase
    brandbookTitle.letterSpacing = textStyles.header.letterSpacing
    brandbookTitle.fills = textStyles.header.fills
    brandbookTitle.characters = 'БРЕНДБУК'
    brandbookTitle.x = 500
    brandbookTitle.y = 25

    //Palette
    const paletteSemiHeader = figma.createText()
    brandbook.appendChild(paletteSemiHeader)
    paletteSemiHeader.fontSize = textStyles.semiHeader.fontSize
    paletteSemiHeader.lineHeight = textStyles.semiHeader.lineHeight
    paletteSemiHeader.fontName = textStyles.semiHeader.fontName
    paletteSemiHeader.textCase = textStyles.semiHeader.textCase
    paletteSemiHeader.letterSpacing = textStyles.semiHeader.letterSpacing
    paletteSemiHeader.fills = textStyles.semiHeader.fills
    paletteSemiHeader.characters = 'Палитра'
    paletteSemiHeader.x = 25
    paletteSemiHeader.y = 400

    for (let i = 0; i < 5; i++) {
      const paletteNode = figma.createRectangle()
      brandbook.appendChild(paletteNode)
      paletteNode.resize(200, 300)
      paletteNode.x = i * 200
      paletteNode.y = 444
      let colorToDisplay
      let colorName
      switch (i) {
        case 0:
          colorToDisplay = 'primary'
          colorName = 'Основной\nцвет'
          break

        case 1:
          colorToDisplay = 'background'
          colorName = 'Фон'
          break

        case 2:
          colorToDisplay = 'text'
          colorName = 'Текст'
          break

        case 3:
          colorToDisplay = 'adOne'
          colorName = 'Добавочный\n№1'
          break

        case 4:
          colorToDisplay = 'adTwo'
          colorName = 'Добавочный\n№2'
          break
        default:
          break
      }

      const colorValue = msg.charityData.identityColors[colorToDisplay]

      paletteNode.fillStyleId = styleIDs[colorToDisplay]

      const colorCaption = figma.createText()
      brandbook.appendChild(colorCaption)
      colorCaption.fontSize = textStyles.body.fontSize
      colorCaption.lineHeight = textStyles.body.lineHeight
      colorCaption.fontName = textStyles.body.fontName
      colorCaption.textCase = textStyles.body.textCase
      colorCaption.letterSpacing = textStyles.body.letterSpacing
      colorCaption.fills = textStyles.body.fills
      colorCaption.characters = colorName
      colorCaption.x = i * 200 + 25
      colorCaption.y = 594

      const colorHEX = figma.createText()
      brandbook.appendChild(colorHEX)
      colorHEX.fontSize = textStyles.body.fontSize
      colorHEX.lineHeight = textStyles.body.lineHeight
      colorHEX.fontName = textStyles.body.fontName
      colorHEX.textCase = textStyles.body.textCase
      colorHEX.letterSpacing = textStyles.body.letterSpacing
      colorHEX.fills = textStyles.body.fills
      colorHEX.characters = convertRGBtoHEX(
        colorValue.r,
        colorValue.g,
        colorValue.b
      )
      colorHEX.x = i * 200 + 25
      colorHEX.y = 700

      if (colorToDisplay === 'text') {
        colorCaption.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
        colorHEX.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
      }
    }

    //Fonts
    const fontsSemiHeader = figma.createText()
    brandbook.appendChild(fontsSemiHeader)
    fontsSemiHeader.fontSize = textStyles.semiHeader.fontSize
    fontsSemiHeader.lineHeight = textStyles.semiHeader.lineHeight
    fontsSemiHeader.fontName = textStyles.semiHeader.fontName
    fontsSemiHeader.textCase = textStyles.semiHeader.textCase
    fontsSemiHeader.letterSpacing = textStyles.semiHeader.letterSpacing
    fontsSemiHeader.fills = textStyles.semiHeader.fills
    fontsSemiHeader.characters = 'Шрифты'
    fontsSemiHeader.x = 25
    fontsSemiHeader.y = 894

    const fontPreviewHeader = figma.createText()
    brandbook.appendChild(fontPreviewHeader)
    fontPreviewHeader.fontSize = textStyles.body.fontSize
    fontPreviewHeader.lineHeight = textStyles.body.lineHeight
    fontPreviewHeader.fontName = textStyles.body.fontName
    fontPreviewHeader.textCase = textStyles.body.textCase
    fontPreviewHeader.letterSpacing = textStyles.body.letterSpacing
    fontPreviewHeader.fills = textStyles.body.fills
    fontPreviewHeader.characters = 'Заголовки'
    fontPreviewHeader.x = 263
    fontPreviewHeader.y = 963

    const lineOne = figma.createLine()
    brandbook.appendChild(lineOne)
    lineOne.resize(712, 0)
    lineOne.x = 263
    lineOne.y = 1007
    lineOne.strokeWeight = 2
    lineOne.strokes = [
      { type: 'SOLID', color: { r: 0.074, g: 0.113, b: 0.152 } }
    ]

    const fontHeader = figma.createText()
    brandbook.appendChild(fontHeader)
    fontHeader.fontSize = 80
    fontHeader.lineHeight = textStyles.header.lineHeight
    await figma.loadFontAsync({
      family: headerFontName.family,
      style: headerFontName.style
    })
    fontHeader.fontName = {
      family: headerFontName.family,
      style: headerFontName.style
    }
    fontHeader.textCase = textStyles.body.textCase
    fontHeader.letterSpacing = textStyles.body.letterSpacing
    fontHeader.fills = textStyles.body.fills
    fontHeader.characters = headerFontName.family
    fontHeader.x = 263
    fontHeader.y = 1027

    const fontPreviewBody = figma.createText()
    brandbook.appendChild(fontPreviewBody)
    fontPreviewBody.fontSize = textStyles.body.fontSize
    fontPreviewBody.lineHeight = textStyles.body.lineHeight
    fontPreviewBody.fontName = textStyles.body.fontName
    fontPreviewBody.textCase = textStyles.body.textCase
    fontPreviewBody.letterSpacing = textStyles.body.letterSpacing
    fontPreviewBody.fills = textStyles.body.fills
    fontPreviewBody.characters = 'Основной текст'
    fontPreviewBody.x = 263
    fontPreviewBody.y = 1141

    const lineTwo = figma.createLine()
    brandbook.appendChild(lineTwo)
    lineTwo.resize(712, 0)
    lineTwo.x = 263
    lineTwo.y = 1185
    lineTwo.strokeWeight = 2
    lineTwo.strokes = [
      { type: 'SOLID', color: { r: 0.074, g: 0.113, b: 0.152 } }
    ]

    const fontBody = figma.createText()
    brandbook.appendChild(fontBody)
    fontBody.fontSize = 80
    fontBody.lineHeight = textStyles.header.lineHeight
    await figma.loadFontAsync({
      family: bodyFontName.family,
      style: bodyFontName.style
    })
    fontBody.fontName = {
      family: bodyFontName.family,
      style: bodyFontName.style
    }
    fontBody.textCase = textStyles.body.textCase
    fontBody.letterSpacing = textStyles.body.letterSpacing
    fontBody.fills = textStyles.body.fills
    fontBody.characters = bodyFontName.family
    fontBody.x = 263
    fontBody.y = 1205

    //Logo
    const logoBackground = figma.createRectangle()
    brandbook.appendChild(logoBackground)
    logoBackground.resize(1000, 750)
    logoBackground.x = 0
    logoBackground.y = 1419
    logoBackground.fillStyleId = styleIDs.primary

    const logoSemiHeader = figma.createText()
    brandbook.appendChild(logoSemiHeader)
    logoSemiHeader.fontSize = textStyles.semiHeader.fontSize
    logoSemiHeader.lineHeight = textStyles.semiHeader.lineHeight
    logoSemiHeader.fontName = textStyles.semiHeader.fontName
    logoSemiHeader.textCase = textStyles.semiHeader.textCase
    logoSemiHeader.letterSpacing = textStyles.semiHeader.letterSpacing
    logoSemiHeader.fills = textStyles.semiHeader.fills
    logoSemiHeader.characters = 'Логотип'
    logoSemiHeader.x = 25
    logoSemiHeader.y = 1444

    const logoComponent = figma.createComponent()
    brandbook.appendChild(logoComponent)
    logoComponent.resize(500, 500)
    logoComponent.x = 269
    logoComponent.y = 1544
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
    flattenLogo.fillStyleId = styleIDs.text
    flattenLogo.resize(new_width, new_height)
    logoComponent.appendChild(flattenLogo)
    flattenLogo.x = (500 - new_width) / 2
    flattenLogo.y = (500 - new_height) / 2

    const logoArea = figma.createText()
    brandbook.appendChild(logoArea)
    logoArea.fontSize = textStyles.body.fontSize
    logoArea.lineHeight = textStyles.body.lineHeight
    logoArea.fontName = textStyles.body.fontName
    logoArea.textCase = textStyles.body.textCase
    logoArea.letterSpacing = textStyles.body.letterSpacing
    logoArea.fills = textStyles.body.fills
    logoArea.characters = 'Охранное поле равно половине высоты'
    logoArea.x = 25
    logoArea.y = 2125
  } else {
    console.log('unknown message')
  }
}
