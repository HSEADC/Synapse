import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_DropdownButton from '../01_Atoms/A_Dropdownbutton'
import M_FeedSection from '../02_Molecules/M_FeedSection'
import A_FooterLogo from '../01_Atoms/A_FooterLogo'
import A_Template from '../01_Atoms/A_Template'
import A_Error from '../01_Atoms/A_Error'
import { templatesList } from '../../../libraries/templates'
import { doesFontExist } from '../../../plugin/utilities'
import S_FixedActions from '../04_Superorganisms/S_FixedActions'
import M_TemplateInfo from '../02_Molecules/M_TemplateInfo'

export default class P_Templates extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  renderTemplates(section) {
    const { actions, charityData } = this.props

    switch (section) {
      case 'square':
        section = 'A'
        break

      case 'story':
        section = 'B'
        break

      case 'avatar':
        section = 'C'
        break

      case 'squareAvatar':
        section = 'D'
        break

      case 'highlights':
        section = 'E'
        break

      case 'twitterCover':
        section = 'F'
        break

      case 'vkCover':
        section = 'G'
        break

      case 'facebookCover':
        section = 'H'
        break

      case 'businessCard':
        section = 'I'
        break

      case 'blank':
        section = 'J'
        break
    }

    let templatesListForSection = templatesList[section]
    let templatesToRender = []
    Object.keys(templatesListForSection).forEach(function(key, index) {
      templatesToRender.push(
        <A_Template
          templateID={key}
          key={key}
          actions={actions}
          charityData={charityData}
        />
      )
    })
    return templatesToRender
  }

  render() {
    const { actions, templates, charityData } = this.props
    const {
      feedTab,
      handleChange,
      chooseSection,
      backToTemplates,
      backToSection,
      downloadFont,
      useTemplate
    } = actions

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
            {!doesFontExist(charityData.identityFonts) && (
              <A_Error
                text={[
                  'Похоже, у вас не установлен фирменный шрифт. Не волнуйстесь, все хорошо. ',
                  <a
                    className="hyperlink"
                    onClick={() => {
                      downloadFont(charityData.identityFonts)
                    }}
                  >
                    Установите
                  </a>,
                  ' его и перезапустите Figma.'
                ]}
              />
            )}

            <M_FeedSection
              text="Квадратный пост"
              src="square"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="История"
              src="story"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="Круглый аватар"
              src="avatar"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="Квадратный аватар"
              src="squareAvatar"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="Обложка хайлайтс"
              src="highlights"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="Шапка Facebook"
              src="facebookCover"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="Шапка Twitter"
              src="twitterCover"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="Шапка VK"
              src="vkCover"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="Визитка"
              src="businessCard"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="Бланк А4"
              src="blank"
              chooseSection={chooseSection}
            />
            <M_FeedSection
              text="Гибкий фрейм"
              src="flexible"
              chooseSection={chooseSection}
            />
          </div>
          <A_FooterLogo />
        </div>
      )
    } else if (!templates.templateID && templates.section) {
      return (
        <div className="P_Templates">
          <div className="sectionNav">
            <A_Button
              type="icon"
              icon="backBig"
              handleClick={backToTemplates}
            />
            <A_Text text={templates.sectionTitle} type="lead" />
          </div>
          <div className="templatesWrapper">
            {this.renderTemplates(templates.section)}
          </div>
          <A_FooterLogo />
        </div>
      )
    } else {
      return (
        <div className="P_Templates">
          <div className="sectionNav">
            <A_Button type="icon" icon="backBig" handleClick={backToSection} />
            <A_Text text={templates.templateTitle} type="lead" />
          </div>
          <A_Template
            templateID={templates.templateID}
            actions={actions}
            charityData={charityData}
            fullsize={true}
          />
          <M_TemplateInfo
            sizes={[
              templatesList[Array.from(templates.templateID)[0]][
                templates.templateID
              ].height,
              templatesList[Array.from(templates.templateID)[0]][
                templates.templateID
              ].width
            ]}
          />
          <S_FixedActions
            primButtonText="Использовать шаблон"
            primButtonHandleClick={useTemplate}
            noBorder={true}
          />
        </div>
      )
    }
  }
}
