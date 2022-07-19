### Color naming convention
Naming should follow this convention:
`color-<color-variant>-<state>-<style-property>`

You can see how we generated the base set of placeholder colors in ./scripts/generate-base-colors.mjs

color-variant is one of:  
  `primary` | `secondary` | `bg` | `surface` | `dialog` | `critical` | `warning`

state is one of:  
  `default` | `disabled` | `hovered` | `pressed` | `selected` | `backdrop` | `muted`

style-property is roughly equal to the css property. fill == background (using background as name would be confusing with bg color-variant)
  `fill` | `text-on-fill` | `text` | `border` | `shadow`
  Note that `text` is for having <color variant> colored text, and `text-on-fill` is almost always going to be white/black - the color that looks good on top of the fill color

### Spacing
- Spacing tokens are used for component-level spacing
- Layout spacing tokens are used for page-layout-level spacing