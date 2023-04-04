import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_DropdownButton from '../01_Atoms/A_Dropdownbutton'
import M_FeedSection from '../02_Molecules/M_FeedSection'
import A_FooterLogo from '../01_Atoms/A_FooterLogo'
import A_Template from '../01_Atoms/A_Template'

export default class P_Templates extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, templates, charityData } = this.props
    const { feedTab, handleChange, chooseSection } = actions

    if (templates.section === '') {
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
          <div className="feedSections">
            <M_FeedSection
              text="Квадратный пост"
              src="square"
              chooseSection={chooseSection}
            />
            <M_FeedSection text="История" src="story" />
            <M_FeedSection text="Круглый аватар" src="avatar" />
            <M_FeedSection text="Бланк А4" src="blank" />
            <M_FeedSection text="Гибкий фрейм" src="flexible" />
          </div>
          <A_FooterLogo />
        </div>
      )
    } else {
      return (
        <div className="P_Templates">
          <div className="sectionNav">
            <A_Button type="icon" icon="backBig" />
            <A_Text text={templates.section} type="lead" />
          </div>
          <div className="templatesWrapper">
            <A_Template type="square" />
            <A_Template type="square" />
            <A_Template type="square" />
            <A_Template type="square" />
          </div>
          <A_FooterLogo />
        </div>
      )
    }
  }
}
