import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_Button from '../01_Atoms/A_Button'

export default class S_Navbar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { back, progressBar, text, type, handleClick } = this.props

    const classes = classnames({
      S_Navbar: true,
      [`${type}`]: true
    })

    return (
      <div className={classes}>
        {back && <A_Button text="back" />}
        {text}
      </div>
    )
  }
}
