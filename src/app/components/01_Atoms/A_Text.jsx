import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_Text extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  createMarkup = text => {
    return { __html: text }
  }

  render() {
    const { type, text, fontFamily, margin } = this.props

    const classes = classnames({
      A_Text: true,
      [`${type}`]: true,
      [`${margin}`]: true
    })

    return (
      <div
        className={classes}
        style={{ fontFamily: fontFamily }}
        dangerouslySetInnerHTML={this.createMarkup(text)}
      />
    )
  }
}
