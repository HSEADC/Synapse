import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { pickIdentityFont } from '../../../plugin/text'

export default class A_FontPreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { identityFontsProgress } = this.props

    return (
      <div
        className="A_FontPreview"
        style={{ fontFamily: identityFontsProgress }}
      >
        Ally помогает НКО
        <br />
        сэкономить на дизайне
        <br />
        1234567890 рублей!
      </div>
    )
  }
}
