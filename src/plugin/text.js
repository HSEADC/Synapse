import { sample } from './utilities'
import { fontList } from '../libraries/fonts'

function pickIdentityFont(charityData) {
  let rationality = 'rational'
  let friendliness = 'Serious'
  let volume = 'Quiet'

  if (charityData.rationality === 'Эмоциональный') {
    rationality = 'emotional'
  }

  if (charityData.friendliness === 'Дружелюбный') {
    friendliness = 'Friendly'
  }

  if (charityData.volume === 'Громкий') {
    volume = 'Loud'
  }
  let key = rationality + friendliness + volume
  let identityFont = sample(fontList[key])
  // console.log(identityFont)
  return identityFont
}

export { pickIdentityFont }
