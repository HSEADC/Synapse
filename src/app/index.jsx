import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as styles from './assets/stylesheets/App.scss'
// import * as styless from 'react-tooltip/dist/react-tooltip.css'
import App from './App'

const props = {
  charityAxes: {
    friendliness: {
      serious: '',
      friendly: ''
    },
    volume: {
      quiet: '',
      loud: ''
    },
    rationslity: {
      rational: '',
      emotional: ''
    }
  }
}

async function encode(canvas, ctx, imageData) {
  ctx.putImageData(imageData, 0, 0)

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader()
      reader.onload = () => resolve(new Uint8Array(reader.result))
      reader.onerror = () => reject(new Error('Could not read from blob'))
      reader.readAsArrayBuffer(blob)
    })
  })
}

async function decode(canvas, ctx, bytes) {
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = bytes
  })

  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0, 0)
  const imageData = ctx.getImageData(0, 0, image.width, image.height)

  return imageData
}

async function encodeToBase64(u8bytes) {
  const base64url = await new Promise((r) => {
    const reader = new FileReader()
    reader.onload = () => r(reader.result)
    reader.readAsDataURL(new Blob([u8bytes]))
  })

  const base64bytes = base64url.substring(base64url.indexOf(',') + 1)

  return base64bytes
}

window.onmessage = async (event) => {
  if (event.data.pluginMessage.type === 'get-storage') {
    let charityData

    charityData = JSON.stringify(event.data.pluginMessage.charityData)

    const reactWrapper = document.getElementById('react-page')
    reactWrapper.setAttribute('charityData', charityData)

    ReactDOM.render(
      <App charityData={charityData} {...props} />,
      document.getElementById('react-page')
    )
  } else if (event.data.pluginMessage.type === 'image') {
    const bytes = event.data.pluginMessage.image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const imageData = await decode(canvas, ctx, bytes)
    const newBytes = await encode(canvas, ctx, imageData)

    parent.postMessage(
      {
        pluginMessage: {
          type: 'image-in-bytes',
          id: event.data.pluginMessage.id,
          bytes: newBytes
        }
      },
      '*'
    )
  } else if (event.data.pluginMessage.type === 'upload-image') {
    const u8bytes = event.data.pluginMessage.bytes
    // const canvas = document.createElement('canvas')
    // const ctx = canvas.getContext('2d')

    const base64bytes = await encodeToBase64(u8bytes)

    parent.postMessage(
      {
        pluginMessage: {
          type: 'image-in-base64',
          id: event.data.pluginMessage.id,
          bytes: base64bytes,
          activeElement: event.data.pluginMessage.activeElement
        }
      },
      '*'
    )
  }
}

document.body.classList.add('loading')

parent.postMessage(
  {
    pluginMessage: {
      type: 'get-storage'
    }
  },
  '*'
)
