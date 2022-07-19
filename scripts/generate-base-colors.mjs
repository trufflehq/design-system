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

const UI_ELEMENTS = {
  // interactive elements
  ACTION: {
    key: 'action',
    baseOpacity: '1',
    description: 'Action - Buttons and fabs',
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  LINK: {
    key: 'link',
    baseOpacity: '1',
    description: 'Link - Plain text links (needs to be legible on background surface color)',
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  TAB: {
    key: 'tab',
    baseOpacity: '1',
    description: 'Tab - Fancier links for tabs / navigation',
    states: [STATES.DEFAULT, ...INTERACTIVE_STATES],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },

  // static elements
  SYMBOL: {
    key: 'symbol',
    baseOpacity: '1',
    description: 'Symbol - Header text, paragraph text, icons, (needs to be legible on background surface color)',
    states: [STATES.DEFAULT],
    properties: [PROPERTIES.COLOR]
  },
  DIALOG: {
    key: 'dialog',
    baseOpacity: '1',
    description: 'Dialog - Dialogs and modals',
    states: [STATES.DEFAULT],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  },
  SURFACE: {
    key: 'surface',
    baseOpacity: '0.5',
    description: 'Surface - Cards, warning messages, info boxes, etc... Background is typically muted color, border is higher contrast',
    states: [STATES.DEFAULT],
    properties: [PROPERTIES.BACKGROUND, PROPERTIES.COLOR, PROPERTIES.BORDER_COLOR]
  }
}

const COLOR_ROLES = {
  PRIMARY: {
    key: 'primary',
    // these are placeholder color values. actual value will be set in figma
    baseRgbCsv: '243,87,161',
    description: 'Used for key UI elements (buttons, active states, etc...)',
    uiElements: [UI_ELEMENTS.ACTION, UI_ELEMENTS.LINK, UI_ELEMENTS.TAB, UI_ELEMENTS.SYMBOL, UI_ELEMENTS.SURFACE]
  },
  SECONDARY: {
    key: 'secondary',
    baseRgbCsv: '127,288,220',
    description: 'Alternate color used for less prominent UI elements, and for adding variety',
    uiElements: [UI_ELEMENTS.ACTION, UI_ELEMENTS.LINK, UI_ELEMENTS.TAB, UI_ELEMENTS.SYMBOL, UI_ELEMENTS.SURFACE]
  },
  BG: {
    key: 'bg',
    baseRgbCsv: '0,0,0',
    description: 'Background color for the page',
    uiElements: [UI_ELEMENTS.ACTION, UI_ELEMENTS.DIALOG, UI_ELEMENTS.TAB, UI_ELEMENTS.SURFACE]
  },
  CRITICAL: {
    key: 'critical',
    baseRgbCsv: '176,16,56',
    description: 'Color for critical actions and errors',
    uiElements: [UI_ELEMENTS.ACTION, UI_ELEMENTS.LINK, UI_ELEMENTS.SYMBOL, UI_ELEMENTS.SURFACE]
  },
  WARNING: {
    key: 'warning',
    baseRgbCsv: '255,218,7',
    description: 'Color for semi-critical actions and warnings',
    uiElements: [UI_ELEMENTS.ACTION, UI_ELEMENTS.LINK, UI_ELEMENTS.SYMBOL, UI_ELEMENTS.SURFACE]
  },
  SUCCESS: {
    key: 'success',
    baseRgbCsv: '0,255,0',
    description: 'Color for successful actions',
    uiElements: [UI_ELEMENTS.ACTION, UI_ELEMENTS.LINK, UI_ELEMENTS.SYMBOL, UI_ELEMENTS.SURFACE]
  },
  // we can add these if/when needed: accent1, accent2, neutral
}

// theme creators realistically shouldn't need to set all of these. we'll have good fallbacks

const jsonObj = {
  color: Object.values(COLOR_ROLES).reduce((obj, colorRole) => {
    return {
      ...obj,
      [colorRole.key]: colorRole.uiElements.reduce((obj, uiElement) => {
        return {
          ...obj,
          [uiElement.key]: uiElement.states.reduce((obj, state) => {
            return {
              ...obj,
              [state.key]: uiElement.properties.reduce((obj, property) => {
                const color = getDefinition({ uiElement, colorRole, state, property })
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

function getDefinition ({ uiElement, colorRole, state, property }) {
  let color
  if (property.key === 'border-color') {
    color = `rgba(${colorRole.baseRgbCsv}, 0.3)`
  }
  else if (property.key === 'color') {
    color = state.key === 'default' ? 'rgba(255, 255, 255, 1)' : `{color.${colorRole.key}.${uiElement.key}.default.color}`
  } else {
    if (colorRole.baseRgbCsv) {
      color = `rgba(${colorRole.baseRgbCsv}, ${state.baseOpacity})`
    } else {
      color = colorRole.base
    }
  }
  return {
    value: color,
    description: `Color Role: ${colorRole.description}\nUI Element: ${uiElement.description}\nState: ${state.description}\nProperty: ${property.description}`,
    type: "color"
  }
}

fs.writeFileSync('./tokens/color.json', JSON.stringify(jsonObj, null, 2))