/*
Naming should follow this convention:
color-((<text-state>-)?on-)?<color-variant><subject-type>(-<state>)?

color-variant is one of:
  `primary` | `secondary` | `bg` | `surface` | `accent-1` | `critical` | `warning`
subject-type is what the color-variant is being applied to:
  `fill` | `text` | `border` | `shadow`
  Note that `text` is for having, for example, a primary colored text, *not* the text color on primary fill
state (optional, defaults to `default`) is one of:
  `disabled` | `hovered` | `pressed` | `selected` | `backdrop`

If `on-` is specified, the token is for the text/text color on the other color.
eg. `color-on-primary` is the text/text color for a button with primary fill color.
eg. `color-hovered-on-bg-fill` is a hovered text/text color on a page background color
If subject-type is `fill`, a matching `on-` state must be specified.

https://www.shadegenerator.com is a nifty tool for choosing alternate states (eg hovered)
*/
module.exports =  {
  "color-bg-fill": {
    value: "rgba(0, 0, 0, 1)",
    description: "Used as the page background color"
  },
  "color-on-bg-fill": {
    value: "rgba(255, 255, 255, 1)",
    description: "Used as the text color associated with `background: var(--tfl-color-bg)`"
  },
  "color-bg-fill-hovered": {
    value: "rgba(20, 20, 20, 1)",
    description: "Used as hovered-state background-color for elements with same background color as page"
  },
  "color-on-bg-fill-hovered": {
    value: "rgba(255, 255, 255, 1)",
    description: "Used as the text color associated with `background: var(--tfl-color-bg-fill-hovered)`"
  },
  "color-bg-fill-selected": {
    value: "rgba(30, 30, 30, 1)",
    description: "Used as selected-state background-color for elements with same background color as page"
  },
  "color-on-bg-fill-selected": {
    value: "rgba(30, 30, 30, 1)",
    description: "Used as the text color associated with `background: var(--tfl-color-bg-fill-selected)`"
  },
  "color-bg-fill-backdrop": {
    value: "rgba(255, 255, 255, 0.1)",
    description: "Used as the backdrop (in dialogs) color for page background"
  },
  "color-on-bg-fill-backdrop": {
    value: "rgba(0, 0, 0, 1)",
    description: "Used as the text color associated with `background: var(--tfl-color-bg-fill-backdrop)`"
  },
  "color-surface-fill": {
    value: "rgba(20, 20, 20, 1)",
    description: "Used as the default background color for surfaces (modals, cards, etc...)"
  },
  "color-on-surface-fill": {
    value: "rgba(255, 255, 255, 1)",
    description: "Used as the text color associated with `background: var(--tfl-color-surface-fill)`"
  },
  "color-primary-fill": {
    value: "rgba(250, 108, 175, 1)",
    description: "Used as the default background color for primary actions (eg buttons)"
  },
  "color-on-primary-fill": {
    value: "rgba(255, 255, 255, 1)",
    description: "Used as the text color associated with `background: var(--tfl-color-primary-fill)`"
  },
  "color-primary-fill-hovered": {
    value: "rgba(251, 123, 183, 1)",
    description: "Used as the hovered-state background color for primary actions (eg buttons)"
  },
  "color-on-primary-fill-hovered": {
    value: "rgba(255, 255, 255, 1)",
    description: "Used as the text color associated with `background: var(--tfl-color-primary-fill-hovered)`"
  },
  "color-primary-fill-pressed": {
    value: "rgba(251, 130, 187, 1)",
    description: "Used as the pressed-state background color for primary actions (eg buttons)"
  },
  "color-on-primary-fill-pressed": {
    value: "rgba(255, 255, 255, 1)",
    description: "Used as the text color associated with `background: var(--tfl-color-primary-fill-pressed)`"
  },
  "color-primary-fill-disabled": {
    value: "rgba(150, 65, 105, 1)",
    description: "Used as the disabled-state background color for primary actions (eg buttons)"
  },
  "color-on-primary-fill-disabled": {
    value: "rgba(255, 255, 255, 1)",
    description: "Used as the text color associated with `background: var(--tfl-color-primary-fill-disabled)`"
  },
};
