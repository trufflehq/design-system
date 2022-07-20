import fs from 'fs'

// used for initial setup. shouldn't really need to use again

const STATES = {
  DEFAULT: {
    key: 'default',
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
    description: 'Selective/Active/Highlighted'
  }
}

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
const VARIANTS = {
  // ui-elements, so theme devs can color separately
  ACTION_HIGH_EMPHASIS: {
    name: 'Action (high emphasis)',
    key: 'highx',
    description: 'High emphasis buttons, fabs, tags, etc...'
  },
  ACTION_MEDIUM_EMPHASIS: {
    key: 'medx',
    description: 'Medium emphasis buttons, fabs, tags, etc...'
  },
  ACTION_LOW_EMPHASIS: {
    key: 'lowx',
    description: 'Low emphasis buttons, fabs, tags, etc...'
  },
  INPUT: {
    key: 'input',
    description: 'Text inputs and textareas'
  },
  FOREGROUND: {
    key: 'fg',
    description: 'Header text, paragraph text, icons, links (needs to be legible on background surface color)'
  },
  SURFACE: {
    key: 'surface',
    description: 'Cards, dialogs, etc...'
  },
  FLAT: {
    key: 'flat',
    description: 'Flat background'
  },
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
      [colorRole.key]: Object.values(VARIANTS).reduce((obj, variant) => {
        return {
          ...obj,
          [variant.key]: Object.values(STATES).reduce((obj, state) => {
            return {
              ...obj,
              [state.key]: Object.values(PROPERTIES).reduce((obj, property) => {
                const color = getDefinition({ variant, colorRole, state, property })
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

function getDefinition ({ variant, colorRole, state, property }) {
  let color
  if (property.key === 'border-color') {
    color = `rgba(${colorRole.baseRgbCsv}, 0.3)`
  }
  else if (property.key === 'color') {
    color = state.key === 'default' ? 'rgba(255, 255, 255, 1)' : `{color.${colorRole.key}.${variant.key}.default.color}`
  } else {
    if (colorRole.baseRgbCsv) {
      color = `rgba(${colorRole.baseRgbCsv}, ${state.baseOpacity || 1})`
    } else {
      color = colorRole.base
    }
  }
  return {
    value: color,
    description: `Color Role: ${colorRole.description}\nUI Element: ${variant.description}\nState: ${state.description}\nProperty: ${property.description}`,
    type: "color"
  }
}

fs.writeFileSync('./tokens/color.json', JSON.stringify(jsonObj, null, 2))