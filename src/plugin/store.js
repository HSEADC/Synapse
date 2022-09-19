let language = 'latin'
let imagesForExport = []

function getStoreLanguage() {
  return language
}

function setStoreLanguage(newLanguage) {
  language = newLanguage
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
  setStoreLanguage
}
