import React from 'react'
import ReactDOM from 'react-dom'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_Divider from '../01_Atoms/A_Divider'

export default class M_MenuPopup extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="M_MenuPopup">
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