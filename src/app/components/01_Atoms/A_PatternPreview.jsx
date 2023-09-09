import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { findOrRenderPattern } from '../../../plugin/pattern'

export default class A_PatternPreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { identityPatternParamsProgress } = this.props
    var component = this,
      node = ReactDOM.findDOMNode(component)

    node.style.backgroundColor = `rgb(${
      identityPatternParamsProgress.colors.background.r * 255
    }, ${identityPatternParamsProgress.colors.background.g * 255}, ${
      identityPatternParamsProgress.colors.background.b * 255
    })`

    findOrRenderPattern(identityPatternParamsProgress, node)
  }

  render() {
    const { identityPatternParamsProgress, savePattern, index, checked } =
      this.props

    const classes = classnames({
      A_PatternPreview: true,
      checked: checked
    })

    return (
      <div
        className={classes}
        id={`container${index}`}
        onClick={() => {
          savePattern(identityPatternParamsProgress)
        }}
      ></div>
    )
  }
}
