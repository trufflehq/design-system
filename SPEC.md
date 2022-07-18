### Color naming convention
Naming should follow this convention:
`color-((<text-state>-)?on-)?<color-variant><subject-type>(-<state>)?`

text-state (optional) is one of:  
  `hovered`

color-variant is one of:  
  `primary` | `secondary` | `bg` | `surface` | `dialog` | `accent1` | `neutral` | `critical` | `warning`

subject-type is what the color-variant is being applied to:  
  `fill` | `text` | `border` | `shadow`
  Note that `text` is for having, for example, a primary colored text, *not* the text color on primary fill

state (optional, defaults to `default`) is one of:  
  `disabled` | `hovered` | `pressed` | `selected` | `backdrop` | `muted`

If `on-` is specified, the token is for the text/text color on the other color.  
eg. `color-on-primary` is the text/text color for a button with primary fill color.  
eg. `color-hovered-on-bg-fill` is a hovered text/text color on a page background color  
If subject-type is `fill`, a matching `on-` state must be specified.

Potential spec changes we could consider:
- `color-((<text-state>-)?<text-subject-type>-)?on-)?<color-variant><subject-type>(-<state>)?`
  - if we need different colors for text or icons/links on top of a certain color
- we may want to be able to have multiple non-state variations of a color. eg bg1 #000, bg2 #111, bg3 #222
  - could either have an additional color-variant/subject-type/state. unsure which is best
  - color-bg1-fill, color-bg1-fill-hovered, color-on-bg1-fill, ...
    - would default to color-bg-fill values unless specified by theme

https://www.shadegenerator.com is a nifty tool for choosing alternate states (eg hovered)

### Spacing
- Spacing tokens are used for component-level spacing
- Layout spacing tokens are used for page-layout-level spacing