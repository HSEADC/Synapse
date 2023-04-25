import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import error from '../../assets/images/icons/error.svg'

export default class A_Error extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, href } = this.props

    const classes = classnames({
      A_Error: true
    })

    return (
      <div className={classes}>
        <img src={error} />
        <p>{text}</p>
      </div>
    )
  }
}
