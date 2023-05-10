import classnames from 'classnames'
import React from 'react'
import A_EditorElement from '../01_Atoms/A_EditorElement'
import { templatesList } from '../../../libraries/templates'

export default class O_Template extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { charityData, templateID } = this.props
    const format = Array.from(templateID)[0]
    const template = templatesList[format][templateID]
  }

  renderElements(template, charityData) {
    // console.log(template)
    let elements = []
    Object.keys(template.elements).forEach(element => {
      // console.log('element', template.elements[element])
      elements.push(
        <A_EditorElement
          {...template.elements[element]}
          charityData={charityData}
        />
      )
    })
    return elements
  }

  render() {
    const { charityData, actions, templateID, fullsize } = this.props
    const { openTemplate } = actions
    const format = Array.from(templateID)[0]
    const template = templatesList[format][templateID]
    const colors = charityData.identityColors

    const classes = classnames({
      O_Template: true,
      [`${format}`]: true,
      fullsize: fullsize
    })

    let background
    switch (template.background) {
      case 'primary':
        background = colors.primary
        break

      case 'background':
        background = colors.background
        break

      case 'adOne':
        background = colors.adOne
        break

      case 'adTwo':
        background = colors.adTwo
        break

      case 'text':
        background = colors.text
        break
    }

    if (fullsize) {
      return (
        <div className="template_wrapper">
          <div
            className={classes}
            style={{
              backgroundColor: `rgba(${background.r * 255}, ${background.g *
                255}, ${background.b * 255}, 1)`
            }}
          >
            {this.renderElements(template, charityData)}
          </div>
        </div>
      )
    } else {
      return (
        <div
          className={classes}
          onClick={() => {
            openTemplate(templateID, template.title)
          }}
          style={{
            backgroundColor: `rgba(${background.r * 255}, ${background.g *
              255}, ${background.b * 255}, 1)`
          }}
        >
          {this.renderElements(template, charityData)}
        </div>
      )
    }
  }
}