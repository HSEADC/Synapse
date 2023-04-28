import classnames from 'classnames'
import React from 'react'
import placeholder1 from '../../assets/images/placeholders/1.jpg'

export default class A_EditorElement extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      type,
      x,
      y,
      height,
      width,
      text,
      size,
      color,
      charityData,
      borderRadius
    } = this.props

    console.log('props', this.props)

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
          width: width,
          color: `rgba(${textColor.r * 255}, ${textColor.g *
            255}, ${textColor.b * 255}, 1)`,
          fontSize: size,
          fontFamily: charityData.identityFonts
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
        return <div className={classes}>pattern</div>
        break
    }
  }
}
