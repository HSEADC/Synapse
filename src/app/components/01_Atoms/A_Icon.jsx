import classnames from 'classnames'
import React from 'react'

export default class A_Icon extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { icon } = this.props

    const classes = classnames({
      A_Icon: true
    })

    return (
      <div className={classes}>
        <img src={icon} />
      </div>
    )
  }
}
