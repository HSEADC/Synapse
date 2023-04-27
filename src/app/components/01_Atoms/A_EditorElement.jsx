import classnames from 'classnames'
import React from 'react'

export default class A_EditorElement extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, x, y, height, width, text, color, charityData } = this.props

    const classes = classnames({
      A_EditorElement: true,
      [`${type}`]: true
    })

    switch (color) {
      case 'primary':
        color = charityData.identityColors.primary
        break

      case 'background':
        color = charityData.identityColors.background
        break

      case 'adOne':
        color = charityData.identityColors.adOne
        break

      case 'adTwo':
        color = charityData.identityColors.adTwo
        break

      case 'text':
        color = charityData.identityColors.text
        break
    }

    let styleDeclaration = {
      text: {
        position: 'absolute',
        left: x * 100 + '%',
        top: y * 100 + '%',
        height: height * 100 + '%',
        width: width * 100 + '%',
        color: 'red'
      },
      img: {
        position: 'absolute',
        left: x * 100 + '%',
        top: y * 100 + '%',
        height: height * 100 + '%',
        width: width * 100 + '%',
        backgroundColor: 'red'
      }
    }

    switch (type) {
      case 'text':
        return (
          <p className={classes} style={styleDeclaration.text}>
            {text}
          </p>
        )
        break

      case 'img':
        return <img className={classes} style={styleDeclaration.img} />
        break

      case 'pattern':
        return <div className={classes}>pattern</div>
        break
    }
  }
}
