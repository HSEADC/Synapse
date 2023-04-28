let borderRadiuses = {
  small: '5%/10%'
}

let fontSizes = {
  body: '5cqw',
  headline: '10cqw'
}

const A = {
  A1: {
    title: 'Обложка события',
    height: 1080,
    width: 1080,
    background: 'primary',
    elements: {
      e1: {
        type: 'img',
        x: 0.1,
        y: 0.1,
        height: 0.4,
        width: 0.8,
        borderRadius: borderRadiuses.small
      },
      e2: {
        type: 'text',
        text: 'Cбор теплых вещей для бездомных',
        size: fontSizes.headline,
        x: 0.1,
        y: 0.55,
        height: 0.4,
        width: '80%',
        color: 'background'
      },
      e3: {
        type: 'text',
        text: '10.05 12:00–16:00',
        size: fontSizes.body,
        x: 0.1,
        y: 0.85,
        height: 0.4,
        width: 'auto',
        color: 'background'
      },
      e4: {
        type: 'text',
        text: 'Новая Голландия',
        size: fontSizes.body,
        x: 0.5,
        y: 0.85,
        height: 0.4,
        width: 'auto',
        color: 'background'
      }
    }
  },
  A2: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1080,
    background: 'background',
    elements: {
      e1: {
        type: 'img',
        x: 0.1,
        y: 0.1,
        height: 0.4,
        width: 'auto'
      },
      e2: {
        type: 'text',
        text: 'hiii',
        size: '5rem',
        x: 0.5,
        y: 0.5,
        height: 0.4,
        width: 'auto',
        color: 'primary'
      }
    }
  },
  A3: {
    title: 'Обложка мероприятия с фото',
    height: 1080,
    width: 1080,
    background: 'background',
    elements: {
      e1: {
        type: 'img',
        x: 0.1,
        y: 0.1,
        height: 0.4,
        width: 0.8
      },
      e2: {
        type: 'text',
        text: 'hiii',
        size: '5rem',
        x: 0.5,
        y: 0.5,
        height: 0.4,
        width: 'auto',
        color: 'primary'
      }
    }
  },
  A4: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1080,
    background: 'background',
    elements: {
      e1: {
        type: 'img',
        x: 0.1,
        y: 0.1,
        height: 0.4,
        width: 'auto'
      },
      e2: {
        type: 'text',
        text: 'hiii',
        size: '5rem',
        x: 0.5,
        y: 0.5,
        height: 0.4,
        width: 'auto',
        color: 'primary'
      }
    }
  }
}

const B = {
  B1: {
    title: 'Обложка мероприятия с фото',
    height: 1920,
    width: 1080
  },
  B2: {
    title: 'Карточка с текстом',
    height: 1920,
    width: 1080
  }
}

const C = {
  C1: {
    title: 'Обложка мероприятия с фото',
    height: 1980,
    width: 1080
  },
  C2: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1980
  }
}

const D = {
  D1: {
    title: 'Обложка мероприятия с фото',
    height: 1980,
    width: 1080
  },
  D2: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1980
  }
}

const E = {
  E1: {
    title: 'Обложка мероприятия с фото',
    height: 1980,
    width: 1080
  },
  E2: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1980
  }
}

const F = {
  F1: {
    title: 'Обложка мероприятия с фото',
    height: 1980,
    width: 1080
  },
  F2: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1980
  }
}

const G = {
  G1: {
    title: 'Обложка мероприятия с фото',
    height: 1980,
    width: 1080
  },
  G2: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1980
  }
}

const H = {
  H1: {
    title: 'Обложка мероприятия с фото',
    height: 1980,
    width: 1080
  },
  H2: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1980
  }
}

const I = {
  I1: {
    title: 'Обложка мероприятия с фото',
    height: 1980,
    width: 1080
  },
  I2: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1980
  }
}

const J = {
  J1: {
    title: 'Обложка мероприятия с фото',
    height: 1980,
    width: 1080
  },
  J2: {
    title: 'Карточка с текстом',
    height: 1080,
    width: 1980
  }
}

const templatesList = {
  A: A,
  B: B,
  C: C,
  D: D,
  E: E,
  F: F,
  G: G,
  H: H,
  I: I,
  J: J
}

export { templatesList }
