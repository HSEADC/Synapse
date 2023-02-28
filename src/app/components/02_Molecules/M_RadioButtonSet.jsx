import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_RadioButton from '../01_Atoms/A_RadioButton'

export default class M_RadioButtonSet extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, text } = this.props

    const classes = classnames({
      A_RadioButton: true,
      [`${type}`]: true
    })

    return (
      <div className={classes}>
        <input type="radio" value={text} />
        {text}
      </div>
    )
  }
}
