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

function getAllPatternRenders() {
  return patternRenders
}

function setAllPatternRenders(newPatternRenders) {
  patternRenders = newPatternRenders
}

function getPatternRenders(key) {
  return patternRenders[key]
}

function setPatternRenders(newPatternRender, patternID) {
  patternRenders = {
    ...patternRenders,
    [`${patternID}`]: newPatternRender
  }
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
  setPatternRenders,
  getAllPatternRenders,
  setAllPatternRenders
}
