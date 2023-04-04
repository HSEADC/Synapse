import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import A_Text from '../01_Atoms/A_Text'

export default class M_FeedSection extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, src, chooseSection } = this.props

    return (
      <div className="M_FeedSection" onClick={() => chooseSection(src, text)}>
        <A_Text text={text} type="lead" />
        <img src={require(`../../assets/images/feed/${src}.svg`)} />
      </div>
    )
  }
}
