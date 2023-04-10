import { sample } from './utilities.js'

let gridModule = 0
let vertical = true
let volumeFactor = 0
let friendlinessFactor = 0

const modules = [44, 36, 32, 28, 24, 20, 16, 12, 10, 6]
const weightedModules = []

function generateGridModule(friendliness, volume) {
  if (friendliness === 'Дружелюбный') {
    friendlinessFactor = 1
  }
  if (volume === 'Громкий') {
    volumeFactor = 1
  }
  let combinedFactors = volumeFactor + friendlinessFactor

  switch (combinedFactors) {
    case -2:
      for (let i = 0; i <= 1; i++) {
        weightedModules.push(modules[i])
      }
      break

    case -1:
      for (let i = 2; i <= 3; i++) {
        weightedModules.push(modules[i])
      }
      break

    case 0:
      for (let i = 4; i <= 5; i++) {
        weightedModules.push(modules[i])
      }
      break

    case 1:
      for (let i = 6; i <= 7; i++) {
        weightedModules.push(modules[i])
      }
      break

    case 2:
      for (let i = 8; i <= 9; i++) {
        weightedModules.push(modules[i])
      }
      break
  }

  let gridModule = sample(weightedModules)

  return gridModule
}

function generateLayoutGrid(gridModule, frame) {
  if (frame.clientWidth > frame.clientHeight) {
    gridModule = frame.clientHeight / sampleModules
    vertical = false
  } else {
    gridModule = frame.clientWidth / sampleModules
  }
}

export { generateGridModule }
