import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import wordmark from '../../assets/images/feed/wordmark.svg'
import A_Spacer from './A_Spacer'

export default class A_FooterLogo extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="O_Footer">
        <A_Spacer size={64} />
        <img src={wordmark} />
      </div>
    )
  }
}
