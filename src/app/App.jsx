import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react'

import P_Feed from './components/05_Pages/P_Feed'
import { Style } from './components/05_Pages/P_Style'
import P_IdentityCreation from './components/05_Pages/P_Identity_Creation'
import P_Onboarding from './components/05_Pages/P_Onboarding'

import { getRandom } from '../plugin/utilities'

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
      identityCreationStep: 3,
      charityTitle: '',
      charityCategory: 'Здравоохранение',
      friendliness: 'Серьезный',
      volume: 'Громкий',
      rationality: 'Эмоциональный',
      identityColors: '',
      identityFonts: '',
      identityPattern: '',
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
      identityPattern
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
          identityPattern: identityPattern
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

  savePalette = palette => {
    // let key = ''
    // console.log(palette);
    // for (let i = 1; i < 6; i++) {
    //   switch (i) {
    //     case 1:
    //       key = 'background'
    //       break
    //     case 2:
    //       key = 'adOne'
    //       break
    //     case 3:
    //       key = 'primary'
    //       break
    //     case 4:
    //       key = 'adTwo'
    //       break
    //     case 5:
    //       key = 'text'
    //       break
    //   }
    //   this.setState({ identityColors: {
    //     text: palette.text
    //   }})
    //   // console.log(key, this.state.identityColors.text);
    // }
  }

  savePattern = pattern => {
    this.setState({ identityPattern: pattern })
  }

  nextStep = () => {
    this.setState(prevState => {
      const onboardingStep = prevState.onboardingStep + 1
      return { ...prevState, onboardingStep }
    })
  }

  nextStepIdentity = () => {
    console.log('next')
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
      savePattern: this.savePattern
    }

    const charityData = {
      charityTitle: this.state.charityTitle,
      charityCategory: this.state.charityCategory,
      friendliness: this.state.friendliness,
      volume: this.state.volume,
      rationality: this.state.rationality,
      identityColors: this.state.identityColors,
      identityFonts: this.state.identityFonts,
      identityPattern: this.identityPattern
    }

    const {
      view,
      onboardingStep,
      identityCreationStep,
      identityCreationScreens,
      templates,
      fonts
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
