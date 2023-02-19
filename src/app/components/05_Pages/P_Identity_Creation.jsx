import React from 'react'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_Text from '../01_Atoms/A_Text'
import A_TextInput from '../01_Atoms/A_TextInput'
import S_FixedActions from '../04_Superorganisms/S_FixedActions'
import S_Navbar from '../04_Superorganisms/S_Navbar'

export default class P_Identity_Creation extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { identityCreationStep, actions } = this.props
    const { charityData } = this.props
    const { charityTitle } = charityData
    const { handleChange } = actions

    if (identityCreationStep === 1) {
      return (
        <div className="P_IdentityCreation">
          <S_Navbar
            text="Настройка фирменного стиля"
            back={false}
            currentStep={1}
            totalSteps={5}
          />
          <A_Spacer size={74} />
          <div className="blue_lead">
            <A_Text
              type="lead2"
              text="Прежде чем мы начнем, позвольте лучше узнать вашу организацию — так дизайн будет лучше отражать ваши ценности."
            />
          </div>
          <A_Spacer size={32} />
          <A_Text text="Как называется ваша организация? Эта фраза будет использоваться в логотипе." />
          <A_Spacer size={16} />
          <A_TextInput
            placeholder="Введите название"
            value={charityTitle}
            handleChange={handleChange}
          />
          <S_FixedActions primButtonText="Продолжить" />
        </div>
      )
    } else {
    }
  }
}
