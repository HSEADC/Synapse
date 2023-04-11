import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class M_ChooseButtonSet extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleChange = e => {
    const { param, handleChange, firstChecked } = this.props
    handleChange(param, e.target.value)
  }

  render() {
    const { firstText, firstChecked, secondText, secondChecked } = this.props

    return (
      <div className="M_ChooseButtonSet">
        <label className={`${firstChecked ? 'checked' : ''}`}>
          <input
            className="A_ChooseButton"
            type="radio"
            value={firstText}
            checked={firstChecked}
            onChange={this.handleChange}
          />
          {firstText}
        </label>
        <label className={`${secondChecked ? 'checked' : ''}`}>
          <input
            className="A_ChooseButton"
            type="radio"
            value={secondText}
            checked={secondChecked}
            onChange={this.handleChange}
          />
          {secondText}
        </label>
      </div>
    )
  }
}
