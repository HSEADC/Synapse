/**
 * Picks the random item based on its weight.
 * The items with higher weight will be picked more often (with a higher probability).
 *
 * For example:
 * - items = ['banana', 'orange', 'apple']
 * - weights = [0, 0.2, 0.8]
 * - weightedRandom(items, weights) in 80% of cases will return 'apple', in 20% of cases will return
 * 'orange' and it will never return 'banana' (because probability of picking the banana is 0%)
 *
 * @param {any[]} items
 * @param {number[]} weights
 * @returns {{item: any, index: number}}
 */
export default function weightedRandom(items, weights) {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must be of the same size')
  }

  if (!items.length) {
    throw new Error('Items must not be empty')
  }

  const cumulativeWeights = []
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0)
  }

  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1]
  const randomNumber = maxCumulativeWeight * Math.random()

  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return {
        item: items[itemIndex],
        index: itemIndex
      }
    }
  }
}

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len)
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available')
  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

function generateRandom(min, max) {
  let difference = max - min
  let rand = Math.random()
  rand = Math.floor(rand * difference)
  rand = rand + min
  return rand
}

function mode(array) {
  if (array.length == 0) return null
  var modeMap = {}
  var maxEl = array[0],
    maxCount = 1
  for (var i = 0; i < array.length; i++) {
    var el = array[i]
    if (modeMap[el] == null) modeMap[el] = 1
    else modeMap[el]++
    if (modeMap[el] > maxCount) {
      maxEl = el
      maxCount = modeMap[el]
    }
  }
  return maxEl
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function compareObjects(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export {
  weightedRandom,
  getRandom,
  generateRandom,
  mode,
  sample,
  getRandomArbitrary,
  compareObjects
}
