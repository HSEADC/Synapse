import React from 'react'
import ReactDOM from 'react-dom'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_Divider from '../01_Atoms/A_Divider'
import onClickOutside from 'react-onclickoutside'
import A_Button from '../01_Atoms/A_Button'

class M_MenuPopup extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleClickOutside = () => {
    const { checkThis } = this.props
    checkThis()
  }

  render() {
    const { menuPopupCheck, checkThis } = this.props

    return (
      <div className="M_MenuPopup">
        <A_Button
          type="icon"
          icon="more"
          handleClick={() => {
            checkThis()
          }}
        />
        <A_Divider />
        <div>
          <a
            href="https://www.youtube.com/channel/UCk-hWo1r88hFTOVWVuF5sqw"
            target="_blank"
            className="footnote_link"
          >
            Видеоуроки
          </a>
          <a
            href="mailto:vitalygachkovsky@gmail.com"
            target="_blank"
            className="footnote_link"
          >
            Поддержка
          </a>
          <a href="" target="_blank" className="footnote_link">
            Оставить отзыв
          </a>
        </div>
        <A_Divider />
        <div>
          <a
            href="https://www.instagram.com/ally.helper/"
            target="_blank"
            className="caption_link"
          >
            Instagram
          </a>
          <a
            href="http://eepurl.com/io7fjk"
            target="_blank"
            className="caption_link"
          >
            Рассылка
          </a>
        </div>
      </div>
    )
  }
}

export default onClickOutside(M_MenuPopup)
