import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'

import A_OnboardingImage from '../01_Atoms/A_Onboarding_Image'

import onboardingImage1 from '../../assets/images/onboarding/A_Onboarding_Image_1.png'
import onboardingImage2 from '../../assets/images/onboarding/A_Onboarding_Image_2.png'
import onboardingImage3 from '../../assets/images/onboarding/A_Onboarding_Image_3.png'
import onboardingImage4 from '../../assets/images/onboarding/A_Onboarding_Image_4.png'

export default class P_Onboarding extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, onboardingStep } = this.props
    const { prevStep, nextStep, skipOnboarding } = actions
    if (onboardingStep === 1) {
      return (
        <div className="P_Onboarding">
          <A_OnboardingImage image={onboardingImage1} margin-bottom="16px" />
          <A_Spacer size={16} />
          <div className="A_Text">
            Ally — это бесплатный сервис, который заменяет дизайнера в НКО. С
            помощью Ally вы можете легко создать логотип и фирменный стиль,
            генерировать картинки для соцсетей, визитки, и&nbsp;многое другое.{' '}
            <a
              className="hyperlink"
              href="https://allydesign.org/"
              target="_blank"
            >
              Узнать больше
            </a>
          </div>
          <div className="bottomButtonVert">
            <A_Button type="secondary" text="Далее ->" handleClick={nextStep} />
            <A_Spacer size={12} />
            <A_Button
              type="tertiary"
              text="Пропустить"
              handleClick={skipOnboarding}
            />
          </div>
        </div>
      )
    } else if (onboardingStep === 2) {
      return (
        <div className="P_Onboarding">
          <A_OnboardingImage image={onboardingImage2} />
          <A_Spacer size={16} />
          <A_Text text="Ответьте на вопросы о ценностях и видении вашей организации, и алгоритм сгенерирует несколько вариантов фирменного стиля, которые лучше всего отражают ваш бренд. Вы сможете выбрать тот вариант, который нравится вам больше всего." />
          <div className="bottomButtonHor">
            <A_Button type="secondary" text="<- Назад" handleClick={prevStep} />
            <A_Button type="secondary" text="Далее ->" handleClick={nextStep} />
          </div>
        </div>
      )
    } else if (onboardingStep === 3) {
      return (
        <div className="P_Onboarding">
          <A_OnboardingImage image={onboardingImage3} />
          <A_Spacer size={16} />
          <A_Text text="Выбирайте из готовых шаблонов или создайте свой. Просто вставьте нужные текст и картинки, и Синапс создаст несколько вариантов дизайна. Вы можете редактировать их и сохранить понравившиеся." />
          <div className="bottomButtonHor">
            <A_Button type="secondary" text="<- Назад" handleClick={prevStep} />
            <A_Button type="secondary" text="Далее ->" handleClick={nextStep} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="P_Onboarding">
          <A_OnboardingImage image={onboardingImage4} />
          <A_Spacer size={16} />
          <A_Text text="Вы можете скачать сгенерированный брендбук и создавать дизайн не только в плагине. Отправьте брендбук своим дизайнерам и подрядчикам, чтобы сохранить постоянство фирменного стиля — в видео, презентациях, и где угодно." />
          <div className="bottomButtonHor">
            <A_Button type="secondary" text="<- Назад" handleClick={prevStep} />
            <A_Button text="Создать свой стиль" handleClick={skipOnboarding} />
          </div>
        </div>
      )
    }
  }
}
