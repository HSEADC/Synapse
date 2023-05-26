import placeholder1 from '../app/assets/images/placeholders/1.jpg'

let borderRadiuses = {
  small: '3cqw'
}

let fontSizes = {
  body: '4cqw',
  caption: '5cqw',
  headline: '10cqw'
}

const A = {
  A1: {
    title: 'Обложка события',
    id: 'A1',
    height: 1080,
    width: 1080,
    background: 'primary',
    elements: {
      e1: {
        type: 'img',
        id: 'e1',
        x: 0.1,
        y: 0.1,
        height: 0.4,
        width: 0.8,
        borderRadius: borderRadiuses.small,
        cover: placeholder1
      },
      e2: {
        type: 'text',
        id: 'e2',
        text: 'Cбор теплых вещей для бездомных',
        size: fontSizes.headline,
        lineHeight: '100%',
        x: 0.1,
        y: 0.55,
        height: 0.4,
        width: 0.8,
        color: 'background'
      },
      e3: {
        type: 'text',
        id: 'e3',
        text: '10.05 12:00–16:00',
        size: fontSizes.caption,
        lineHeight: '100%',
        x: 0.1,
        y: 0.85,
        height: 0.4,
        width: 'auto',
        color: 'background'
      },
      e4: {
        type: 'text',
        id: 'e4',
        text: 'Новая Голландия',
        size: fontSizes.caption,
        lineHeight: '100%',
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
    id: 'A2',
    height: 1080,
    width: 1080,
    background: 'background',
    elements: {
      e1: {
        type: 'text',
        id: 'e1',
        x: 0.1,
        y: 0.1,
        height: 0.7,
        width: 0.8,
        text:
          'Некоммерческие организации, или НКО, это крайне важный социальный институт, поскольку он решает социальные проблемы, игнорируемые государством и корпопациями. Некоммерческий сектор способствует повышению уровня образо-вания и продолжительности жизни, вносит вклад в развитие демократии, поощряя создание гражданских инициатив и защищая интересы разных групп населения, часто стигматизиро-ванных или маргинализированных. Повышая социальную и политическую устойчивость, НКО также способствуют экономическому развитию страны.',
        size: fontSizes.body,
        lineHeight: '120%',
        color: 'text'
      },
      e2: {
        type: 'text',
        id: 'e2',
        lineHeight: '100%',
        text: '1',
        size: fontSizes.body,
        x: 0.1,
        y: 0.9,
        height: 'auto',
        width: 'auto',
        color: 'text'
      }
    }
  },
  A3: {
    title: 'Текст с паттерном',
    id: 'A3',
    height: 1080,
    width: 1080,
    background: 'background',
    elements: {
      e1: {
        type: 'pattern',
        id: 'e1',
        background: 'background',
        x: 0,
        y: 0,
        height: 0.2,
        width: 1
      },
      e2: {
        type: 'text',
        id: 'e2',
        text:
          'В российском обществе есть запрос на укрепление взаимодействия НКО с государственными структурами для решения ​​проблем здравоохранения, образования и социальной сферы',
        size: '0.3rem',
        lineHeight: '100%',
        x: 0.1,
        y: 0.3,
        height: 0.4,
        width: 'auto',
        color: 'text'
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
