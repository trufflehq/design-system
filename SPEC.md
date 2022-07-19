## Color naming convention
Naming should follow this convention:
`color-<color-role>-<ui-element>-<state>-<property>`

You can see how we generated the base set of placeholder colors in ./scripts/generate-base-colors.mjs

**color-role** is one of:  
- `primary`
- `secondary`
- `bg`
- `critical`
- `warning`
- `success`

**ui-element** is one of:  
- `action` - Buttons and fabs (interactive)
- `link` - Plain text links (needs to be legible on background surface color) (interactive)
- `tab` - Fancier links for tabs / navigation (interactive)
- `symbol` - Header text, paragraph text, icons, (needs to be legible on background surface color)
- `dialog` - Dialogs and modals
- `surface` - Cards, warning messages, info boxes, etc... Background is typically muted color, border is higher contrast

**state** is one of:  
- `default`
- `disabled` - (only for interactive ui-elements)
- `hovered` - (only for interactive ui-elements)
- `pressed` - (only for interactive ui-elements)
- `selected` - (only for interactive ui-elements)

**property** a css property and one of:
- `background`
- `color`
- `border-color`

### Examples
**Primary-colored button**
```css
.button {
  background: var(--tfl-color-primary-action-default-background);
  color: var(--tfl-color-primary-action-default-color);
  border-color: var(--tfl-color-primary-action-default-border-color);
}

.button:hover {
  background: var(--tfl-color-primary-action-hovered-background);
  color: var(--tfl-color-primary-action-hovered-color);
  border-color: var(--tfl-color-primary-action-hovered-border-color);
}
```

**Secondary-colored link**
```css
.link {
  color: var(--tfl-color-secondary-link-default-color);
}

.link:hover {
  color: var(--tfl-color-secondary-link-hovered-color);
}
```

### Implementing
In the future, you should see it in Figma (once that's setup we can add a video for using the figma-tokens plugin to inspect).

If it's not in Figma, always use the color name that makes the most sense for what you're building. The majority of variables are references to other variables. Eg `--tfl-color-primary-action-hovered-border-color` is defined as `var(--tfl-color-primary-action-hovered-background)`. But we still want to use `--tfl-color-primary-action-hovered-border-color` in case a theme developer chooses to have that color be different from the non-hovered border color.

## Spacing
- Spacing tokens are used for component-level spacing
- Layout spacing tokens are used for page-layout-level spacing