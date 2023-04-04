import React from 'react'
import A_RadioButton from '../01_Atoms/A_RadioButton'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_Text from '../01_Atoms/A_Text'
import A_TextInput from '../01_Atoms/A_TextInput'
import M_ChooseButtonSet from '../02_Molecules/M_ChooseButtonSet'
import S_FixedActions from '../04_Superorganisms/S_FixedActions'
import S_Navbar from '../04_Superorganisms/S_Navbar'
import A_PalettePreview from '../01_Atoms/A_PalettePreview'
import A_PatternPreview from '../01_Atoms/A_PatternPreview'
import A_FontPreview from '../01_Atoms/A_FontPreview'
import { log } from 'prettierr/parser-postcss'
import M_PalettePreviews from '../02_Molecules/M_PalettePreviews'

export default class P_Identity_Creation extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      identityCreationStep,
      actions,
      identityColorsProgress,
      identityPatternParamsProgress,
      identityFontsProgress
    } = this.props
    const { charityData } = this.props
    const {
      charityTitle,
      charityCategory,
      friendliness,
      rationality,
      volume,
      identityColors,
      identityFonts,
      identityPatternParams
    } = charityData

    const {
      handleChange,
      nextStepIdentity,
      prevStepIdentity,
      savePalette,
      savePattern,
      startPalettePreviews,
      startPatternPreviews,
      startFontsPreviews,
      newPalettePreview,
      saveFont,
      saveIdentity
    } = actions

    if (identityCreationStep === 1) {
      return (
        <div className="P_IdentityCreation">
          <S_Navbar
            nextStepIdentity={nextStepIdentity}
            text="Настройка фирменного стиля"
            back={false}
            currentStep={identityCreationStep}
            totalSteps={5}
            progressBar={true}
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
            // primButtonHandleClick={nextStepIdentity}
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
            back={true}
            currentStep={identityCreationStep}
            prevStepIdentity={prevStepIdentity}
            totalSteps={5}
            progressBar={true}
          />
          <A_Spacer size={74} />
          <div className="outlined_lead">
            <A_Text text="Какими вопросами занимается ваша организация?" />
            <div className="M_RadioButtonSet">
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
          </div>
          <A_Spacer size="12px" />
          <div className="outlined_lead">
            <A_Text text="Какие слова лучше описывают желаемый образ вашей организации?" />
            <div className="M_ChooseButtons">
              <M_ChooseButtonSet
                firstText="Серьезный"
                secondText="Дружелюбный"
                firstChecked={friendliness == 'Серьезный'}
                secondChecked={friendliness == 'Дружелюбный'}
                handleChange={handleChange}
                param="friendliness"
              />
              <M_ChooseButtonSet
                firstText="Тихий"
                secondText="Громкий"
                firstChecked={volume == 'Тихий'}
                secondChecked={volume == 'Громкий'}
                handleChange={handleChange}
                param="volume"
              />
              <M_ChooseButtonSet
                firstText="Рациональный"
                secondText="Эмоциональный"
                firstChecked={rationality == 'Рациональный'}
                secondChecked={rationality == 'Эмоциональный'}
                handleChange={handleChange}
                param="rationality"
              />
            </div>
          </div>
          <S_FixedActions
            primButtonText="Продолжить"
            primButtonHandleClick={() => startPalettePreviews(charityData)}
            primButtonDisable={true}
            primButtonDisableParam={
              charityCategory !== '' &&
              friendliness !== '' &&
              volume !== '' &&
              rationality !== ''
            }
            secButtonText="Назад"
            secButtonHandleClick={prevStepIdentity}
          />
        </div>
      )
    } else if (identityCreationStep === 3) {
      return (
        <div className="P_IdentityCreation">
          <S_Navbar
            text="Настройка фирменного стиля"
            back={true}
            currentStep={identityCreationStep}
            prevStepIdentity={prevStepIdentity}
            totalSteps={5}
            progressBar={true}
          />
          <A_Spacer size={106} />
          <A_Text
            type="lead2"
            text="Какая палитра больше подходит вашей организации?"
          />
          <M_PalettePreviews
            identityColorsProgress={identityColorsProgress}
            identityColors={identityColors}
            savePalette={savePalette}
          />

          {progressBar && <A_Spacer size={80} />}

          <S_FixedActions
            primButtonText="Продолжить"
            primButtonHandleClick={() => startPatternPreviews()}
            primButtonDisable={true}
            primButtonDisableParam={identityColors !== ''}
            secButtonText="Еще вариант"
            secButtonHandleClick={() => newPalettePreview()}
          />
        </div>
      )
    } else if (identityCreationStep === 4) {
      return (
        <div className="P_IdentityCreation">
          <S_Navbar
            text="Настройка фирменного стиля"
            back={true}
            currentStep={identityCreationStep}
            prevStepIdentity={prevStepIdentity}
            totalSteps={5}
            progressBar={true}
          />
          <A_Spacer size={106} />
          <A_Text
            type="lead2"
            text="Какой паттерн больше подходит вашей организации?"
          />
          <A_Spacer size={8} />
          <div className="M_PatternPreviews">
            <A_PatternPreview
              identityPatternParamsProgress={identityPatternParamsProgress[0]}
              checked={
                identityPatternParams == identityPatternParamsProgress[0]
              }
              index={1}
              savePattern={savePattern}
            />
            <A_PatternPreview
              identityPatternParamsProgress={identityPatternParamsProgress[1]}
              checked={
                identityPatternParams == identityPatternParamsProgress[1]
              }
              index={2}
              savePattern={savePattern}
            />
          </div>

          <S_FixedActions
            primButtonText="Продолжить"
            primButtonHandleClick={() => startFontsPreviews()}
            primButtonDisable={true}
            primButtonDisableParam={identityPatternParams}
          />
        </div>
      )
    } else if (identityCreationStep === 5) {
      return (
        <div className="P_IdentityCreation">
          <S_Navbar
            text="Настройка фирменного стиля"
            back={true}
            currentStep={identityCreationStep}
            prevStepIdentity={prevStepIdentity}
            totalSteps={5}
            progressBar={true}
          />
          <A_Spacer size={106} />
          <A_Text
            type="lead2"
            text="Какой шрифт больше подходит вашей организации?"
          />
          <A_Spacer size={8} />
          <div className="M_FontPreviews">
            <A_FontPreview
              identityFontsProgress={identityFontsProgress[0]}
              saveFont={saveFont}
              checked={identityFonts == identityFontsProgress[0]}
            />
            <A_FontPreview
              identityFontsProgress={identityFontsProgress[1]}
              saveFont={saveFont}
              checked={identityFonts == identityFontsProgress[1]}
            />
          </div>

          <S_FixedActions
            primButtonText="Продолжить"
            primButtonHandleClick={nextStepIdentity}
            primButtonDisable={true}
            primButtonDisableParam={identityFonts !== ''}
          />
        </div>
      )
    } else {
      return (
        <div>
          <S_Navbar
            text="Фирменный стиль готов"
            back={true}
            prevStepIdentity={prevStepIdentity}
          />
          <A_Spacer size={106} />
          <A_Text
            type="lead2"
            text="Ваш фирменный стиль готов. Теперь вы можете создавать изображения по шаблонам."
          />

          <S_FixedActions
            primButtonText="Сохранить стиль"
            primButtonHandleClick={saveIdentity}
          />
        </div>
      )
    }
  }
}
