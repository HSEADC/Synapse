import { getRandomArbitrary, sample, weightedRandom } from './utilities'
import { generateGridModule } from './grid'
import React from 'react'
import ReactDOM from 'react-dom'
import { createElement } from 'react'
import { getPatternRenders, setPatternRenders } from './store'

function addCircle(
  size,
  gridModuleSize,
  column,
  row,
  container,
  transformX,
  transformY,
  color
) {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  circle.style.width = gridModuleSize * size + 'px'
  circle.style.height = gridModuleSize * size + 'px'
  circle.style.top = gridModuleSize * (row + transformY) + 'px'

  circle.style.left = gridModuleSize * (column + transformX) + 'px'
  circle.style.transform = `translate(${transformX}, ${transformY})`

  circle.style.backgroundColor = `rgb(${color.r * 255}, ${color.g *
    255}, ${color.b * 255})`

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
    (10 - friendlinessFactor * getRandomArbitrary(10, 40)) -
    (10 - volumeFactor * getRandomArbitrary(10, 40))

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

function renderPattern(patternParams, container, patternID) {
  if (patternID && getPatternRenders(patternID)) {
    const canvasSize = {
      width: container.offsetWidth,
      height: container.offsetHeight
    }

    let gridModuleSize

    if (canvasSize.width > canvasSize.height) {
      gridModuleSize = canvasSize.width / patternParams.gridModule
    } else {
      gridModuleSize = canvasSize.height / patternParams.gridModule
    }

    Object.values(getPatternRenders(patternID)).map(circle => {
      addCircle(
        circle.size,
        gridModuleSize,
        circle.column,
        circle.row,
        container,
        circle.transformX,
        circle.transformY,
        circle.color
      )
    })
  } else {
    let circlesStore = []
    let colors = patternParams.colors

    const canvasSize = {
      width: container.offsetWidth,
      height: container.offsetHeight
    }

    let size
    let gridModuleSize

    if (canvasSize.width > canvasSize.height) {
      gridModuleSize = canvasSize.width / patternParams.gridModule
    } else {
      gridModuleSize = canvasSize.height / patternParams.gridModule
    }

    let column
    let row = 0

    for (
      let i = 0;
      i < (patternParams.gridModule - 1) * (patternParams.gridModule - 1);
      i++
    ) {
      size = weightedRandom(
        [patternParams.size / 100, getRandomArbitrary(50, 120) / 100],
        [100, patternParams.sizeSwitch]
      ).item

      let colors = patternParams.colors

      let color = weightedRandom(
        [colors.primary, colors.adOne, colors.adTwo],
        [
          patternParams.colorSwitch.primary,
          patternParams.colorSwitch.adOne,
          patternParams.colorSwitch.adTwo
        ]
      ).item

      let transformX =
        ((patternParams.positionSwitch / 100) * getRandomArbitrary(-100, 100)) /
        100
      let transformY =
        ((patternParams.positionSwitch / 100) * getRandomArbitrary(-100, 100)) /
        100

      column = i - patternParams.gridModule * row

      addCircle(
        size,
        gridModuleSize,
        column,
        row,
        container,
        transformX,
        transformY,
        color
      )

      let circleToSave = {
        key: i,
        size: size,
        color: color,
        transformX: transformX,
        transformY: transformY,
        column: column,
        row: row
      }

      circlesStore.push(circleToSave)

      if ((i + 1) % patternParams.gridModule === 0) {
        row++
      }
    }

    if (patternID) {
      window[patternID] = circlesStore

      setPatternRenders(eval(patternID), patternID)
    }
  }
}

function findOrRenderPattern(patternParams, container, template, element) {
  if (template && element) {
    let patternID = `${template.id}${element}`
    if (getPatternRenders(patternID)) {
      renderPattern(patternParams, container, patternID)
    } else {
      renderPattern(patternParams, container, patternID)
    }
  } else {
    renderPattern(patternParams, container)
  }
}

export { findOrRenderPattern, generatePatternParams, addCircle }
