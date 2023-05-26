import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_Button from '../01_Atoms/A_Button'
import M_ProgressBar from '../02_Molecules/M_Progress_Bar'
import M_MenuPopup from '../02_Molecules/M_MenuPopup'

export default class S_Navbar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      menuPopupCheck: false
    }
  }

  checkThis = () => {
    this.setState({ menuPopupCheck: !this.state.menuPopupCheck })
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
      templates,
      backToSection,
      backToFeed
    } = this.props

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
          <A_Button
            type="icon"
            icon="more"
            handleClick={() => {
              this.checkThis()
            }}
          />
          {this.state.menuPopupCheck && (
            <M_MenuPopup
              menuPopupCheck={this.state.menuPopupCheck}
              checkThis={this.checkThis}
              // ref={this.wrapperRef}
            />
          )}
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
            {backToFeed && (
              <A_Button type="icon" icon="back" handleClick={backToSection} />
            )}
            {text}
            <A_Button
              type="icon"
              icon="more"
              handleClick={() => {
                this.checkThis()
              }}
            />
            {this.state.menuPopupCheck && (
              <M_MenuPopup
                menuPopupCheck={this.state.menuPopupCheck}
                checkThis={this.checkThis}
              />
            )}
          </div>
          {progressBar && (
            <M_ProgressBar totalSteps={totalSteps} currentStep={currentStep} />
          )}
        </>
      )
    }
  }
}
