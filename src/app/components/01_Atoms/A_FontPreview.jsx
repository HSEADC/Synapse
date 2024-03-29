import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { pickIdentityFont } from '../../../plugin/text'

export default class A_FontPreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { identityFontsProgress, saveFont, checked } = this.props

    let fontFamily = "'" + identityFontsProgress + "'"

    const classes = classnames({
      A_FontPreview: true,
      checked: checked
    })

    return (
      <div
        className={classes}
        style={{ fontFamily: fontFamily }}
        onClick={() => saveFont(identityFontsProgress)}
      >
        <p>{identityFontsProgress}</p>
        <p>
          Ally помогает НКО
          <br />
          сэкономить на дизайне
          <br />
          1234567890 рублей!
        </p>
      </div>
    )
  }
}
