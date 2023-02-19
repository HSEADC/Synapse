import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react'

import { Templates } from './components/05_Pages/P_Templates'
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
      identityCreationStep: 1,
      charityTitle: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
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

  setToStorage = id => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'set-storage',
          id: id
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

  createDesign = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'create-frame'
        }
      },
      '*'
    )
  }

  generateIdentity = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'generate-identity'
        }
      },
      '*'
    )
  }

  nextStep = () => {
    this.setState(prevState => {
      const onboardingStep = prevState.onboardingStep + 1
      return { ...prevState, onboardingStep }
    })
  }

  prevStep = () => {
    this.setState(prevState => {
      const onboardingStep = prevState.onboardingStep - 1
      return { ...prevState, onboardingStep }
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
      prevStep: this.prevStep
    }

    const charityData = {
      charityTitle: this.state.charityTitle
    }

    const { view, onboardingStep, identityCreationStep } = this.state
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
          charityData={charityData}
          actions={actions}
        />
      )
    } else {
      return (
        <div className="App">
          <Templates />
        </div>
      )
    }
  }
}

// реакт контейнер содержит весь стейт почитать
