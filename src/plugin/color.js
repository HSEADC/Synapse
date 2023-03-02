import { generateRandom } from './utilities'

function convertHSLtoRGB(h, s, l) {
  s /= 100
  l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

  const colorRGB = {
    r: String(f(0)).slice(0, 4) * 255,
    g: String(f(8)).slice(0, 4) * 255,
    b: String(f(4)).slice(0, 4) * 255
  }

  return colorRGB
}

function createBaseColor(charityData) {
  let friendlinessFactorS = 1
  let friendlinessFactorL = 1

  let volumeFactorH = 1
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
    h: Math.floor(Math.random() * 360 * rationalityFactorH * volumeFactorH),
    s:
      String(Math.random()).slice(0, 4) *
      100 *
      friendlinessFactorS *
      rationalityFactorS *
      volumeFactorS,
    l:
      String(Math.random()).slice(0, 4) *
      100 *
      friendlinessFactorL *
      rationalityFactorL *
      volumeFactorL
  }

  const baseColor = convertHSLtoRGB(
    baseColorHSL.h,
    baseColorHSL.s,
    baseColorHSL.l
  )
  return baseColor
}

function adjustHue(val) {
  if (val < 0) val += Math.ceil(-val / 360) * 360

  return val % 360
}

function createScientificPalette() {
  let baseColor = createBaseColor()

  const targetHueSteps = {
    analogous: [0, 30, 60],
    triadic: [0, 120, 240],
    tetradic: [0, 90, 180, 270],
    complementary: [0, 180],
    splitComplementary: [0, 150, 210]
  }

  const palette = {}

  for (const type of Object.keys(targetHueSteps)) {
    palette[type] = targetHueSteps[type].map(step => ({
      l: baseColor.l,
      s: baseColor.s,
      h: adjustHue(baseColor.h + step)
    }))
  }

  return baseColor
}

export { createBaseColor, convertHSLtoRGB, createScientificPalette }
