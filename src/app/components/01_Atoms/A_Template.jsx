import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_Template extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, charityData, actions, templateID, templateTitle } = this.props
    const { openTemplate } = actions

    const classes = classnames({
      A_Template: true,
      [`${type}`]: true
    })

    return (
      <div
        className={classes}
        onClick={() => {
          openTemplate(templateID, templateTitle)
        }}
      ></div>
    )
  }
}
