# Installation Guide

## Quick Setup

1. **Open Chrome Extensions**
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)

2. **Load Extension**
   - Click "Load unpacked"
   - Select the `Autofill` folder
   - Extension should appear in toolbar

3. **Test Extension**
   - Open `test-extension.html` in browser
   - Click extension icon in toolbar
   - Click "Auto-Fill Form"

## Troubleshooting

### Extension not working?
1. Check console for errors (F12)
2. Refresh the page after loading extension
3. Make sure Developer mode is enabled

### No fields filled?
1. Open extension popup
2. Click "Manage Profile" 
3. Fill in your information
4. Save profile
5. Try auto-fill again

### Test the extension:
1. Open `index.html` (main test form)
2. Click extension icon
3. Click "Auto-Fill Form"
4. Should fill ~20 fields automatically

## Files Structure
- `manifest.json` - Extension configuration
- `src/popup/` - Extension popup interface
- `src/content/` - Form filling logic
- `src/profile/` - Profile management
- `index.html` - Test form (Workday-style)
- `test-extension.html` - Simple test page