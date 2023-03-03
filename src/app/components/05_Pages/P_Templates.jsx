import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_DropdownButton from '../01_Atoms/A_Dropdownbutton'

export default class P_Templates extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, templates } = this.props
    const { feedTab, handleChange } = actions

    return (
      <div className="P_Templates">
        <div className="search">
          <A_TextInput
            placeholder="Найти..."
            handleChange={handleChange}
            defaultValue=""
            param="search"
          />
          <A_Spacer size={24} />
          <A_Text type="additional" text="Категория" />
          <A_DropdownButton text="Категория" />
        </div>
      </div>
    )
  }
}
