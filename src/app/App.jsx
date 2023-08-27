import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react'

import P_Feed from './components/05_Pages/P_Feed'
import { Style } from './components/05_Pages/P_Style'
import P_IdentityCreation from './components/05_Pages/P_Identity_Creation'
import P_Onboarding from './components/05_Pages/P_Onboarding'
import P_DesignCreation from './components/05_Pages/P_DesignCreation'

import { getRandom } from '../plugin/utilities'
import { createBaseColor, createScientificPalette } from '../plugin/color'
import { generatePatternParams } from '../plugin/pattern'
import { pickIdentityFont } from '../plugin/text'

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
      view: 'feed',
      onboardingStep: 1,
      identityCreationStep: 1,
      charityTitle: '',
      charityCategory: '',
      friendliness: '',
      volume: '',
      rationality: '',
      identityColorsProgress: '',
      identityColorsCheck: '',
      identityColors: '',
      identityFontsProgress: '',
      identityFonts: '',
      identityPatternParamsProgress: '',
      identityPatternParams: '',
      menuPopup: false,
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

  componentDidMount() {
    this.setCharityData()
  }

  componentDidUpdate(prevProps, prevState) {
    const charityData = {
      charityTitle: this.state.charityTitle,
      charityCategory: this.state.charityCategory,
      friendliness: this.state.friendliness,
      volume: this.state.volume,
      rationality: this.state.rationality,
      identityColors: this.state.identityColors,
      identityFonts: this.state.identityFonts
    }

    if (prevState.charityCategory) {
      if (
        prevState.charityCategory != this.state.charityCategory ||
        prevState.friendliness !== this.state.friendliness ||
        prevState.volume !== this.state.volume ||
        prevState.rationality !== this.state.rationality
      ) {
        this.setState({
          identityColorsProgress: '',
          identityFontsProgress: ''
        })
        this.createPalettes(charityData)
        this.createFontOptions(charityData)
      }

      if (prevState.identityColors != this.state.identityColors) {
        this.setState({
          identityPatternParamsProgress: ''
        })
        this.createPatternParams(charityData)
      }
    }
  }

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

  setCharityData = () => {
    let charityData = JSON.parse(this.props.charityData)
    this.setState({
      charityTitle: charityData.charityTitle,
      charityCategory: charityData.charityCategory,
      friendliness: charityData.friendliness,
      volume: charityData.volume,
      rationality: charityData.rationality,
      identityColors: charityData.identityColors,
      identityFonts: charityData.identityFonts,
      identityPatternParams: charityData.identityPatternParams,
      identityColorsProgress: charityData.identityColorsProgress,
      identityFontsProgress: charityData.identityFontsProgress,
      identityPatternParamsProgress: charityData.identityPatternParamsProgress
    })
  }

  getCharityDataFromHTML = () => {
    return document.getElementById('react-page').getAttribute('charityData')
  }

  setToStorage = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'set-storage',
          charityTitle: this.state.charityTitle,
          charityCategory: this.state.charityCategory,
          friendliness: this.state.friendliness,
          volume: this.state.volume,
          rationality: this.state.rationality,
          identityColors: this.state.identityColors,
          identityColorsProgress: this.state.identityColorsProgress,
          identityFonts: this.state.identityFonts,
          identityFontsProgress: this.state.identityFontsProgress,
          identityPatternParams: this.state.identityPatternParams,
          identityPatternParamsProgress: this.state
            .identityPatternParamsProgress
        }
      },
      '*'
    )
  }

  useToolbar = (template, element) => {}

  // setActiveElement = element => {
  //   console.log('setttt')
  //   this.setState({ activeElement: element })
  // }

  createDesign = (template, charityData, patternRenders) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'create-frame',
          template: template,
          charityData: charityData,
          patternRenders: patternRenders
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

  //palette////////////////////////////////////////////////////////////////////////////////////////////////////
  createPalettes = charityData => {
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
      this.setState({
        identityColorsCheck: {
          category: this.state.charityCategory,
          volume: this.state.volume,
          friendliness: this.state.friendliness,
          rationality: this.state.rationality
        }
      })
    }
  }

  startPalettePreviews = charityData => {
    if (!this.state.identityColorsProgress) {
      this.createPalettes(charityData)
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
    this.goToBottom()
  }

  goToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  savePalette = palette => {
    this.setState({ identityColors: palette })
  }

  //pattern////////////////////////////////////////////////////////////////////////////////////////////////////

  createPatternParams = charityData => {
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
  }

  startPatternPreviews = () => {
    const charityData = {
      charityCategory: this.state.charityCategory,
      friendliness: this.state.friendliness,
      volume: this.state.volume,
      rationality: this.state.rationality,
      identityColors: this.state.identityColors,
      identityFonts: this.state.identityFonts
    }
    if (!this.state.identityPatternParamsProgress) {
      this.createPatternParams(charityData)
    }

    this.nextStepIdentity()
  }

  savePattern = pattern => {
    this.setState({ identityPatternParams: pattern })
  }

  //font////////////////////////////////////////////////////////////////////////////////////////////////////
  createFontOptions = charityData => {
    let check = ['', '']

    if (this.state.identityFontsProgress[0]) {
    } else {
      for (let i = 0; i < 2; i++) {
        const fontOption = pickIdentityFont(charityData)
        check[i] = fontOption
        this.setState(prevState => ({
          identityFontsProgress: [
            ...prevState.identityFontsProgress,
            fontOption
          ]
        }))
      }
    }

    while (check[0] == check[1]) {
      const fontOption = pickIdentityFont(charityData)
      let identityFontsProgress = [...this.state.identityFontsProgress]
      let identityFont = { ...identityFontsProgress[1] }
      identityFont = fontOption
      identityFontsProgress[1] = identityFont
      check[1] = identityFont

      this.setState({ identityFontsProgress })
    }
  }

  startFontsPreviews = () => {
    const charityData = {
      charityTitle: this.state.charityTitle,
      charityCategory: this.state.charityCategory,
      friendliness: this.state.friendliness,
      volume: this.state.volume,
      rationality: this.state.rationality,
      identityColors: this.state.identityColors,
      identityFonts: this.state.identityFonts
    }
    if (!this.state.identityFontsProgress) {
      this.createFontOptions(charityData)
    }

    this.nextStepIdentity()
  }

  saveFont = font => {
    this.setState({ identityFonts: font })
  }

  downloadFont = font => {
    var link
    switch (font) {
      case 'Alegreya':
        link = 'https://fonts.google.com/download?family=Alegreya'
        break

      case 'Arial Narrow':
        link = 'https://allydesign.org/fonts/arial-narrow/arial-narrow.ttf'
        break

      case 'Arial':
        link = 'https://allydesign.org/fonts/arial/arial.ttf'
        break

      case 'Felidae':
        link = 'https://allydesign.org/fonts/felidae/felidae.ttf'
        break

      case 'Forum':
        link = 'https://fonts.google.com/download?family=Forum'
        break

      case 'Kharkiv Tone':
        link = 'https://allydesign.org/fonts/kharkiv/kharkiv.ttf'
        break

      case 'Le Murmure':
        link = 'https://allydesign.org/fonts/le-murmure/le-murmure.otf'
        break

      case 'Lora':
        link = 'https://fonts.google.com/download?family=Lora'
        break

      case 'Miedinger':
        link = 'https://allydesign.org/fonts/miedinger/miedinger.otf'
        break

      case 'Manrope':
        link = 'https://fonts.google.com/download?family=Manrope'
        break

      case 'Neutral Face':
        link = 'https://allydesign.org/fonts/neutral-face/neutral-face.otf'
        break

      case 'Old Standard':
        link = 'https://fonts.google.com/download?family=Old Standard TT'
        break

      case 'Playfair':
        link = 'https://fonts.google.com/download?family=Playfair Display'
        break

      case 'Plup':
        link = 'https://allydesign.org/fonts/plup/plup.ttf'
        break

      case 'Ramona':
        link = 'https://allydesign.org/fonts/ramona/ramona.zip'
        break

      case 'Soyuz Grotesk':
        link = 'https://allydesign.org/fonts/soyuz/soyuz-grotesk.OTF'
        break

      case 'St.Sign':
        link = 'https://allydesign.org/fonts/st.sing/st.sing.ttf'
        break

      case 'St.Sign Condensed':
        link = 'https://allydesign.org/fonts/st.sing/st.sing-condensed.ttf'
        break

      case 'Times New Roman':
        link =
          'https://allydesign.org/fonts/times-new-roman/times-new-roman.zip'
        break

      case 'Truin':
        link = 'https://allydesign.org/fonts/truin/truin.ttf'
        break

      case 'Unlimited Pie':
        link = 'https://allydesign.org/fonts/unlimited-pie/unlimited-pie.otf'
        break
    }
    window.open(link, '_blank')
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
        tab: nextTab,
        section: this.state.templates.section,
        sectionTitle: this.state.templates.sectionTitle,
        templateID: this.state.templates.templateID,
        templateTitle: this.state.templates.templateTitle
      }
    })
  }

  backToTemplates = () => {
    this.setState({
      templates: {
        tab: 'Шаблоны',
        section: ''
      }
    })
  }

  backToSection = () => {
    this.setState({
      view: 'feed',
      templates: {
        tab: 'Шаблоны',
        section: this.state.templates.section,
        sectionTitle: this.state.templates.sectionTitle,
        templateID: undefined,
        templateTitle: undefined
      }
    })
  }

  chooseSection = (section, sectionTitle) => {
    this.setState({
      templates: {
        tab: 'Шаблоны',
        section: section,
        sectionTitle: sectionTitle
      }
    })

    window.scrollTo({
      top: 0
    })
  }

  openTemplate = (templateID, templateTitle) => {
    this.setState({
      templates: {
        tab: 'Шаблоны',
        section: this.state.templates.section,
        sectionTitle: this.state.templates.sectionTitle,
        templateID: templateID,
        templateTitle: templateTitle
      }
    })
  }

  skipOnboarding = () => {
    this.setState({ view: 'identity-creation' })
  }

  saveIdentity = () => {
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

    this.setToStorage()
    parent.postMessage(
      {
        pluginMessage: {
          type: 'create-styles',
          charityData: charityData
        }
      },
      '*'
    )
    this.setState({ view: 'feed' })
  }

  useTemplate = () => {
    this.setState({
      view: 'design-creation'
    })
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
      chooseSection: this.chooseSection,
      savePattern: this.savePattern,
      startPalettePreviews: this.startPalettePreviews,
      startPatternPreviews: this.startPatternPreviews,
      startFontsPreviews: this.startFontsPreviews,
      newPalettePreview: this.newPalettePreview,
      saveFont: this.saveFont,
      saveIdentity: this.saveIdentity,
      createDesign: this.createDesign,
      backToTemplates: this.backToTemplates,
      openTemplate: this.openTemplate,
      backToSection: this.backToSection,
      downloadFont: this.downloadFont,
      useTemplate: this.useTemplate
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
      identityPatternParamsProgress,
      identityFontsProgress,
      flexibleCanvasSize
    } = this.state
    if (view === 'login') {
      return (
        <div className="App">
          <Login />
        </div>
      )
    } else if (view === 'onboarding') {
      return <P_Onboarding onboardingStep={onboardingStep} actions={actions} />
    } else if (view === 'identity-creation') {
      return (
        <P_IdentityCreation
          identityCreationStep={identityCreationStep}
          identityCreationScreens={identityCreationScreens}
          charityData={charityData}
          actions={actions}
          identityColorsProgress={identityColorsProgress}
          identityPatternParamsProgress={identityPatternParamsProgress}
          identityFontsProgress={identityFontsProgress}
        />
      )
    } else if (view === 'design-creation') {
      return (
        <P_DesignCreation
          actions={actions}
          charityData={charityData}
          templates={templates}
        />
      )
    } else if (view === 'feed') {
      return (
        <div className="App">
          <P_Feed
            actions={actions}
            templates={templates}
            charityData={charityData}
          />
        </div>
      )
    }
  }
}

// реакт контейнер содержит весь стейт почитать
