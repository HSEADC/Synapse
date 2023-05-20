import { getRandomArbitrary, sample, weightedRandom } from './utilities'
import { generateGridModule } from './grid'
import React from 'react'
import ReactDOM from 'react-dom'
import { createElement } from 'react'
import { getPatternRenders, setPatternRenders } from './store'

function addCircle(
  patternParams,
  circleSize,
  gridModuleSize,
  column,
  row,
  container,
  canvasSize,
  key,
  circlesStore
) {
  let colors = patternParams.colors

  const circle = document.createElement('div')
  circle.classList.add('circle')
  circle.style.width = circleSize + 'px'
  circle.style.height = circleSize + 'px'
  circle.style.top = gridModuleSize * row + 'px'
  circle.style.left = gridModuleSize * column + 'px'
  circle.style.transform = `translate(calc(${(gridModuleSize - circleSize) /
    2}px + ${(patternParams.positionSwitch / 100) *
    getRandomArbitrary(-100, 100)}%), calc(${(gridModuleSize - circleSize) /
    2}px + ${(patternParams.positionSwitch / 100) *
    getRandomArbitrary(-100, 100)}%))`

  let circleColor = weightedRandom(
    [colors.primary, colors.adOne, colors.adTwo],
    [
      patternParams.colorSwitch.primary,
      patternParams.colorSwitch.adOne,
      patternParams.colorSwitch.adTwo
    ]
  ).item
  circle.style.backgroundColor = `rgb(${circleColor.r * 255}, ${circleColor.g *
    255}, ${circleColor.b * 255})`

  let circleToSave = {
    key: key,
    circleSize: circleSize,
    circleColor: circleColor
  }

  circlesStore.push(circleToSave)
  container.appendChild(circle)
}

function generatePatternParams(charityData) {
  let gridModule = generateGridModule(
    charityData.friendliness,
    charityData.volume
  )

  let friendlinessFactor = 1
  let volumeFactor = 1
  let rationalityFactor = 1

  if (charityData.friendliness === 'Серьезный') {
    friendlinessFactor = 0
  }

  if (charityData.volume === 'Тихий') {
    volumeFactor = 0
  }

  if (charityData.rationality === 'Рациональный') {
    rationalityFactor = 0
  }

  let combinedFactors = rationalityFactor + volumeFactor + friendlinessFactor

  let positionSwitch =
    getRandomArbitrary(0, 15) * combinedFactors * rationalityFactor
  let sizeSwitch =
    getRandomArbitrary(0, 20) * combinedFactors * rationalityFactor
  let colorSwitch = {
    primary: 100,
    adOne: getRandomArbitrary(0, 20) * combinedFactors * rationalityFactor,
    adTwo:
      getRandomArbitrary(0, 20) *
      combinedFactors *
      friendlinessFactor *
      rationalityFactor
  }
  let size =
    100 -
    (10 - friendlinessFactor * getRandomArbitrary(10, 30)) -
    (10 - volumeFactor * getRandomArbitrary(10, 30))

  let patternParamsProgress = {
    gridModule: gridModule,
    size: size,
    sizeSwitch: sizeSwitch,
    positionSwitch: positionSwitch,
    colorSwitch: colorSwitch,
    quantity: getRandomArbitrary(50, 100),
    colors: charityData.identityColors
  }

  return patternParamsProgress
}

function renderPattern(patternParams, container, template, element) {
  if (template && element) {
    let patternID = `${template.id}${element.id}`
    if (getPatternRenders(patternID)) {
    }
  } else {
    let circlesStore = []
    let colors = patternParams.colors
    // const container = document.getElementById(`container${index}`)

    const canvasSize = {
      width: container.offsetWidth,
      height: container.offsetHeight
    }

    let circleSize
    let gridModuleSize

    if (canvasSize.width > canvasSize.height) {
      gridModuleSize = canvasSize.width / patternParams.gridModule
    } else {
      gridModuleSize = canvasSize.height / patternParams.gridModule
    }

    container.style.backgroundColor = `rgb(${colors.background.r *
      255}, ${colors.background.g * 255}, ${colors.background.b * 255})`

    let column
    let row = 0

    for (
      let i = 0;
      i < (patternParams.gridModule - 1) * (patternParams.gridModule - 1);
      i++
    ) {
      circleSize = weightedRandom(
        [
          (gridModuleSize * patternParams.size) / 100,
          (gridModuleSize * getRandomArbitrary(50, 120)) / 100
        ],
        [100, patternParams.sizeSwitch]
      ).item

      column = i - patternParams.gridModule * row

      addCircle(
        patternParams,
        circleSize,
        gridModuleSize,
        column,
        row,
        container,
        canvasSize,
        i,
        circlesStore
      )

      if ((i + 1) % patternParams.gridModule === 0) {
        row++
      }

      eval(
        'const ' + template.id + element.id + ` = {circles: ${circlesStore}}`
      )

      console.log(eval(template.id + element.id))
    }
  }
}

export { renderPattern, generatePatternParams, addCircle }
