import React from 'react'
import O_Template from '../03_Organisms/O_Template'
import S_Navbar from '../04_Superorganisms/S_Navbar'
import M_Toolbar from '../02_Molecules/M_Toolbar'
import S_FixedActions from '../04_Superorganisms/S_FixedActions'
import { templatesList } from '../../../libraries/templates'
import { getAllPatternRenders } from '../../../plugin/store'
import M_MenuPopup from '../02_Molecules/M_MenuPopup'
import { compareObjects } from '../../../plugin/utilities'

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
  }

  copyTemplate = originalTemplate => {
    const copy = JSON.parse(JSON.stringify(originalTemplate))
    this.setState({ templateCopy: { ...copy, copied: true } })
  }

  updateTemplate = (element, param, value) => {
    let updatedTemplate = { ...this.state.templateCopy }
    updatedTemplate.elements[element][param] = value
    this.setState({
      templateCopy: updatedTemplate
    })
  }

  updateBackground = color => {
    let updatedTemplate = { ...this.state.templateCopy }
    updatedTemplate.background = color
    this.setState({
      templateCopy: updatedTemplate
    })
  }

  removeElement = element => {
    let updatedTemplate = { ...this.state.templateCopy }
    delete updatedTemplate.elements[element]
    this.setState({
      templateCopy: updatedTemplate,
      activeElement: undefined
    })
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessage.bind(this), false)
  }

  handleMessage(e) {
    const msg = e.data.pluginMessage
    // console.log('before', msg);
    if (msg.type !== 'replace-image') return
    if (msg.activeElement) {
      const bytes = 'data:image/png;base64,' + msg.bytes
      this.updateTemplate(msg.activeElement, 'cover', bytes)
      this.uploadImage()
    }
  }

  componentDidUpdate() {
    const { activeElement } = this.state
    if (this.state.uploadImage === true) {
      // console.log('activeElement to send', activeElement);
      parent.postMessage(
        {
          pluginMessage: {
            type: 'upload-image',
            activeElement: activeElement
          }
        },
        '*'
      )
    }
  }

  uploadImage = () => {
    this.setState(prevState => ({
      uploadImage: !prevState.uploadImage
    }))
  }

  render() {
    const { actions, charityData, templates } = this.props
    const { handleChange, chooseSection, backToSection, createDesign } = actions
    const format = Array.from(templates.templateID)[0]
    console.log('templates.templateID', templates.templateID, 'format', format)
    const originalTemplate = templatesList[format][templates.templateID]
    const patternRenders = getAllPatternRenders()

    if (
      this.state.templateCopy === '' ||
      this.state.templateCopy === undefined ||
      !this.state.templateCopy
    ) {
      this.copyTemplate(originalTemplate)
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
            // template={this.state.templateCopy}
            actions={actions}
            updateTemplate={this.updateTemplate}
            removeElement={this.removeElement}
            uploadImage={this.uploadImage}
            charityData={charityData}
            updateBackground={this.updateBackground}
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
            createDesign(this.state.templateCopy, charityData, patternRenders)
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
