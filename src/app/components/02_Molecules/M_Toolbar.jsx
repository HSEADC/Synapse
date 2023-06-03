import React from 'react'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_Divider from '../01_Atoms/A_Divider'
import A_Button from '../01_Atoms/A_Button'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_Icon from '../01_Atoms/A_Icon'
import text from '../../assets/images/icons/text.svg'
import image from '../../assets/images/icons/image.svg'
import pattern from '../../assets/images/icons/pattern.svg'

export default class M_Toolbar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('prevProps, prevState', prevProps, prevState);
  //   const { editorState } = this.props
  //   const { activeElement } = editorState
  //   if ( prevProps.editorState.activeElement !== activeElement) {
  //     this.forceUpdate()
  //     // console.log('force!!!!!');
  //   }
  // }

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
      uploadImage
    } = this.props
    const { activeElement } = editorState
    const { handleChange } = actions

    let type

    if (
      activeElement !== '' &&
      activeElement !== null &&
      activeElement !== undefined
    ) {
      type = template.elements[editorState.activeElement].type
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
                value={template.elements[activeElement].text}
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
        return (
          <div className="M_Toolbar">
            <A_Button type="toolbar" icon="add" />
            <div>
              <A_Button type="toolbar" icon="image" />
              <A_Button type="toolbar" icon="text" />
              <A_Button type="toolbar" icon="logo" />
              <A_Button type="toolbar" icon="pattern" />
            </div>
          </div>
        )
        break
    }
  }
}
