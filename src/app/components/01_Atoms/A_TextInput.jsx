import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_TextInput extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleChange = e => {
    const { param, handleChange } = this.props
    handleChange(param, e.target.value)
  }

  render() {
    const { placeholder, defaultValue } = this.props

    return (
      <div className="A_TextInput">
        <input
          type="text"
          name="name"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onInput={this.handleChange}
        />
      </div>
    )
  }
}
