import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as styles from './assets/stylesheets/App.scss'
// import "./assets/fonts/st.sign/st.sign.ttf";
// import "./assets/fonts/miedinger/miedinger.otf";
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

ReactDOM.render(<App {...props} />, document.getElementById('react-page'))
