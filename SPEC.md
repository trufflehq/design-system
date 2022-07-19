## Color naming convention
Naming should follow this convention:
`color-<color-role>-<state>-<style-property>`

You can see how we generated the base set of placeholder colors in ./scripts/generate-base-colors.mjs

color-role is one of:  
  `primary` | `secondary` | `bg` | `surface` | `dialog` | `critical` | `warning`

state is one of:  
  `default` | `disabled` | `hovered` | `pressed` | `selected` | `muted` | `outlined`

style-property is roughly equal to the css property. fill == background (using background as name would be confusing with bg color-role)
  `fill` | `text-on-fill` | `text` | `border` | `shadow` | `backdrop`)

Note that `text` is for having <color-role> colored text, and `text-on-fill` is almost always going to be white/black - the color that looks good on top of the fill color

`backdrop` is only available for the `dialog` color-role

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

### Potential pitfalls
- For a border color in a transparent box on top of background color, where the desired color is primary color, the most intuitive variable to use is `--tfl-color-primary-default-border`, but that's probably not the right variable we want, since `--tfl-color-primary-default-border` is used in anything with `--tfl-color-primary-default-fill` background (eg buttons) and `--tfl-color-primary-default-border` might be transparent
  - What might make sense there is `--tfl-color-primary-transparent-border`

- `--tfl-color-primary-default-text` might have the correct contrast on `--tfl-color-bg-default-fill`, but not enough contrast on `--tfl-color-dialog-default-fill` (eg if bg is black and dialog is white)


## Spacing
- Spacing tokens are used for component-level spacing
- Layout spacing tokens are used for page-layout-level spacing