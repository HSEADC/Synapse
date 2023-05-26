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

  render() {
    const { editorState, template } = this.props
    const { activeElement } = editorState

    let type

    if (activeElement !== '') {
      type = template.elements[activeElement].type
      console.log('type', type)
    }

    switch (type) {
      case 'img':
        return (
          <div className="M_Toolbar">
            <A_Icon icon={image} />
            <div>
              <A_Button type="toolbar" icon="delete" />
            </div>
          </div>
        )
        break

      case 'text':
        return (
          <div className="M_Toolbar">
            <A_Icon icon={text} />
            <div>
              <A_Button type="toolbar" icon="delete" />
            </div>
          </div>
        )
        break

      case 'pattern':
        return (
          <div className="M_Toolbar">
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
