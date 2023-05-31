import React from 'react'
import O_Template from '../03_Organisms/O_Template'
import S_Navbar from '../04_Superorganisms/S_Navbar'
import M_Toolbar from '../02_Molecules/M_Toolbar'
import S_FixedActions from '../04_Superorganisms/S_FixedActions'
import { templatesList } from '../../../libraries/templates'
import { getAllPatternRenders } from '../../../plugin/store'
import M_MenuPopup from '../02_Molecules/M_MenuPopup'

export default class P_DesignCreation extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      activeElement: '',
      templateCopy: '',
      uploadImage: false
    }
  }

  setActiveElement = element => {
    this.setState({ activeElement: element })
    // console.log('setActiveElement', this.state.activeElement)
    // this.forceUpdate()
  }

  copyTemplate = template => {
    this.setState({ templateCopy: template })
    console.log('set copy', this.state.templateCopy)
  }

  updateTemplate = (element, param, value) => {
    let updatedTemplate = { ...this.state.templateCopy }
    updatedTemplate.elements[element][param] = value
    this.setState({
      templateCopy: updatedTemplate
    })
    console.log('new state', this.state)
  }

  removeElement = element => {
    console.log('removeee')
    let updatedTemplate = { ...this.state.templateCopy }
    delete updatedTemplate.elements[element]
    this.setState({
      templateCopy: updatedTemplate,
      activeElement: undefined
    })
  }

  uploadImage = () => {
    console.log('upload')

    this.setState(prevState => ({
      uploadImage: !prevState.uploadImage
    }))

    if (this.state.uploadImage === true) {
      parent.postMessage(
        {
          pluginMessage: {
            type: 'upload-image'
          }
        },
        '*'
      )
    }
  }

  render() {
    const { actions, charityData, templates } = this.props
    const { handleChange, chooseSection, backToSection, createDesign } = actions
    const format = Array.from(templates.templateID)[0]
    const template = templatesList[format][templates.templateID]
    const patternRenders = getAllPatternRenders()

    if (
      this.state.templateCopy === '' ||
      this.state.templateCopy === undefined ||
      !this.state.templateCopy
    ) {
      this.copyTemplate(template)
    }

    const editorState = {
      activeElement: this.state.activeElement,
      templateCopy: this.state.templateCopy
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
            updateTemplate={this.updateTemplate}
            removeElement={this.removeElement}
            uploadImage={this.uploadImage}
          />
        </div>
        <O_Template
          templateID={templates.templateID}
          actions={actions}
          fullsize={true}
          charityData={charityData}
          editorState={editorState}
          setActiveElement={this.setActiveElement}
        />
        <S_FixedActions
          primButtonText="Создать"
          primButtonHandleClick={() =>
            createDesign(template, charityData, patternRenders)
          }
          noBorder={true}
        />
        {this.state.uploadImage && (
          <M_MenuPopup uploadImage={this.uploadImage} />
        )}
      </div>
    )
  }
}
