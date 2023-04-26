import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { templatesList } from '../../../libraries/templates'

export default class A_Template extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { charityData, actions, templateID, fullsize } = this.props
    const { openTemplate } = actions
    const format = Array.from(templateID)[0]
    const template = templatesList[format][templateID]

    const classes = classnames({
      A_Template: true,
      [`${format}`]: true,
      fullsize: fullsize
    })

    if (fullsize) {
      return (
        <div className="template_wrapper">
          <div className={classes}>{templateID}</div>
        </div>
      )
    } else {
      return (
        <div
          className={classes}
          onClick={() => {
            openTemplate(templateID, template.title)
          }}
        >
          {templateID}
        </div>
      )
    }
  }
}
