import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_RadioButton from '../01_Atoms/A_RadioButton'

export default class M_TemplateInfo extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { sizes } = this.props

    const classes = classnames({
      M_TemplateInfo: true
    })

    return (
      <div className={classes}>
        Размер{' '}
        <span>
          {sizes[0]} × {sizes[1]} px
        </span>
      </div>
    )
  }
}
