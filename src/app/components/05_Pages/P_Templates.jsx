import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'

import S_Navbar from '../04_Superorganisms/S_Navbar'

export default class P_Templates extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, templates } = this.props
    const { feedTab } = actions

    return (
      <div>
        <S_Navbar type="main" feedTab={feedTab} templates={templates} />
      </div>
    )
  }
}
