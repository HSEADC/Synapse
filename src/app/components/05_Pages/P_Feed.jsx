import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_DropdownButton from '../01_Atoms/A_Dropdownbutton'
import S_Navbar from '../04_Superorganisms/S_Navbar'
import P_Templates from './P_Templates'

export default class P_Feed extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, templates, charityData } = this.props
    const { feedTab, handleChange } = actions

    return (
      <div className="P_Feed">
        <S_Navbar type="main" feedTab={feedTab} templates={templates} />

        {templates.tab === 'Шаблоны' ? (
          <P_Templates
            actions={actions}
            templates={templates}
            charityData={charityData}
          />
        ) : (
          <div>style</div>
        )}
      </div>
    )
  }
}
