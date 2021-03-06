import fs from 'fs'

// used for initial setup. shouldn't really need to use again

const COLOR_GROUPS = [
  {
    key: 'primary',
    // these are placeholder color values. actual value will be set in figma
    baseRgbCsv: '243,87,161',
    description: 'Used for key UI elements (buttons, active states, etc...)'
  },
  {
    key: 'secondary',
    baseRgbCsv: '127,288,220',
    description: 'Alternate color used for less prominent UI elements, and for adding variety'
  },
  {
    key: 'bg',
    baseRgbCsv: '0,0,0',
    description: 'Background color for the page'
  },
  {
    key: 'surface',
    base: 'rgba(255, 255, 255, 0.1)',
    description: 'Color for cards, low priority buttons, etc...'
  },
  {
    key: 'dialog',
    baseRgbCsv: '30,30,30',
    description: 'Color for dialogs and any content that overlays the page'
  },
  {
    key: 'critical',
    baseRgbCsv: '176,16,56',
    description: 'Color for critical actions and errors'
  },
  {
    key: 'warning',
    baseRgbCsv: '255,218,7',
    description: 'Color for semi-critical actions and warnings'
  },
  // we can add these if/when needed: accent1, accent2, neutral
]
const STATES = [
  {
    key: 'default',
    baseOpacity: '1',
    description: 'Default'
  },
  {
    key: 'disabled',
    baseOpacity: '0.5',
    description: 'Disabled'
  },
  {
    key: 'hovered',
    baseOpacity: '0.9',
    description: 'Hovered'
  },
  {
    key: 'pressed',
    baseOpacity: '0.95',
    description: 'Pressed/Clicked'
  },
  {
    key: 'selected',
    baseOpacity: '1',
    description: 'Selective/Active/Highlighted'
  },
  {
    key: 'muted',
    baseOpacity: '0.6',
    description: 'Muted - softer colors for background/info-box'
  }
]
const STYLE_PROPERTIES = [
  {
    key: 'fill',
    description: 'Fill / background color'
  },
  {
    key: 'text',
    description: 'Text / foreground color on site background color (white/black)'
  },
  {
    key: 'text-on-fill',
    description: 'Color of text on this state\'s fill color'
  },
  {
    key: 'border',
    description: 'Border color'
  },
  {
    key: 'shadow',
    description: 'Shadow color'
  },
  // colorGroup === 'dialog' has additional backdrop style property
]

// theme creators realistically shouldn't need to set all of these. we'll have good fallbacks

const jsonObj = COLOR_GROUPS.reduce((obj, colorGroup) => {
  return {
    ...obj,
    [colorGroup.key]: getStates(colorGroup).reduce((obj, state) => {
      return {
        ...obj,
        [state.key]: getStyleProperties(colorGroup).reduce((obj, styleProperty) => {
          const color = getDefinition({ colorGroup, state, styleProperty })
          return {
            ...obj,
            [styleProperty.key]: color
          }
        }, {})
      }
    }, {})
  }
}, {})

function getStates (colorGroup) {
  return colorGroup.key === 'dialog'
    ? STATES.filter(({ key }) => key === 'default')
    : STATES
}

function getStyleProperties (colorGroup) {
  return colorGroup.key === 'dialog'
    ? STYLE_PROPERTIES.concat({ key: 'backdrop', description: 'Overlay backdrop color' })
    : STYLE_PROPERTIES
}

function getDefinition ({ colorGroup, state, styleProperty }) {
  let color
  if (['shadow', 'border', 'text'].includes(styleProperty.key)) {
    color = `{color.${colorGroup.key}.${state.key}.fill}`
  }
  else if (styleProperty.key === 'text-on-fill') {
    color = state.key === 'default' ? 'rgba(255, 255, 255, 1)' : `{color.${colorGroup.key}.default.text-on-fill}`
  } else {
    if (colorGroup.baseRgbCsv) {
      color = `rgba(${colorGroup.baseRgbCsv}, ${state.baseOpacity})`
    } else {
      color = colorGroup.base
    }
  }
  return {
    value: color,
    description: `Group: ${colorGroup.description}\nState: ${state.description}\nProperty: ${styleProperty.description}`,
    type: "color"
  }
}

fs.writeFileSync('./tokens/color.json', JSON.stringify(jsonObj, null, 2))