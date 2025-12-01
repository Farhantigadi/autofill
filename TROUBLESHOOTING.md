# 🔧 Extension Installation Troubleshooting

## ❌ Common Issues & Solutions

### Issue 1: Extension not visible after loading
**Symptoms:** Clicked "Load unpacked" but no extension appears

**Solutions:**
1. **Check folder selection** - Select the `Autofill` folder (not a subfolder)
2. **Check manifest.json** - Must be in root of selected folder
3. **Check file structure** - Ensure proper organization
4. **Reload extension** - Click refresh icon on extension card

### Issue 2: "Manifest file is missing or unreadable"
**Cause:** Wrong folder selected or corrupted manifest

**Solutions:**
1. Select the correct `Autofill` folder containing `manifest.json`
2. Check manifest.json syntax (use JSON validator)
3. Ensure file permissions are correct

### Issue 3: "Failed to load extension"
**Cause:** File structure or syntax errors

**Solutions:**
1. Check console errors in chrome://extensions/
2. Verify all referenced files exist
3. Check JavaScript syntax errors

## ✅ Step-by-Step Fix

### 1. Verify File Structure
Your `Autofill` folder should contain:
```
Autofill/
├── manifest.json          ← Must be here
├── src/
│   ├── popup/
│   │   ├── popup.html
│   │   └── popup.js
│   ├── content/
│   │   └── content.js
│   └── profile/
│       ├── profile.html
│       └── profile.js
└── public/
    └── icons/
        └── icon.svg
```

### 2. Check Manifest File
Open `manifest.json` and verify it contains:
```json
{
  "manifest_version": 3,
  "name": "Job Application Autofill",
  "version": "1.0.0"
}
```

### 3. Installation Steps
1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked"
5. Navigate to and SELECT the `Autofill` folder
6. Click "Select Folder" or "Open"

### 4. Verify Installation
- Extension card appears with name "Job Application Autofill"
- Extension icon appears in Chrome toolbar
- No error messages in red

## 🚨 Quick Fixes

### Fix 1: Clean Installation
```
1. Remove any existing extension
2. Download fresh copy of files
3. Ensure proper folder structure
4. Try installation again
```

### Fix 2: Check Permissions
```
1. Ensure you have write permissions to folder
2. Try running Chrome as administrator
3. Check antivirus isn't blocking files
```

### Fix 3: Alternative Method
```
1. Create new folder on Desktop
2. Copy all extension files there
3. Try loading from Desktop location
```

## 📋 Pre-Installation Checklist

- [ ] Chrome browser (not Edge/Firefox)
- [ ] Developer mode enabled
- [ ] Correct folder selected (contains manifest.json)
- [ ] All files present and readable
- [ ] No antivirus blocking

## 🔍 Debug Information

If still having issues, check:

1. **Chrome Version:** chrome://version/
2. **Extension Errors:** chrome://extensions/ → Developer mode → Errors
3. **Console Logs:** F12 → Console tab
4. **File Permissions:** Right-click folder → Properties → Security

## 📞 Still Need Help?

If extension still won't load:
1. Share screenshot of chrome://extensions/ page
2. Share error messages (if any)
3. Confirm Chrome version
4. Describe exact steps taken

**Most common fix:** Select the main `Autofill` folder, not a subfolder!