import React from 'react'
import A_RadioButton from '../01_Atoms/A_RadioButton'
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
    const {
      identityCreationStep,
      actions,
      identityCreationScreens
    } = this.props
    const { charityData } = this.props
    const { charityTitle, charityCategory } = charityData
    const { handleChange, nextStepIdentity, prevStepIdentity } = actions

    if (identityCreationStep === 1) {
      // handleChange
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
            handleChange={handleChange}
            defaultValue={charityTitle}
            primButtonHandleClick={nextStepIdentity}
            param="charityTitle"
          />
          <S_FixedActions
            primButtonText="Продолжить"
            primButtonHandleClick={nextStepIdentity}
            primButtonDisable={true}
            primButtonDisableParam={charityTitle}
          />
        </div>
      )
    } else if (identityCreationStep === 2) {
      return (
        <div className="P_IdentityCreation">
          <S_Navbar
            text="Настройка фирменного стиля"
            back={false}
            currentStep={2}
            totalSteps={5}
          />
          <A_Spacer size={74} />
          <div className="outlined_lead">
            <A_Text text="Какими вопросами занимается ваша организация?" />
            <A_RadioButton
              text="Здравоохранение"
              param="charityCategory"
              handleChange={handleChange}
              checked={charityCategory == 'Здравоохранение'}
            />
            <A_RadioButton
              text="Социальные проблемы"
              param="charityCategory"
              handleChange={handleChange}
              checked={charityCategory == 'Социальные проблемы'}
            />
            <A_RadioButton
              text="Защита природы и животных"
              param="charityCategory"
              handleChange={handleChange}
              checked={charityCategory == 'Защита природы и животных'}
            />
            <A_RadioButton
              text="Культура и образование"
              param="charityCategory"
              handleChange={handleChange}
              checked={charityCategory == 'Культура и образование'}
            />
            <A_RadioButton
              text="Другое"
              param="charityCategory"
              handleChange={handleChange}
              checked={charityCategory == 'Другое'}
            />
          </div>
          <S_FixedActions
            primButtonText="Продолжить"
            primButtonHandleClick={nextStepIdentity}
            primButtonDisable={true}
            primButtonDisableParam={charityCategory}
            secButtonText="Назад"
            secButtonHandleClick={prevStepIdentity}
          />
        </div>
      )
    }
  }
}
