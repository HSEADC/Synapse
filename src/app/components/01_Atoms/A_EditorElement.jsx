import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import placeholder1 from '../../assets/images/placeholders/1.jpg'
import { renderPattern } from '../../../plugin/pattern'
import { setPatternRenders, getPatternRenders } from '../../../plugin/store'

export default class A_EditorElement extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { charityData, type, template, element } = this.props

    if (type === 'pattern') {
      const { identityPatternParams } = charityData
      var component = this,
        node = ReactDOM.findDOMNode(component)
      renderPattern(identityPatternParams, node, template, element)
    }
  }

  render() {
    const {
      type,
      x,
      y,
      height,
      lineHeight,
      width,
      text,
      size,
      color,
      charityData,
      borderRadius,
      background
    } = this.props

    const classes = classnames({
      A_EditorElement: true,
      [`${type}`]: true
    })

    let styleDeclaration

    switch (type) {
      case 'text':
        let textColor
        switch (color) {
          case 'primary':
            textColor = charityData.identityColors.primary
            break

          case 'background':
            textColor = charityData.identityColors.background
            break

          case 'adOne':
            textColor = charityData.identityColors.adOne
            break

          case 'adTwo':
            textColor = charityData.identityColors.adTwo
            break

          case 'text':
            textColor = charityData.identityColors.text
            break
        }

        styleDeclaration = {
          position: 'absolute',
          left: x * 100 + '%',
          top: y * 100 + '%',
          // height: height * 100 + '%',
          width: width * 100 + '%',
          color: `rgba(${textColor.r * 255}, ${textColor.g *
            255}, ${textColor.b * 255}, 1)`,
          fontSize: size,
          fontFamily: charityData.identityFonts,
          lineHeight: lineHeight
        }

        return (
          <p className={classes} style={styleDeclaration}>
            {text}
          </p>
        )
        break

      case 'img':
        styleDeclaration = {
          position: 'absolute',
          left: x * 100 + '%',
          top: y * 100 + '%',
          height: height * 100 + '%',
          width: width * 100 + '%',
          backgroundColor: 'red',
          borderRadius: borderRadius
        }

        return (
          <img
            className={classes}
            style={styleDeclaration}
            src={placeholder1}
          />
        )
        break

      case 'pattern':
        let patternBackground
        switch (background) {
          case 'primary':
            patternBackground = charityData.identityColors.primary
            patternBackground = `rgba(${patternBackground.r *
              255}, ${patternBackground.g * 255}, ${patternBackground.b *
              255}, 1)`
            break

          case 'background':
            patternBackground = charityData.identityColors.background
            patternBackground = `rgba(${patternBackground.r *
              255}, ${patternBackground.g * 255}, ${patternBackground.b *
              255}, 1)`
            break

          case 'adOne':
            patternBackground = charityData.identityColors.adOne
            patternBackground = `rgba(${patternBackground.r *
              255}, ${patternBackground.g * 255}, ${patternBackground.b *
              255}, 1)`
            break

          case 'adTwo':
            patternBackground = charityData.identityColors.adTwo
            patternBackground = `rgba(${patternBackground.r *
              255}, ${patternBackground.g * 255}, ${patternBackground.b *
              255}, 1)`
            break

          case 'text':
            patternBackground = charityData.identityColors.text
            patternBackground = `rgba(${patternBackground.r *
              255}, ${patternBackground.g * 255}, ${patternBackground.b *
              255}, 1)`
            break

          case 'none':
            patternBackground = 'none'
            break
        }

        styleDeclaration = {
          position: 'absolute',
          left: x * 100 + '%',
          top: y * 100 + '%',
          height: height * 100 + '%',
          width: width * 100 + '%',
          background: 'red !important'
        }
        return <div className={classes} style={styleDeclaration}></div>
        break
    }
  }
}
