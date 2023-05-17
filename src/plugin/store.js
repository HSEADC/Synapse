let language = 'latin'
let imagesForExport = []
let currentTemplate
let charityData

function getStoreLanguage() {
  return language
}

function setStoreLanguage(newLanguage) {
  language = newLanguage
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
  getCharityData
}
