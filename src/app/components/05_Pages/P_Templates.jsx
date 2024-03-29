import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_DropdownButton from '../01_Atoms/A_Dropdownbutton'
import M_FeedSection from '../02_Molecules/M_FeedSection'
import A_FooterLogo from '../01_Atoms/A_FooterLogo'
import O_Template from '../03_Organisms/O_Template'
import A_Error from '../01_Atoms/A_Error'
import {
  templatesList,
  setFlexibleCanvasSize
} from '../../../libraries/templates'
import { doesFontExist } from '../../../plugin/utilities'
import S_FixedActions from '../04_Superorganisms/S_FixedActions'
import M_TemplateInfo from '../02_Molecules/M_TemplateInfo'

export default class P_Templates extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      flexibleCanvasSize: {
        width: undefined,
        height: undefined
      }
    }
  }

  renderTemplates(section) {
    const { actions, charityData, editorState } = this.props

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
    Object.keys(templatesListForSection).forEach(function (key, index) {
      templatesToRender.push(
        <O_Template
          templateID={key}
          key={key}
          actions={actions}
          charityData={charityData}
          editorState={editorState}
        />
      )
    })
    return templatesToRender
  }

  setFlexibleCanvasSize = (param, value) => {
    //BUTTON ACTIVATION
    this.setState({
      flexibleCanvasSize: {
        ...this.state.flexibleCanvasSize,
        [`${param}`]: value
      }
    })
    //SIZE UPDATE
    setFlexibleCanvasSize(param, value)
  }

  render() {
    const { actions, templates, charityData, editorState } = this.props
    const {
      feedTab,
      handleChange,
      chooseSection,
      backToTemplates,
      backToSection,
      downloadFont,
      useTemplate,
      useFlexibleTemplate
    } = actions

    if (templates.section === '') {
      return (
        <div className="P_Templates">
          <div className="search">
            <A_TextInput
              placeholder="Найти..."
              handleChange={handleChange}
              value=""
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
                    style={{ cursor: 'pointer' }}
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
    } else if (
      !templates.templateID &&
      templates.section &&
      templates.section !== 'flexible'
    ) {
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
    } else if (templates.section === 'flexible') {
      return (
        <div className="P_Templates">
          <div className="sectionNav">
            <A_Button
              type="icon"
              icon="backBig"
              handleClick={backToTemplates}
            />
            <A_Text text="Гибкий фрейм" type="lead" />
          </div>
          <div className="sizeSettings">
            <A_TextInput
              akzident={true}
              icon="width"
              param="width"
              measurement="px"
              placeholder="Ширина картинки"
              setFlexibleCanvasSize={this.setFlexibleCanvasSize}
              value={this.state.flexibleCanvasSize.width}
            />
            <A_TextInput
              akzident={true}
              icon="height"
              param="height"
              measurement="px"
              placeholder="Высота картинки"
              setFlexibleCanvasSize={this.setFlexibleCanvasSize}
              value={this.state.flexibleCanvasSize.height}
            />
          </div>
          <S_FixedActions
            primButtonText="Использовать шаблон"
            primButtonHandleClick={() => {
              useFlexibleTemplate(
                this.state.flexibleCanvasSize.width,
                this.state.flexibleCanvasSize.height
              )
            }}
            noBorder={true}
            primButtonDisable={true}
            primButtonDisableParam={this.state.flexibleCanvasSize.height}
          />
        </div>
      )
    } else {
      return (
        <div className="P_Templates">
          <div className="sectionNav">
            <A_Button type="icon" icon="backBig" handleClick={backToSection} />
            <A_Text text={templates.templateTitle} type="lead" />
          </div>
          <O_Template
            templateID={templates.templateID}
            actions={actions}
            charityData={charityData}
            fullsize={true}
            editorState={editorState}
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
