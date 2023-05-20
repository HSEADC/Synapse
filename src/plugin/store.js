let language = 'latin'
let imagesForExport = []
let currentTemplate
let charityData
let patternRenders = {}

function getStoreLanguage() {
  return language
}

function setStoreLanguage(newLanguage) {
  language = newLanguage
}

function getPatternRenders(key) {
  // console.log('get pattern', key, patternRenders[key]);
  console.log('patternRenders', patternRenders)
  return patternRenders[key]
}

function setPatternRenders(newPatternRender, patternID) {
  patternRenders = {
    ...patternRenders,
    [`${patternID}`]: newPatternRender
  }
  // console.log('template added to rendered', patternRenders);
}

function getCurrentTemplate() {
  return currentTemplate
}

function setCurrentTemplate(newCurrentTemplate) {
  currentTemplate = newCurrentTemplate
}

function setCharityData(newCharityData) {
  charityData = newCharityData
}

function getCharityData() {
  return charityData
}

function getStoreImagesForExport() {
  return imagesForExport
}

function setStoreImagesForExport(newImagesForExport) {
  imagesForExport = newImagesForExport
}

export {
  getStoreImagesForExport,
  setStoreImagesForExport,
  getStoreLanguage,
  setStoreLanguage,
  getCurrentTemplate,
  setCurrentTemplate,
  setCharityData,
  getCharityData,
  getPatternRenders,
  setPatternRenders
}
