import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react'

import P_Feed from './components/05_Pages/P_Feed'
import { Style } from './components/05_Pages/P_Style'
import P_IdentityCreation from './components/05_Pages/P_Identity_Creation'
import P_Onboarding from './components/05_Pages/P_Onboarding'

import { getRandom } from '../plugin/utilities'
import { createBaseColor, createScientificPalette } from '../plugin/color'
import { generatePatternParams } from '../plugin/pattern'

Array.prototype.remove = function() {
  // prettier-ignore
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L]
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1)
    }
  }
  return this
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      view: 'identity_creation',
      onboardingStep: 1,
      identityCreationStep: 2,
      charityTitle: '',
      charityCategory: 'Здравоохранение',
      friendliness: 'Серьезный',
      volume: 'Громкий',
      rationality: 'Эмоциональный',
      identityColorsProgress: '',
      identityColors: '',
      identityFonts: '',
      identityPatternParamsProgress: '',
      identityPatternParams: '',
      templates: {
        tab: 'Шаблоны',
        section: ''
      }
    }
  }

  handleChange = (param, value) => {
    this.setState({ [`${param}`]: value })

    if (param === 'charityCategory') {
      if (value == 'Здравоохранение') {
        this.setState({
          friendliness: 'Серьезный',
          volume: 'Тихий',
          rationality: 'Эмоциональный'
        })
      } else if (value == 'Социальные проблемы') {
        this.setState({
          friendliness: 'Серьезный',
          volume: 'Громкий',
          rationality: 'Эмоциональный'
        })
      } else if (value == 'Защита природы и животных') {
        this.setState({
          friendliness: 'Дружелюбный',
          volume: 'Тихий',
          rationality: 'Эмоциональный'
        })
      } else if (value == 'Культура и образование') {
        this.setState({
          friendliness: 'Дружелюбный',
          volume: 'Громкий',
          rationality: 'Эмоциональный'
        })
      } else {
        this.setState({ friendliness: '', volume: '', rationality: '' })
      }
    }
  }

  handleSave() {
    this.setState({ text: this.state.inputText, mode: 'view' })
  }

  handleEdit() {
    this.setState({ mode: 'edit' })
  }

  componentDidMount() {}

  getFromStorage = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'get-storage'
        }
      },
      '*'
    )
  }

  setToStorage = () => {
    const {
      charityTitle,
      charityCategory,
      friendliness,
      volume,
      rationality,
      identityColors,
      identityFonts,
      identityPatternParams
    } = this.props
    parent.postMessage(
      {
        pluginMessage: {
          type: 'set-storage',
          charityTitle: charityTitle,
          charityCategory: charityCategory,
          friendliness: friendliness,
          volume: volume,
          rationality: rationality,
          identityColors: identityColors,
          identityFonts: identityFonts,
          identityPatternParams: identityPatternParams
        }
      },
      '*'
    )
  }

  openPage = () => {
    this.setState({
      view: 'templates'
    })
  }

  exportPageToFigma = () => {
    const { pairs } = this.props
    const { currentPairId, recommendedPairs } = this.state

    parent.postMessage(
      {
        pluginMessage: {
          type: 'font-pair-export',
          pairs: pairs,
          currentPairId: currentPairId,
          recommendedPairs: recommendedPairs
        }
      },
      '*'
    )
  }

  //palette////////////////////////////////////////////////////////////////////////////////////////////////////

  startPalettePreviews = charityData => {
    for (let i = 0; i < 5; i++) {
      const primary = createBaseColor(charityData)
      const palette = createScientificPalette(primary, charityData)
      const paletteOption = {
        primary: palette.primary,
        text: palette.text,
        adOne: palette.adOne,
        adTwo: palette.adTwo,
        background: palette.background
      }
      this.setState(prevState => ({
        identityColorsProgress: [
          ...prevState.identityColorsProgress,
          paletteOption
        ]
      }))
    }

    this.nextStepIdentity()
  }

  newPalettePreview = () => {
    const charityData = {
      charityTitle: this.state.charityTitle,
      charityCategory: this.state.charityCategory,
      friendliness: this.state.friendliness,
      volume: this.state.volume,
      rationality: this.state.rationality,
      identityColors: this.state.identityColors,
      identityFonts: this.state.identityFonts
    }
    const primary = createBaseColor(charityData)
    const palette = createScientificPalette(primary, charityData)
    const paletteOption = {
      primary: palette.primary,
      text: palette.text,
      adOne: palette.adOne,
      adTwo: palette.adTwo,
      background: palette.background
    }
    this.setState(prevState => ({
      identityColorsProgress: [
        ...prevState.identityColorsProgress,
        paletteOption
      ]
    }))
    console.log(paletteOption)
  }

  savePalette = palette => {
    this.setState({ identityColors: palette })
  }

  //pattern////////////////////////////////////////////////////////////////////////////////////////////////////

  startPatternPreviews = () => {
    const charityData = {
      charityTitle: this.state.charityTitle,
      charityCategory: this.state.charityCategory,
      friendliness: this.state.friendliness,
      volume: this.state.volume,
      rationality: this.state.rationality,
      identityColors: this.state.identityColors,
      identityFonts: this.state.identityFonts
    }
    if (this.state.identityPatternParamsProgress[0]) {
    } else {
      for (let i = 0; i < 2; i++) {
        const patternOption = generatePatternParams(charityData)
        this.setState(prevState => ({
          identityPatternParamsProgress: [
            ...prevState.identityPatternParamsProgress,
            patternOption
          ]
        }))
      }
    }
    this.nextStepIdentity()
  }

  savePattern = pattern => {
    this.setState({ identityPatternParams: pattern })
  }

  nextStep = () => {
    this.setState(prevState => {
      const onboardingStep = prevState.onboardingStep + 1
      return { ...prevState, onboardingStep }
    })
  }

  nextStepIdentity = () => {
    this.setState(prevState => {
      const identityCreationStep = prevState.identityCreationStep + 1
      return { ...prevState, identityCreationStep }
    })
  }

  prevStep = () => {
    this.setState(prevState => {
      const onboardingStep = prevState.onboardingStep - 1
      return { ...prevState, onboardingStep }
    })
  }

  prevStepIdentity = () => {
    this.setState(prevState => {
      const identityCreationStep = prevState.identityCreationStep - 1
      return { ...prevState, identityCreationStep }
    })
  }

  feedTab = nextTab => {
    this.setState({
      templates: {
        tab: nextTab
      }
    })
  }

  skipOnboarding = () => {
    this.setState({ view: 'identity_creation' })
  }

  //RENDER/////////////////////////////////////////////////////////////////////////

  render() {
    const actions = {
      handleChange: this.handleChange,
      skipOnboarding: this.skipOnboarding,
      nextStep: this.nextStep,
      prevStep: this.prevStep,
      nextStepIdentity: this.nextStepIdentity,
      prevStepIdentity: this.prevStepIdentity,
      savePalette: this.savePalette,
      feedTab: this.feedTab,
      savePattern: this.savePattern,
      startPalettePreviews: this.startPalettePreviews,
      startPatternPreviews: this.startPatternPreviews,
      newPalettePreview: this.newPalettePreview
    }

    const charityData = {
      charityTitle: this.state.charityTitle,
      charityCategory: this.state.charityCategory,
      friendliness: this.state.friendliness,
      volume: this.state.volume,
      rationality: this.state.rationality,
      identityColors: this.state.identityColors,
      identityFonts: this.state.identityFonts,
      identityPatternParams: this.state.identityPatternParams
    }

    const {
      view,
      onboardingStep,
      identityCreationStep,
      identityCreationScreens,
      templates,
      fonts,
      identityColorsProgress,
      identityPatternParamsProgress
    } = this.state
    if (view === 'login') {
      return (
        <div className="App">
          <Login />
        </div>
      )
    } else if (view === 'style') {
      return (
        <div className="App">
          <Style />
        </div>
      )
    } else if (view === 'onboarding') {
      return <P_Onboarding onboardingStep={onboardingStep} actions={actions} />
    } else if (view === 'identity_creation') {
      return (
        <P_IdentityCreation
          identityCreationStep={identityCreationStep}
          identityCreationScreens={identityCreationScreens}
          charityData={charityData}
          actions={actions}
          identityColorsProgress={identityColorsProgress}
          identityPatternParamsProgress={identityPatternParamsProgress}
        />
      )
    } else {
      return (
        <div className="App">
          <P_Feed actions={actions} templates={templates} />
        </div>
      )
    }
  }
}

// реакт контейнер содержит весь стейт почитать
