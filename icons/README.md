# Extension Icons

Place your extension icons in this folder:

- **icon16.png** - 16x16px - Toolbar icon
- **icon48.png** - 48x48px - Extension management page
- **icon128.png** - 128x128px - Chrome Web Store

## Icon Requirements

- **Format:** PNG with transparency
- **Design:** Simple, recognizable at small sizes
- **Colors:** Professional, consistent with brand
- **Content:** Avoid text, use symbols/graphics

## Suggested Design

A simple form/document icon with an auto-fill arrow or checkmark symbol.

## Update manifest.json

```json
"icons": {
  "16": "icons/icon16.png",
  "48": "icons/icon48.png", 
  "128": "icons/icon128.png"
}
```