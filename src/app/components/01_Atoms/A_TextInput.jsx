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

  updateTemplate = e => {
    const { elementToChange, param, updateTemplate } = this.props
    updateTemplate(elementToChange, param, e.target.value)
  }

  setFlexibleCanvasSize = e => {
    const { param, setFlexibleCanvasSize } = this.props
    setFlexibleCanvasSize(param, e.target.value)
  }

  render() {
    const {
      placeholder,
      value,
      updateTemplate,
      setFlexibleCanvasSize,
      akzident,
      icon,
      measurement
    } = this.props

    const classes = classnames({
      A_TextInput: true,
      akzident: akzident,
      icon: icon !== undefined,
      [`${icon}`]: icon,
      measurement: measurement
    })

    return (
      <div className={classes}>
        <input
          type="text"
          name="name"
          placeholder={placeholder}
          value={value}
          onChange={
            updateTemplate
              ? this.updateTemplate
              : setFlexibleCanvasSize
              ? this.setFlexibleCanvasSize
              : this.handleChange
          }
        />
        {measurement && <p className="measurement">{measurement}</p>}
      </div>
    )
  }
}
