import React from 'react'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_Divider from '../01_Atoms/A_Divider'
import A_Button from '../01_Atoms/A_Button'

export default class M_Toolbar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { menuPopupCheck, checkThis } = this.props

    return (
      <div className="M_Toolbar">
        <A_Button type="toolbar" icon="add" />
        <div>
          <A_Button type="toolbar" icon="image" />
          <A_Button type="toolbar" icon="text" />
          <A_Button type="toolbar" icon="logo" />
          <A_Button type="toolbar" icon="pattern" />
        </div>
      </div>
    )
  }
}
