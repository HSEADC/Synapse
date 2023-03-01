import { generateRandom } from './utilities'

// create a var out of a function that will contain a palette
// maybe need a promise
// https://github.com/oxanakochueva/font/blob/master/src/app/App.jsx#L50
// set and get

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

function createBaseColor() {
  const baseColorHSL = {
    l: String(Math.random()).slice(0, 4) * 100,
    s: String(Math.random()).slice(0, 4) * 100,
    h: Math.floor(Math.random() * 360)
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

  return palette
}

export { createBaseColor, convertHSLtoRGB, createScientificPalette }
