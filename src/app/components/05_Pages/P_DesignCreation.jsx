import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_DropdownButton from '../01_Atoms/A_Dropdownbutton'
import M_FeedSection from '../02_Molecules/M_FeedSection'
import A_FooterLogo from '../01_Atoms/A_FooterLogo'
import A_Template from '../01_Atoms/A_Template'
import S_Navbar from '../04_Superorganisms/S_Navbar'
import M_Toolbar from '../02_Molecules/M_Toolbar'
import S_FixedActions from '../04_Superorganisms/S_FixedActions'

export default class P_DesignCreation extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, charityData, templates } = this.props
    const { handleChange, chooseSection, backToSection } = actions

    return (
      <div className="P_DesignCreation">
        <S_Navbar
          text="Создание дизайна"
          backToFeed={true}
          backToSection={backToSection}
        />
        <div className="sectionNav">
          <M_Toolbar />
        </div>
        <A_Template
          templateID={templates.templateID}
          actions={actions}
          fullsize={true}
        />
        <S_FixedActions primButtonText="Создать" noBorder={true} />
      </div>
    )
  }
}
