import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_TextInput extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, placeholder, value } = this.props

    const classes = classnames({
      A_TextInput: true,
      [`${type}`]: true
    })

    return (
      <div className="A_TextInput">
        <input type="text" name="name" placeholder={placeholder} />
      </div>
    )
  }
}
