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
  let friendlinessFactorS = 1
  let friendlinessFactorL = 1

  let volumeFactorS = 1
  let volumeFactorL = 1

  let rationalityFactorH = 1
  let rationalityFactorS = 1
  let rationalityFactorL = 1

  if (charityData.friendliness == 'Серьезный') {
    friendlinessFactorS = 0.85
    friendlinessFactorL = 0.85
  }

  if (charityData.volume == 'Тихий') {
    volumeFactorS = 0.85
    volumeFactorL = 0.85
  }

  if (charityData.rationality == 'Рациональный') {
    rationalityFactorL = 0.9
    rationalityFactorH = 0.666
  }

  const baseColorHSL = {
    h: Math.floor(Math.random() * 360 * rationalityFactorH),
    s:
      generateRandom(20, 100) *
      friendlinessFactorS *
      rationalityFactorS *
      volumeFactorS,
    l:
      generateRandom(50, 90) *
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
      contrast.push('saturation')
      break
  }

  switch (charityData.volume) {
    case 'Тихий':
      paletteType.push('analogous')
      contrast.push('saturation')
      break
    case 'Громкий':
      paletteType.push('tetradic')
      contrast.push('luminosity')
      break
  }

  switch (charityData.rationality) {
    case 'Рациональный':
      paletteType.push('complementary')
      contrast.push('saturation')
      break
    case 'Эмоциональный':
      paletteType.push('splitComplementary')
      contrast.push('luminosity')
      break
  }

  paletteType = mode(paletteType)
  // console.log(paletteType)

  const targetHueSteps = {
    analogous: [0, 20, 40, 60],
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
    switch (key) {
      case 'primary':
        console.log(key, palette[key])
        palette[key] = convertHSLtoRGB(
          palette[key].h,
          palette[key].s,
          palette[key].l
        )
        break

      case 'background':
        palette[key] = {
          h: primaryColor.h,
          s: primaryColor.s,
          l: primaryColor.l * (generateRandom(180, 199) / 100)
        }
        console.log(key, palette[key])
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
          s: primaryColor.s * (generateRandom(75, 200) / 100),
          l: primaryColor.l * (generateRandom(75, 175) / 100)
        }
        console.log(key, palette[key])
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
          s: primaryColor.s * (generateRandom(60, 120) / 100),
          l: primaryColor.l * (generateRandom(60, 120) / 100)
        }
        console.log(key, palette[key])
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
          l: generateRandom(1, 15)
        }
        console.log(key, palette[key])
        palette[key] = convertHSLtoRGB(
          palette[key].h,
          palette[key].s,
          palette[key].l
        )
        i++
        break
    }

    // console.log(key, palette[key])
  }

  return palette
}

export { createBaseColor, convertHSLtoRGB, createScientificPalette }
