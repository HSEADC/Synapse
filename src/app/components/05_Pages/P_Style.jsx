import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_FooterLogo from '../01_Atoms/A_FooterLogo'

export default class P_Style extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { charityData, actions } = this.props
    const { skipOnboarding } = actions

    return (
      <div className="P_Feed">
        <A_Spacer size={64} />

        <A_Text text="Скачать брендбук" type="lead" />

        <A_Spacer size={24} />
        <A_Text text="Вы можете скачать материалы фирменного стиля (логотип, шрифты, палитру, паттерн и брендбук&nbsp;с правилами) и использовать их для создания дизайна вне плагина. " />
        <A_Spacer size={12} />
        <A_Button type="secondary padding-both" text="Скачать брендбук ->" />
        <A_Spacer size={32} />
        <A_Text text="Также вы можете скопировать код стиля и отправить его другому человеку, чтобы он тоже мог создавать дизайн на основе вашего стиля." />
        <A_Spacer size={12} />
        <A_Button type="secondary padding-both" text="Скопировать код стиля" />
        <A_Spacer size={64} />
        <A_Text text="Изменение стиля" type="lead" />
        <A_Spacer size={24} />
        <A_Button
          type="secondary padding-both"
          text="Изменить стиль"
          handleClick={skipOnboarding}
        />
        <A_Spacer size={12} />
        <A_Button type="secondary padding-both" text="Импортировать стиль" />
        <A_FooterLogo />
      </div>
    )
  }
}
