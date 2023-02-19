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

  render() {
    const { type, placeholder, value, handleChange } = this.props

    return (
      <div className="A_TextInput">
        <input
          type="text"
          name="name"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    )
  }
}
