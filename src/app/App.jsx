import * as React from 'react'
import * as ReactDOM from 'react-dom'

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

    this.state = {}
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
    console.log('hi')
  }

  render() {
    return (
      <button id="create-design" onClick={this.createDesign}>
        Create Design
      </button>
    )
  }
}
