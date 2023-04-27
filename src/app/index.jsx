import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as styles from './assets/stylesheets/App.scss'
import App from './App'

const props = {
  charityAxes: {
    friendliness: {
      serious: '',
      friendly: ''
    },
    volume: {
      quiet: '',
      loud: ''
    },
    rationslity: {
      rational: '',
      emotional: ''
    }
  }
}

window.onmessage = async event => {
  if (event.data.pluginMessage.type === 'get-storage') {
    let charityData

    charityData = JSON.stringify(event.data.pluginMessage.charityData)

    const reactWrapper = document.getElementById('react-page')
    reactWrapper.setAttribute('charityData', charityData)

    ReactDOM.render(
      <App charityData={charityData} {...props} />,
      document.getElementById('react-page')
    )
  }
}

document.body.classList.add('loading')

parent.postMessage(
  {
    pluginMessage: {
      type: 'get-storage'
    }
  },
  '*'
)
