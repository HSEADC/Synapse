import { getRandomArbitrary, sample, weightedRandom } from './utilities'
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
  // console.log('colors', colors.primary, colors.adOne, colors.adTwo, 'switch', patternParams.colorSwitch.adOne, patternParams.colorSwitch.adTwo, 'circleColor', circleColor);
  // console.log(`rgb(${circleColor.r * 255}, ${circleColor.g * 255}, ${circleColor.b * 255})`);

  container.appendChild(circle)
}

function generatePatternParams(charityData) {
  let gridModule = generateGridModule(
    charityData.friendliness,
    charityData.volume
  )

  let positionSwitch = 0
  let sizeSwitch = 0
  let colorSwitch = {
    primary: 100,
    adOne: getRandomArbitrary(0, 100),
    adTwo: getRandomArbitrary(0, 100)
  }
  let size = 100

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

  container.style.backgroundColor = `rgb(${colors.background.r * 255}, ${colors
    .background.g * 255}, ${colors.background.b * 255})`

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
      i
    )

    if ((i + 1) % patternParams.gridModule === 0) {
      row++
    }
  }
}

export { renderPattern, generatePatternParams, addCircle }
