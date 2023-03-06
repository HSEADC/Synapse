import { getRandomArbitrary, sample } from './utilities'
import React from 'react'
import ReactDOM from 'react-dom'
import { createElement } from 'react'

function dot(size, color) {}

function createCircle(frame) {
  const circleElement = document.createElement('div')
  circleElement.classList.add('circle')

  const left =
    Math.floor(Math.random() * (frame.clientWidth / gridModule)) * gridModule
  const top =
    Math.floor(Math.random() * (frame.clientHeight / gridModule)) * gridModule

  circleElement.style.top = [top, 'px'].join('')
  circleElement.style.left = [left, 'px'].join('')
  circleElement.style.width = [gridModule, 'px'].join('')
  circleElement.style.height = [gridModule, 'px'].join('')
  circleElement.style.backgroundColor = sample(colors)

  frame.appendChild(circleElement)
}

function generateCirclesPattern(frame, charityData) {
  const identityColors = charityData.identityColors
  frame.style.backgroundColor = `rgb(${identityColors.background.r}, ${identityColors.background.g}, ${identityColors.background.b})`
}

let w = 0
let h = 0

let x = 0
let y = 0

let container

function addRectangle(patternParams, container, canvasSize, key) {
  let w = patternParams.w
  let h = patternParams.h
  let colors = patternParams.colors
  // console.log('w', patternParams.w, 'h',patternParams.h, 'colors', patternParams.colors);

  x = getRandomArbitrary(0, canvasSize.width - w)
  y = getRandomArbitrary(0, canvasSize.height - h)

  const rectangle = document.createElement('div')
  rectangle.classList.add('circle')
  rectangle.style.width = w + 'px'
  rectangle.style.height = h + 'px'
  rectangle.style.position = 'absolute'
  rectangle.style.top = y + 'px'
  rectangle.style.left = x + 'px'

  if (patternParams.colorSwitch) {
    if (key % patternParams.colorSwitch == 0) {
      let adOneColor = `rgb(${colors.adOne.r * 255}, ${colors.adOne.g *
        255}, ${colors.adOne.b * 255})`
      let adTwoColor = `rgb(${colors.adTwo.r * 255}, ${colors.adTwo.g *
        255}, ${colors.adTwo.b * 255})`
      let textColor = `rgb(${colors.text.r * 255}, ${colors.text.g *
        255}, ${colors.text.b * 255})`
      let colorOptions = [adOneColor, adTwoColor, textColor]
      rectangle.style.backgroundColor = sample(colorOptions)
    } else {
      rectangle.style.backgroundColor = `rgb(${colors.primary.r * 255}, ${colors
        .primary.g * 255}, ${colors.primary.b * 255})`
    }
  } else {
    rectangle.style.backgroundColor = `rgb(${colors.primary.r * 255}, ${colors
      .primary.g * 255}, ${colors.primary.b * 255})`
  }

  container.appendChild(rectangle)

  return <div>ummmm</div>
}

function generatePatternParams(charityData) {}

function renderPattern(patternParams, index) {
  document.addEventListener('DOMContentLoaded', () => {
    let colors = patternParams.colors
    const container = document.getElementById(`container${index}`)
    const canvasSize = {
      width: container.offsetWidth,
      height: container.offsetHeight
    }
    container.style.backgroundColor = `rgb(${colors.background.r *
      255}, ${colors.background.g * 255}, ${colors.background.b * 255})`
    console.log(container)
    // container.className = "ooooooogaaaa";
    for (let i = 0; i < patternParams.quantity; i++) {
      let key = i
      addRectangle(patternParams, container, canvasSize, key)
    }
  })
}

export { renderPattern }
