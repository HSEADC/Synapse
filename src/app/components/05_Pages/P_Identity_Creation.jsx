import React from 'react'
import S_Navbar from '../04_Superorganisms/S_Navbar'

export default class P_Identity_Creation extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return <S_Navbar text="Настройка фирменного стиля" back={true} />
  }
}
