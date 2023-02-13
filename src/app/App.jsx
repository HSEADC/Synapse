import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react'

import { Templates } from './components/04_Superorganisms/Templates'
import { Style } from './components/04_Superorganisms/Style'
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
  constructor(params) {
    super(params)

    this.state = {
      view: 'style'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleChange(e) {
    this.setState({ inputText: e.target.value })
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

  openPage = id => {
    this.setState({
      page: 'index'
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

  render() {
    const { view } = this.state
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
      return (
        <div className="App">
          <Onboarding />
        </div>
      )
    } else if (view === 'identity_creation') {
      return (
        <div className="App">
          <IdentityCreation />
        </div>
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
