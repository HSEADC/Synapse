import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_RadioButton extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleChange = e => {
    const { param, handleChange } = this.props
    handleChange(param, e.target.value)
  }

  render() {
    const { text, checked } = this.props

    const classes = classnames({
      A_RadioButton: true,
      checked: checked
    })

    return (
      <div className={classes}>
        <label>
          <input
            type="radio"
            value={text}
            checked={checked}
            onChange={this.handleChange}
          />
          {text}
        </label>
      </div>
    )
  }
}
