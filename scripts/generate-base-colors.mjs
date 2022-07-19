import fs from 'fs'

// used for initial setup. shouldn't really need to use again

const ROLES = {
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
  DIALOG: {
    key: 'dialog',
    baseRgbCsv: '30,30,30',
    description: 'Color for dialogs and any content that overlays the page'
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
  },
  // we can add these if/when needed: accent1, accent2, neutral
}

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

const UI_ELEMENTS = {
  // interactive elements
  ACTION: {
    key: 'action',
    baseOpacity: '1',
    description: 'Buttons',
    roles: [ROLES.PRIMARY, ROLES.SECONDARY, ROLES.BG, ROLES.CRITICAL, ROLES.WARNING, ROLES.SUCCESS],
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  LINK: {
    key: 'link',
    baseOpacity: '1',
    description: 'Plain text links',
    roles: [ROLES.PRIMARY, ROLES.SECONDARY, ROLES.CRITICAL, ROLES.WARNING, ROLES.SUCCESS],
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  TAB: {
    key: 'tab',
    baseOpacity: '1',
    description: 'Fancier links for tabs / navigation',
    roles: [ROLES.PRIMARY, ROLES.SECONDARY, ROLES.BG],
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },

  // static elements
  SYMBOL: {
    key: 'symbol',
    baseOpacity: '1',
    description: 'Header text, paragraph text, icons, (needs to be legible on background surface color)',
    roles: [ROLES.PRIMARY, ROLES.SECONDARY, ROLES.CRITICAL, ROLES.WARNING, ROLES.SUCCESS],
    states: [STATES.DEFAULT],
    properties: [PROPERTIES.COLOR]
  },
  SURFACE: {
    key: 'surface',
    baseOpacity: '0.5',
    description: 'Card, warning message, info box, etc... Fill is typically muted color, border is higher contrast',
    roles: [ROLES.PRIMARY, ROLES.SECONDARY, ROLES.BG, ROLES.CRITICAL, ROLES.WARNING, ROLES.SUCCESS],
    states: [STATES.DEFAULT],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  }
}

// theme creators realistically shouldn't need to set all of these. we'll have good fallbacks

const jsonObj = Object.values(UI_ELEMENTS).reduce((obj, uiElement) => {
  return {
    ...obj,
    [uiElement.key]: uiElement.roles.reduce((obj, role) => {
      return {
        ...obj,
        [role.key]: uiElement.states.reduce((obj, state) => {
          return {
            ...obj,
            [state.key]: uiElement.properties.reduce((obj, property) => {
              const color = getDefinition({ role, state, property })
              return {
                ...obj,
                [property.key]: color
              }
            }, {})
          }
        })
      }
    }, {})
  }
}, {})

function getDefinition ({ role, state, property }) {
  let color
  if (['shadow', 'border', 'text'].includes(property.key)) {
    color = `{color.${role.key}.${state.key}.fill}`
  }
  else if (property.key === 'text-on-fill') {
    color = state.key === 'default' ? 'rgba(255, 255, 255, 1)' : `{color.${role.key}.default.text-on-fill}`
  } else {
    if (role.baseRgbCsv) {
      color = `rgba(${role.baseRgbCsv}, ${state.baseOpacity})`
    } else {
      color = role.base
    }
  }
  return {
    value: color,
    description: `Group: ${role.description}\nState: ${state.description}\nProperty: ${property.description}`,
    type: "color"
  }
}

fs.writeFileSync('./tokens/color.json', JSON.stringify({ ui: jsonObj }, null, 2))