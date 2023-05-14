import classnames from 'classnames'
import { log } from 'prettierr/parser-postcss'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderPattern } from '../../../plugin/pattern'

export default class A_PatternPreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { identityPatternParamsProgress } = this.props
    var component = this,
      node = ReactDOM.findDOMNode(component)

    renderPattern(identityPatternParamsProgress, node)
  }

  render() {
    const {
      identityPatternParamsProgress,
      savePattern,
      index,
      checked
    } = this.props

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
