import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderPattern } from '../../../plugin/pattern'

export default class A_PatternPreview extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { identityPatternParams, savePattern, index } = this.props
    // console.log('identityPatternParams', identityPatternParams);

    return (
      <div
        className="A_PatternPreview"
        id={`container${index}`}
        onClick={() => {
          savePattern(identityPatternParams)
        }}
      >
        {renderPattern(identityPatternParams, index)}
      </div>
    )
  }
}
