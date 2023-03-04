import { generateRandom } from './utilities'

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

function generateDesign(frame) {
  frame.style.backgroundColor = sample(backcolors)

  var circles = document.querySelectorAll('.circle')
  circles.forEach(circle => {
    circle.remove()
  })

  var textss = document.querySelectorAll('.text')
  textss.forEach(text => {
    text.remove()
  })

  frame.style.width = [getRandomArbitrary(6, 9) * 100, 'px'].join('')
  frame.style.height = [getRandomArbitrary(3, 9) * 100, 'px'].join('')

  generateGrid(frame)

  for (var i = 0; i < 20; i++) {
    createCircle(frame)
  }

  generateText(frame)
}

function generateCirclesPattern(frame, charityData) {
  const identityColors = charityData.identityColors
  frame.style.backgroundColor = `rgb(${identityColors.background.r}, ${identityColors.background.g}, ${identityColors.background.b})`
}
