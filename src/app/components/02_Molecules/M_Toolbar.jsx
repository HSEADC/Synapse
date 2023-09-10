import React from 'react'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_Divider from '../01_Atoms/A_Divider'
import A_Button from '../01_Atoms/A_Button'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_Icon from '../01_Atoms/A_Icon'
import text from '../../assets/images/icons/text.svg'
import image from '../../assets/images/icons/image.svg'
import resize from '../../assets/images/icons/resize.svg'
import pattern from '../../assets/images/icons/pattern.svg'
import settings from '../../assets/images/icons/settings.svg'
import add from '../../assets/images/icons/add.svg'
import { Tooltip } from 'react-tooltip'

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
    // let flexible = editorState.templateCopy.id == 'X1'
    let flexible = true

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

          case 'resize':
            return (
              <div className="M_Toolbar active">
                <A_Button
                  type="toolbar"
                  icon="back"
                  handleClick={() => this.setState({ tab: undefined })}
                />
                <div>
                  <A_TextInput
                    placeholder="Ширина"
                    handleChange={handleChange}
                    value={editorState.templateCopy.width}
                    param="text"
                    updateTemplate={updateTemplate}
                    measurement="px"
                  />
                  <A_TextInput
                    placeholder="Высота"
                    handleChange={handleChange}
                    value={editorState.templateCopy.height}
                    param="text"
                    updateTemplate={updateTemplate}
                    measurement="px"
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
                  <div
                    data-tooltip-id="img"
                    data-tooltip-content="Добавить изображение"
                    data-tooltip-place="top"
                  >
                    <A_Button
                      type="toolbar"
                      icon="image"
                      handleClick={() => addElement('img')}
                    />
                  </div>
                  <div
                    data-tooltip-id="text"
                    data-tooltip-content="Добавить текст"
                    data-tooltip-place="top"
                  >
                    <A_Button
                      type="toolbar"
                      icon="text"
                      handleClick={() => addElement('text')}
                    />
                  </div>
                  <div
                    data-tooltip-id="logo"
                    data-tooltip-content="Добавить логотип"
                    data-tooltip-place="top"
                  >
                    <A_Button
                      type="toolbar"
                      icon="logo"
                      handleClick={() => addElement('logo')}
                    />
                  </div>
                  <div
                    data-tooltip-id="pattern"
                    data-tooltip-content="Добавить паттерн"
                    data-tooltip-place="top"
                  >
                    <A_Button
                      type="toolbar"
                      icon="pattern"
                      handleClick={() => addElement('pattern')}
                    />
                  </div>
                </div>
                <div>
                  <A_Icon icon={settings} />
                  <div
                    data-tooltip-id="color"
                    data-tooltip-content="Изменить цвет"
                    data-tooltip-place="top"
                  >
                    <A_Button
                      type="toolbar"
                      icon="color"
                      handleClick={() => this.setState({ tab: 'color' })}
                    />
                  </div>
                  {flexible && (
                    <div
                      data-tooltip-id="resize"
                      data-tooltip-content="Изменить размер холста"
                      data-tooltip-place="top"
                    >
                      <A_Button
                        type="toolbar"
                        icon="resize"
                        handleClick={() => this.setState({ tab: 'resize' })}
                      />
                    </div>
                  )}
                  <Tooltip id="img" className="A_Tooltip" />
                  <Tooltip id="text" className="A_Tooltip" />
                  <Tooltip id="pattern" className="A_Tooltip" />
                  <Tooltip id="logo" className="A_Tooltip" />
                  <Tooltip id="color" className="A_Tooltip" />
                  <Tooltip id="resize" className="A_Tooltip" />
                </div>
              </div>
            )

            break
        }
        break
    }
  }
}
