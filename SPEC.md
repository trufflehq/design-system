## Color naming convention
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

### Examples
**Primary-colored button**
```css
.button {
  background: var(--tfl-color-primary-default-fill);
  color: var(--tfl-color-primary-default-text-on-fill);
  border: var(--tfl-color-primary-default-border);
}

.button:hover {
  background: var(--tfl-color-primary-hovered-fill);
  color: var(--tfl-color-primary-hovered-text-on-fill);
  border: var(--tfl-color-primary-hovered-border);
}
```

**Secondary-colored link**
```css
.link {
  background: var(--tfl-color-primary-default-text);
}

.link:hover {
  background: var(--tfl-color-primary-hovered-text);
}
```

### Implementing
In the future, you should see it in Figma (once that's setup we can add a video for using the figma-tokens plugin to inspect).

If it's not in Figma, always use the color name that makes the most sense for what you're building. The majority of variables are references to other variables. Eg `--tfl-color-primary-hovered-border` is defined as `var(--tfl-color-primary-hovered-fill)`. But we still want to use `--tfl-color-primary-hovered-border` in case a theme developer chooses to have that color be different from the non-hovered border color.

## Spacing
- Spacing tokens are used for component-level spacing
- Layout spacing tokens are used for page-layout-level spacing