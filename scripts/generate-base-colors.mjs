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
    key: 'action-high-emphasis', // TODO: convert to highx for cssvar
    description: 'High emphasis buttons, fabs, tags, etc...',
    formula: ({ colorRole, state }) => {
      // same as flat
      return {
        [PROPERTIES.BACKGROUND.key]: `{color.${colorRole.key}.flat.${state.key}.${PROPERTIES.BACKGROUND.key}}`,
        [PROPERTIES.COLOR.key]: `{color.${colorRole.key}.flat.${state.key}.${PROPERTIES.COLOR.key}}`,
        [PROPERTIES.BORDER_COLOR.key]: `{color.${colorRole.key}.flat.${state.key}.${PROPERTIES.BORDER_COLOR.key}}`
      }
    }
  },
  ACTION_MEDIUM_EMPHASIS: {
    key: 'action-med-emphasis', // TODO: convert to medx for cssvar
    description: 'Medium emphasis buttons, fabs, tags, etc...',
    formula: ({ colorRole, state }) => {
      // outline
      return {
        [PROPERTIES.BACKGROUND.key]: 'transparent',
        [PROPERTIES.COLOR.key]: `{color.${colorRole.key}.flat.${state.key}.${PROPERTIES.BACKGROUND.key}}`,
        [PROPERTIES.BORDER_COLOR.key]: `{color.${colorRole.key}.flat.${state.key}.${PROPERTIES.BACKGROUND.key}}`,
      }
    }
  },
  ACTION_LOW_EMPHASIS: {
    key: 'action-low-emphasis', // TODO: convert to lowx for cssvar
    description: 'Low emphasis buttons, fabs, tags, etc...',
    formula: ({ colorRole, state }) => {
      // text
      return {
        [PROPERTIES.BACKGROUND.key]: 'transparent',
        [PROPERTIES.COLOR.key]: `{color.${colorRole.key}.flat.${state.key}.${PROPERTIES.BACKGROUND.key}}`,
        [PROPERTIES.BORDER_COLOR.key]: 'transparent',
      }
    }
  },
  INPUT: {
    key: 'input',
    description: 'Text inputs and textareas',
    formula: ({ colorRole, state }) => {
      // outline
      return {
        [PROPERTIES.BACKGROUND.key]: 'transparent',
        [PROPERTIES.COLOR.key]: `{color.${colorRole.key}.flat.${state.key}.${PROPERTIES.BACKGROUND.key}}`,
        [PROPERTIES.BORDER_COLOR.key]: `{color.${colorRole.key}.flat.${state.key}.${PROPERTIES.BACKGROUND.key}}`,
      }
    }
  },
  FOREGROUND: {
    key: 'fg',
    description: 'Header text, paragraph text, icons, links (needs to be legible on background surface color)',
    formula: ({ colorRole, state }) => {
      // text
      return {
        [PROPERTIES.BACKGROUND.key]: 'transparent',
        [PROPERTIES.COLOR.key]: `{color.${colorRole.key}.flat.${state.key}.${PROPERTIES.BACKGROUND.key}}`,
        [PROPERTIES.BORDER_COLOR.key]: 'transparent',
      }
    }
  },
  SURFACE: {
    key: 'surface',
    description: 'Cards, dialogs, etc...',
    formula: ({ colorRole, state }) => {
      // text
      return {
        [PROPERTIES.BACKGROUND.key]: 'rgba(255, 255, 255, 0.05',
        [PROPERTIES.COLOR.key]: 'inherit',
        [PROPERTIES.BORDER_COLOR.key]: 'transparent',
      }
    }
  },
  FLAT: {
    key: 'flat',
    description: 'Flat background',
    formula: ({ colorRole }) => {
      return {
        [PROPERTIES.BACKGROUND.key]: `rgba(${colorRole.baseRgbCsv},1)`,
        [PROPERTIES.COLOR.key]: `rgba(255, 255, 255, 1)`,
        [PROPERTIES.BORDER_COLOR.key]: 'transparent'
      }
    }
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
  return {
    value: variant.formula?.({ colorRole, state })[property.key] || 'rgba(255, 0, 0, 1)',
    description: `Color Role: ${colorRole.description}\nUI Element: ${variant.description}\nState: ${state.description}\nProperty: ${property.description}`,
    type: "color"
  }
}

fs.writeFileSync('./tokens/color.json', JSON.stringify(jsonObj, null, 2))