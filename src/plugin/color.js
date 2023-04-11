import { generateRandom, mode } from './utilities'

function convertHSLtoRGB(h, s, l) {
  s /= 100
  l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

  const colorRGB = {
    r: String(f(0)).slice(0, 4) * 1,
    g: String(f(8)).slice(0, 4) * 1,
    b: String(f(4)).slice(0, 4) * 1
  }

  return colorRGB
}

function createBaseColor(charityData) {
  let friendlinessFactorS = 1.3
  let friendlinessFactorL = 1

  let volumeFactorS = 1.4
  let volumeFactorL = 0.95

  let rationalityFactorH = 1
  let rationalityFactorS = 1.3
  let rationalityFactorL = 1

  if (charityData.friendliness == 'Серьезный') {
    friendlinessFactorS = 0.85
    friendlinessFactorL = 0.9
  }

  if (charityData.volume == 'Тихий') {
    volumeFactorS = 0.85
    volumeFactorL = Math.random() < 0.5 ? 0.7 : 1.15
  }

  if (charityData.rationality == 'Рациональный') {
    rationalityFactorL = 0.9
    rationalityFactorH = 0.666
  } else {
    rationalityFactorL = Math.random() < 0.5 ? 0.75 : 1
  }

  const baseColorHSL = {
    h: generateRandom(1, 360) * rationalityFactorH,
    s:
      generateRandom(30, 100) *
      friendlinessFactorS *
      rationalityFactorS *
      volumeFactorS,
    l:
      generateRandom(70, 90) *
      friendlinessFactorL *
      rationalityFactorL *
      volumeFactorL
  }

  return baseColorHSL
}

function adjustHue(val) {
  if (val < 0) val += Math.ceil(-val / 360) * 360

  return val % 360
}

function createScientificPalette(primaryColor, charityData) {
  let paletteType = []
  let contrast = []

  switch (charityData.friendliness) {
    case 'Серьезный':
      paletteType.push('analogous')
      contrast.push('saturation')
      break
    case 'Дружелюбный':
      paletteType.push('tetradic')
      contrast.push('hue')
      break
  }

  switch (charityData.volume) {
    case 'Тихий':
      paletteType.push('analogous')
      contrast.push('luminocity')
      break
    case 'Громкий':
      paletteType.push('tetradic')
      contrast.push('hue')
      break
  }

  switch (charityData.rationality) {
    case 'Рациональный':
      paletteType.push('complementary')
      contrast.push('saturation')
      break
    case 'Эмоциональный':
      paletteType.push('splitComplementary')
      contrast.push('luminocity')
      break
  }

  paletteType = mode(paletteType)
  contrast = mode(contrast)

  const targetHueSteps = {
    analogous: [0, 0, 0, 0],
    tetradic: [0, 90, 180, 270],
    complementary: [0, 90, 180, 270],
    splitComplementary: [0, 90, 150, 210]
  }

  const palette = {
    primary: primaryColor,
    text: {},
    adOne: {},
    adTwo: {},
    background: {}
  }

  let i = 0

  for (const key in palette) {
    switch (contrast) {
      case 'luminocity':
        switch (key) {
          case 'primary':
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            break

          case 'background':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: primaryColor.s,
              l: generateRandom(83, 95) + primaryColor.l * 0.2
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break

          case 'adOne':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: primaryColor.s,
              l:
                primaryColor.l + generateRandom(15, 25) > 95
                  ? 95
                  : primaryColor.l + generateRandom(15, 25)
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break

          case 'adTwo':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: primaryColor.s,
              l:
                primaryColor.l - generateRandom(15, 25) < 20
                  ? 20
                  : primaryColor.l - generateRandom(15, 25)
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break

          case 'text':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: generateRandom(1, 90),
              l: generateRandom(1, 10)
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break
        }
        break
      //saturation//////////////////////////////////////////////////////////////////
      case 'hue':
        switch (key) {
          case 'primary':
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            break

          case 'background':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: primaryColor.s,
              l: generateRandom(85, 90) + primaryColor.l * 0.2
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break

          case 'adOne':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: primaryColor.s - generateRandom(5, 10),
              l: primaryColor.l + generateRandom(5, 15)
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break

          case 'adTwo':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: primaryColor.s,
              l: primaryColor.l
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s - generateRandom(5, 10),
              palette[key].l - generateRandom(5, 15)
            )
            i++
            break

          case 'text':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: generateRandom(1, 70),
              l: generateRandom(1, 12)
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break
        }
        break
      //hue/////////////////////////////////////////////////////////////////////////////////////
      case 'saturation':
        switch (key) {
          case 'primary':
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            break

          case 'background':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: primaryColor.s,
              l: generateRandom(85, 90) + primaryColor.l * 0.2
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break

          case 'adOne':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: primaryColor.s - generateRandom(45, 85),
              l: primaryColor.l + generateRandom(10, 20)
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break

          case 'adTwo':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: primaryColor.s - generateRandom(25, 50),
              l: primaryColor.l - generateRandom(15, 25)
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break

          case 'text':
            palette[key] = {
              h: adjustHue(primaryColor.h + targetHueSteps[paletteType][i]),
              s: generateRandom(1, 70),
              l: generateRandom(1, 10)
            }
            palette[key] = convertHSLtoRGB(
              palette[key].h,
              palette[key].s,
              palette[key].l
            )
            i++
            break
        }
        break
    }
  }

  return palette
}

export { createBaseColor, convertHSLtoRGB, createScientificPalette }
