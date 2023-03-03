import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_Button from '../01_Atoms/A_Button'
import M_ProgressBar from '../02_Molecules/M_Progress_Bar'

export default class S_Navbar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    console.log('click')
  }

  render() {
    const {
      back,
      tab,
      progressBar,
      totalSteps,
      currentStep,
      text,
      prevStepIdentity,
      type,
      feedTab,
      templates
    } = this.props

    console.log('tab', templates.tab)

    if (type === 'main') {
      return (
        <div className="S_Navbar main">
          <div className="navbarTabs">
            <p
              className={`${templates.tab === 'Шаблоны' ? 'current' : ''}`}
              onClick={() => {
                feedTab('Шаблоны')
              }}
            >
              Шаблоны
            </p>
            <p
              className={`${templates.tab === 'Стиль' ? 'current' : ''}`}
              onClick={() => {
                feedTab('Стиль')
              }}
            >
              Стиль
            </p>
          </div>
          <A_Button type="icon" icon="more" />
          <div
            className={`indicator ${
              templates.tab === 'Шаблоны' ? '' : 'moved'
            }`}
          ></div>
        </div>
      )
    } else {
      return (
        <>
          <div className="S_Navbar">
            {back && (
              <A_Button
                type="icon"
                icon="back"
                handleClick={prevStepIdentity}
              />
            )}
            {text}
          </div>
          {progressBar && (
            <M_ProgressBar totalSteps={totalSteps} currentStep={currentStep} />
          )}
        </>
      )
    }
  }
}
