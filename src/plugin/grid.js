import { sample, getRandomArbitrary } from './utilities.js'

let gridModule = 0
let vertical = true

const modules = [16]

function generateGrid(frame) {
  let sampleModules = sample(modules)
  if (frame.clientWidth > frame.clientHeight) {
    gridModule = frame.clientHeight / sampleModules
    vertical = false
  } else {
    gridModule = frame.clientWidth / sampleModules
  }
}

export { generateGrid, gridModule }
