import React from 'react'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_Divider from '../01_Atoms/A_Divider'
import A_Button from '../01_Atoms/A_Button'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_Icon from '../01_Atoms/A_Icon'
import text from '../../assets/images/icons/text.svg'
import image from '../../assets/images/icons/image.svg'
import pattern from '../../assets/images/icons/pattern.svg'
import settings from '../../assets/images/icons/settings.svg'
import add from '../../assets/images/icons/add.svg'

export default class M_Toolbar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      tab: undefined
    }
  }

  removeElement = () => {
    const { editorState, removeElement } = this.props
    const { activeElement } = editorState
    removeElement(activeElement)
  }

  render() {
    const {
      editorState,
      template,
      actions,
      updateTemplate,
      removeElement,
      uploadImage,
      charityData,
      updateBackground,
      addElement
    } = this.props
    const { activeElement } = editorState
    const { handleChange } = actions

    let type
    let flexible = false

    if (
      activeElement !== '' &&
      activeElement !== null &&
      activeElement !== undefined
    ) {
      type = editorState.templateCopy.elements[editorState.activeElement].type
    }

    switch (type) {
      case 'img':
        return (
          <div className="M_Toolbar active">
            <A_Icon icon={image} />
            <div>
              <A_Button
                type="default"
                text="Загрузить изображение"
                handleClick={uploadImage}
              />

              <A_Button
                type="toolbar"
                icon="delete"
                handleClick={this.removeElement}
              />
            </div>
          </div>
        )
        break

      case 'text':
        return (
          <div className="M_Toolbar active">
            <A_Icon icon={text} />
            <div>
              <A_TextInput
                placeholder="Введите текст"
                handleChange={handleChange}
                value={editorState.templateCopy.elements[activeElement].text}
                param="text"
                updateTemplate={updateTemplate}
                elementToChange={activeElement}
              />
              <A_Button
                type="toolbar"
                icon="delete"
                handleClick={this.removeElement}
              />
            </div>
          </div>
        )
        break

      case 'pattern':
        return (
          <div className="M_Toolbar active">
            <A_Icon icon={pattern} />
            <div>
              <A_Button type="toolbar" icon="delete" />
            </div>
          </div>
        )
        break

      default:
        switch (this.state.tab) {
          case 'color':
            return (
              <div className="M_Toolbar">
                <A_Button
                  type="toolbar"
                  icon="back"
                  handleClick={() => this.setState({ tab: undefined })}
                />
                <div>
                  <A_Button
                    type="color"
                    color={charityData.identityColors.primary}
                    handleClick={() => {
                      updateBackground('primary')
                    }}
                  />
                  <A_Button
                    type="color"
                    color={charityData.identityColors.background}
                    handleClick={() => {
                      updateBackground('background')
                    }}
                  />
                  <A_Button
                    type="color"
                    color={charityData.identityColors.adTwo}
                    handleClick={() => {
                      updateBackground('adTwo')
                    }}
                  />
                  <A_Button
                    type="color"
                    color={charityData.identityColors.adOne}
                    handleClick={() => {
                      updateBackground('adOne')
                    }}
                  />
                  <A_Button
                    type="color"
                    color={charityData.identityColors.text}
                    handleClick={() => {
                      updateBackground('text')
                    }}
                  />
                </div>
              </div>
            )
            break

          default:
            return (
              <div className="M_Toolbar">
                <div>
                  <A_Icon icon={add} />
                  <A_Button type="toolbar" icon="image" />
                  <A_Button
                    type="toolbar"
                    icon="text"
                    handleClick={() => addElement('text')}
                  />
                  <A_Button type="toolbar" icon="logo" />
                  <A_Button type="toolbar" icon="pattern" />
                </div>
                <div>
                  <A_Icon icon={settings} />
                  <A_Button
                    type="toolbar"
                    icon="color"
                    handleClick={() => this.setState({ tab: 'color' })}
                  />
                  {flexible && <A_Button type="toolbar" icon="resize" />}
                </div>
              </div>
            )

            break
        }
        break
    }
  }
}
