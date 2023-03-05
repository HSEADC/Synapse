import { getRandomArbitrary } from './utilities'
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

const frameRate = 30

const canvasSize = {
  width: 0,
  height: 0
}

let w = 0
let h = 0

let x = 0
let y = 0

let container

function addRectangle(patternParams, container) {
  let w = patternParams.w
  let h = patternParams.h
  let colors = patternParams.colors
  // console.log('w', patternParams.w, 'h',patternParams.h, 'colors', patternParams.colors);

  x = getRandomArbitrary(0, canvasSize.width - w)
  y = getRandomArbitrary(0, canvasSize.height - h)

  const rectangle = document.createElement('div')
  rectangle.style.width = w + 'px'
  rectangle.style.height = h + 'px'

  rectangle.style.top = y + 'px'
  rectangle.style.left = x + 'px'

  rectangle.style.backgroundColor = `rgb(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b})`
  console.log(rectangle.style.backgroundColor)

  container.appendChild(rectangle)

  return <div>ummmm</div>
}

function generatePatternParams(charityData) {}

function renderPattern(patternParams, index) {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById(`container${index}`)
    console.log(container)
    // container.className = "ooooooogaaaa";
    for (let i = 0; i < 20; i++) {
      addRectangle(patternParams, container)
    }
  })
}

export { renderPattern }
