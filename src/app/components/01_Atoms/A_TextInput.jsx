import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_TextInput extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  inputChangedHandler = event => {
    const updatedKeyword = event.target.value
    // May be call for search result
  }

  //написать локальную функцию хендлчендж и из нее передавать параметр и велью

  handleChange = e => {
    const { param, handleChange } = this.props
    handleChange(param, e.target.value)
  }

  render() {
    const { type, placeholder, value } = this.props

    return (
      <div className="A_TextInput">
        <input
          type="text"
          name="name"
          placeholder={placeholder}
          value={value}
          onInput={this.handleChange}
        />
      </div>
    )
  }
}
