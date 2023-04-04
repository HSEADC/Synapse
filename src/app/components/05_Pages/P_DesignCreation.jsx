import React from 'react'
import A_Button from '../01_Atoms/A_Button'
import A_Text from '../01_Atoms/A_Text'
import A_Spacer from '../01_Atoms/A_Spacer'
import A_TextInput from '../01_Atoms/A_TextInput'
import A_DropdownButton from '../01_Atoms/A_Dropdownbutton'
import M_FeedSection from '../02_Molecules/M_FeedSection'
import A_FooterLogo from '../01_Atoms/A_FooterLogo'

export default class P_DesignCreation extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, charityData } = this.props
    const { handleChange, chooseSection } = actions

    return <div className="P_DesignCreation">create</div>
  }
}
