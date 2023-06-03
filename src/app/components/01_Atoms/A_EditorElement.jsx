import classnames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { findOrRenderPattern } from '../../../plugin/pattern'

export default class A_EditorElement extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleChildClick = function(element, e) {
    const { setActiveElement } = this.props
    setActiveElement(element)
    if (e && e.stopPropagation) {
      e.stopPropagation()
    }
  }

  componentDidMount() {
    const { charityData, type, template, element } = this.props

    if (type === 'pattern') {
      const { identityPatternParams } = charityData
      var component = this,
        node = ReactDOM.findDOMNode(component)
      node.style.backgroundColor = `rgb(${charityData.identityColors[
        template.elements[element].background
      ].r * 255}, ${charityData.identityColors[
        template.elements[element].background
      ].g * 255}, ${charityData.identityColors[
        template.elements[element].background
      ].b * 255})`
      findOrRenderPattern(identityPatternParams, node, template, element)
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
      background,
      editorState,
      element,
      cover,
      setActiveElement
    } = this.props

    let activeElement

    if (editorState) {
      activeElement = editorState.activeElement
    }

    const classes = classnames({
      A_EditorElement: true,
      [`${type}`]: true,
      active: editorState && activeElement === element
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
          <p
            className={classes}
            style={styleDeclaration}
            onClick={e => {
              this.handleChildClick(element, e)
            }}
          >
            {text}
          </p>
        )
        break

      case 'img':
        console.log('element', element)
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
            src={cover}
            onClick={e => {
              this.handleChildClick(element, e)
            }}
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
          width: width * 100 + '%'
        }
        return (
          <div
            className={classes}
            style={styleDeclaration}
            onClick={e => {
              this.handleChildClick(element, e)
            }}
          ></div>
        )
        break
    }
  }
}
