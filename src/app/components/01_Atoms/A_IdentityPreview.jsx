import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'

export default class A_IdentityPreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { charityData } = this.props

    const classes = classnames({
      A_IdentityPreview: true,
      checked: checked
    })
    return (
      <div className={classes}>
        <p>{identityFontsProgress}</p>
        <p>
          Ally помогает НКО
          <br />
          сэкономить на дизайне
          <br />
          1234567890 рублей!
        </p>
      </div>
    )
  }
}
