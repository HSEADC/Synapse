import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
// import { createScientificPalette } from '../../../plugin/color'

export default class A_PalettePreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, icon, text, handleClick, disable, disableParam } = this.props

    // palette = createScientificPalette()

    console.log(palette)

    return <div className="A_PalettePreview"></div>
  }
}
