import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderPattern } from '../../../plugin/pattern'

export default class A_PatternPreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      identityPatternParamsProgress,
      savePattern,
      index,
      checked
    } = this.props
    // console.log('identityPatternParams', identityPatternParams);

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
      >
        {renderPattern(identityPatternParamsProgress, index)}
      </div>
    )
  }
}
