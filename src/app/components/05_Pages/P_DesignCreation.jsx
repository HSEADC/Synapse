import React from 'react'
import O_Template from '../03_Organisms/O_Template'
import S_Navbar from '../04_Superorganisms/S_Navbar'
import M_Toolbar from '../02_Molecules/M_Toolbar'
import S_FixedActions from '../04_Superorganisms/S_FixedActions'
import { templatesList } from '../../../libraries/templates'
import { getAllPatternRenders } from '../../../plugin/store'

export default class P_DesignCreation extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      activeElement: '',
      template: ''
    }
  }

  setActiveElement = element => {
    this.setState({ activeElement: element })
    // console.log('setActiveElement', this.state.activeElement)
    this.forceUpdate()
  }

  copyTemplate = template => {
    this.setState({ template: template })
  }

  render() {
    const { actions, charityData, templates } = this.props
    const { handleChange, chooseSection, backToSection, createDesign } = actions
    const format = Array.from(templates.templateID)[0]
    const template = templatesList[format][templates.templateID]
    const patternRenders = getAllPatternRenders()

    this.copyTemplate(template)

    const editorState = {
      activeElement: this.state.activeElement,
      templateCopy: this.state.template
    }

    return (
      <div className="P_DesignCreation">
        <S_Navbar
          text="Создание дизайна"
          backToFeed={true}
          backToSection={backToSection}
        />
        <div className="sectionNav">
          <M_Toolbar
            editorState={editorState}
            template={template}
            actions={actions}
          />
        </div>
        <O_Template
          templateID={templates.templateID}
          actions={actions}
          fullsize={true}
          charityData={charityData}
          editorState={editorState}
          setActiveElement={this.setActiveElement}
          // onClick={() => {this.setActiveElement('')}}
        />
        <S_FixedActions
          primButtonText="Создать"
          primButtonHandleClick={() =>
            createDesign(template, charityData, patternRenders)
          }
          noBorder={true}
        />
      </div>
    )
  }
}
