import { getRandomArbitrary, sample } from './utilities'
import { generateGridModule } from './grid'
import React from 'react'
import ReactDOM from 'react-dom'
import { createElement } from 'react'

// function createCircle(frame) {
//   const circleElement = document.createElement('div')
//   circleElement.classList.add('circle')

//   const left =
//     Math.floor(Math.random() * (frame.clientWidth / gridModule)) * gridModule
//   const top =
//     Math.floor(Math.random() * (frame.clientHeight / gridModule)) * gridModule

//   circleElement.style.top = [top, 'px'].join('')
//   circleElement.style.left = [left, 'px'].join('')
//   circleElement.style.width = [gridModule, 'px'].join('')
//   circleElement.style.height = [gridModule, 'px'].join('')
//   circleElement.style.backgroundColor = sample(colors)

//   frame.appendChild(circleElement)
// }

function addCircle(
  patternParams,
  circleSize,
  gridModuleSize,
  column,
  row,
  container,
  canvasSize,
  key
) {
  let colors = patternParams.colors

  const circle = document.createElement('div')
  circle.classList.add('circle')
  circle.style.width = circleSize + 'px'
  circle.style.height = circleSize + 'px'
  circle.innerHTML = key
  circle.style.top = gridModuleSize * row + 'px'
  circle.style.left = gridModuleSize * column + 'px'
  circle.style.transform = `translate(${(gridModuleSize - circleSize) /
    2}px, ${(gridModuleSize - circleSize) / 2}px)`

  if (patternParams.colorSwitch) {
    if (key % patternParams.colorSwitch == 0) {
      let adOneColor = `rgb(${colors.adOne.r * 255}, ${colors.adOne.g *
        255}, ${colors.adOne.b * 255})`
      let adTwoColor = `rgb(${colors.adTwo.r * 255}, ${colors.adTwo.g *
        255}, ${colors.adTwo.b * 255})`
      let textColor = `rgb(${colors.text.r * 255}, ${colors.text.g *
        255}, ${colors.text.b * 255})`
      let colorOptions = [adOneColor, adTwoColor, textColor]
      circle.style.backgroundColor = sample(colorOptions)
    } else {
      circle.style.backgroundColor = `rgb(${colors.primary.r * 255}, ${colors
        .primary.g * 255}, ${colors.primary.b * 255})`
    }
  } else {
    circle.style.backgroundColor = `rgb(${colors.primary.r * 255}, ${colors
      .primary.g * 255}, ${colors.primary.b * 255})`
  }

  container.appendChild(circle)
}

function generatePatternParams(charityData) {
  let gridModule = generateGridModule(
    charityData.friendliness,
    charityData.volume
  )

  let patternParamsProgress = {
    gridModule: gridModule,
    size: getRandomArbitrary(50, 120),
    sizeSwitch: 3,
    positionSwitch: getRandomArbitrary(0, 100),
    colorSwitch: 3,
    quantity: getRandomArbitrary(50, 100),
    colors: charityData.identityColors
  }

  console.log('size', patternParamsProgress.size)

  return patternParamsProgress
}

function renderPattern(patternParams, index) {
  let colors = patternParams.colors
  const container = document.getElementById(`container${index}`)

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

  circleSize = (gridModuleSize * patternParams.size) / 100

  container.style.backgroundColor = `rgb(${colors.background.r * 255}, ${colors
    .background.g * 255}, ${colors.background.b * 255})`

  let column
  let row = 0

  for (
    let i = 0;
    i < (patternParams.gridModule - 1) * (patternParams.gridModule - 1);
    i++
  ) {
    column = i - patternParams.gridModule * row

    console.log(
      'patternParams.gridModule',
      patternParams.gridModule,
      'i',
      i,
      'column',
      i - patternParams.gridModule * row,
      'row',
      row
    )

    addCircle(
      patternParams,
      circleSize,
      gridModuleSize,
      column,
      row,
      container,
      canvasSize,
      i
    )

    if ((i + 1) % patternParams.gridModule === 0) {
      row++
    }
  }
}

export { renderPattern, generatePatternParams, addCircle }
