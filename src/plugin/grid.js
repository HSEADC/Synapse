import { sample } from './utilities.js'

let gridModule = 0
let vertical = true
let volumeFactor = 0
let friendlinessFactor = 0

const modules = [52, 48, 44, 36, 32, 28, 24, 20, 16, 14, 12, 10, 9, 8, 7, 6]
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
      for (let i = 0; i <= 3; i++) {
        weightedModules.push(modules[i])
      }
      break

    case -1:
      for (let i = 4; i <= 7; i++) {
        weightedModules.push(modules[i])
      }
      break

    case 0:
      for (let i = 7; i <= 9; i++) {
        weightedModules.push(modules[i])
      }
      break

    case 1:
      for (let i = 9; i <= 12; i++) {
        weightedModules.push(modules[i])
      }
      break

    case 2:
      for (let i = 13; i <= 15; i++) {
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
