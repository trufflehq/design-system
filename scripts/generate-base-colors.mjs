import fs from 'fs'

// used for initial setup. shouldn't really need to use again

const STATES = {
  DEFAULT: {
    key: 'default',
    baseOpacity: '1',
    description: 'Default'
  },
  DISABLED: {
    key: 'disabled',
    baseOpacity: '0.5',
    description: 'Disabled'
  },
  HOVERED: {
    key: 'hovered',
    baseOpacity: '0.9',
    description: 'Hovered'
  },
  PRESSED: {
    key: 'pressed',
    baseOpacity: '0.95',
    description: 'Pressed/Clicked'
  },
  SELECTED: {
    key: 'selected',
    baseOpacity: '1',
    description: 'Selective/Active/Highlighted'
  }
}

const INTERACTIVE_STATES = [
  STATES.HOVERED, STATES.PRESSED, STATES.SELECTED, STATES.DISABLED
]

const PROPERTIES = {
  BACKGROUND: {
    key: 'background',
    description: 'Background / fill color'
  },
  COLOR: {
    key: 'color',
    description: 'Text / foreground color on site background color (white/black)'
  },
  BORDER_COLOR: {
    key: 'border-color',
    description: 'Border color'
  }
}

// page, text, action, input, surface
const THEMES = {
  // ui-elements
  BUTTON: {
    key: 'button',
    baseOpacity: '1',
    description: 'Solid - Buttons and fabs',
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  INPUT: {
    key: 'input',
    baseOpacity: '1',
    description: 'Input - text boxes, text areas and dropdowns',
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },

  // generic
  MUTED: {
    key: 'muted',
    baseOpacity: '1',
    description: 'Muted - Cards, warning messages, info boxes, etc... Background is typically muted color, border is higher contrast',
    states: [STATES.DEFAULT],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  FILLED: {
    key: 'filled',
    baseOpacity: '1',
    description: 'Filled - Buttons and fabs',
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  OUTLINED: {
    key: 'outlined',
    baseOpacity: '1',
    description: 'Outline - Tags, inputs, textareas, dropdowns, alternate buttons',
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  TEXT: {
    key: 'text',
    baseOpacity: '1',
    description: 'Header text, paragraph text, icons, links (needs to be legible on background surface color)',
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  GHOST: {
    key: 'ghost',
    baseOpacity: '1',
    description: 'Ghost - Fancier links for tabs / navigation',
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  }
}

const COLOR_ROLES = {
  PRIMARY: {
    key: 'primary',
    // these are placeholder color values. actual value will be set in figma
    baseRgbCsv: '243,87,161',
    description: 'Used for key UI elements (buttons, active states, etc...)'
  },
  SECONDARY: {
    key: 'secondary',
    baseRgbCsv: '127,288,220',
    description: 'Alternate color used for less prominent UI elements, and for adding variety'
  },
  BG: {
    key: 'bg',
    baseRgbCsv: '0,0,0',
    description: 'Background color for the page'
  },
  CRITICAL: {
    key: 'critical',
    baseRgbCsv: '176,16,56',
    description: 'Color for critical actions and errors'
  },
  WARNING: {
    key: 'warning',
    baseRgbCsv: '255,218,7',
    description: 'Color for semi-critical actions and warnings'
  },
  SUCCESS: {
    key: 'success',
    baseRgbCsv: '0,255,0',
    description: 'Color for successful actions'
  }
}

// theme creators realistically shouldn't need to set all of these. we'll have good fallbacks

const jsonObj = {
  color: Object.values(COLOR_ROLES).reduce((obj, colorRole) => {
    return {
      ...obj,
      [colorRole.key]: Object.values(THEMES).reduce((obj, theme) => {
        return {
          ...obj,
          [theme.key]: Object.values(STATES).reduce((obj, state) => {
            return {
              ...obj,
              [state.key]: Object.values(PROPERTIES).reduce((obj, property) => {
                const color = getDefinition({ theme, colorRole, state, property })
                return {
                  ...obj,
                  [property.key]: color
                }
              }, {})
            }
          }, {})
        }
      }, {})
    }
  }, {})
}

function getDefinition ({ theme, colorRole, state, property }) {
  let color
  if (property.key === 'border-color') {
    color = `rgba(${colorRole.baseRgbCsv}, 0.3)`
  }
  else if (property.key === 'color') {
    color = state.key === 'default' ? 'rgba(255, 255, 255, 1)' : `{color.${colorRole.key}.${theme.key}.default.color}`
  } else {
    if (colorRole.baseRgbCsv) {
      color = `rgba(${colorRole.baseRgbCsv}, ${state.baseOpacity})`
    } else {
      color = colorRole.base
    }
  }
  return {
    value: color,
    description: `Color Role: ${colorRole.description}\nUI Element: ${theme.description}\nState: ${state.description}\nProperty: ${property.description}`,
    type: "color"
  }
}

fs.writeFileSync('./tokens/color.json', JSON.stringify(jsonObj, null, 2))