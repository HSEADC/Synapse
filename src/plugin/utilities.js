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

export { getRandom, generateRandom, mode, sample, getRandomArbitrary }
