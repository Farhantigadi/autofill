# Chrome Autofill Extension - Production Build Guide

## 1. Prepare Production Files

### 1.1 Clean Code for Production

**Remove Debug Code:**
```bash
# Search and remove all console.log statements
grep -r "console.log" . --exclude-dir=node_modules
# Remove manually or use:
sed -i '/console\.log/d' *.js
```

**Clean manifest.json:**
```json
{
  "manifest_version": 3,
  "name": "Job Application Autofill",
  "version": "1.0.0",
  "description": "Auto-fill job application forms with stored profile data",
  "permissions": [
    "activeTab",
    "storage",
    "scripting"
  ],
  "host_permissions": [
    "*://*/*"
  ],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "all_frames": true,
      "run_at": "document_end"
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_title": "Auto-fill Job Application"
  },
  "web_accessible_resources": [
    {
      "resources": ["injected.js"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

### 1.2 Folder Structure

```
autofill-extension/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── injected.js
├── profile.html
├── profile.js
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md
└── CHANGELOG.md
```

### 1.3 Minify JavaScript (Optional)

**Using Terser:**
```bash
npm install -g terser
terser popup.js -o popup.min.js -c -m
terser content.js -o content.min.js -c -m
terser profile.js -o profile.min.js -c -m
```

**Update manifest.json if using minified files:**
```json
"content_scripts": [
  {
    "js": ["content.min.js"]
  }
]
```

### 1.4 Include Profile Data

**Default profile is embedded in popup.js getDefaultProfile() method. No additional files needed.**

## 2. Create Production ZIP

### 2.1 Required Files Checklist

**Core Files:**
- [ ] manifest.json
- [ ] popup.html
- [ ] popup.js (or popup.min.js)
- [ ] content.js (or content.min.js)
- [ ] injected.js
- [ ] profile.html
- [ ] profile.js (or profile.min.js)

**Assets:**
- [ ] icons/icon16.png
- [ ] icons/icon48.png
- [ ] icons/icon128.png

**Documentation:**
- [ ] README.md
- [ ] CHANGELOG.md

### 2.2 Create ZIP Package

**Command Line:**
```bash
# Navigate to extension directory
cd autofill-extension

# Create production ZIP
zip -r autofill-extension-v1.0.0.zip . -x "*.git*" "node_modules/*" "*.DS_Store" "test-*"
```

**Manual ZIP Creation:**
1. Select all required files (not the parent folder)
2. Right-click → "Send to" → "Compressed folder" (Windows)
3. Name: `autofill-extension-v1.0.0.zip`

**Verify ZIP Contents:**
```bash
unzip -l autofill-extension-v1.0.0.zip
```

## 3. Installation & Testing

### 3.1 Load Extension in Chrome

**Enable Developer Mode:**
1. Open Chrome → `chrome://extensions/`
2. Toggle "Developer mode" (top-right)
3. Click "Load unpacked"
4. Select extension folder (not ZIP)
5. Extension appears with ID and toggle

**Verify Installation:**
- Extension icon visible in toolbar
- No error messages in extensions page
- Click icon → popup opens correctly

### 3.2 Test in Incognito Mode

**Enable Incognito Access:**
1. `chrome://extensions/` → Find your extension
2. Click "Details"
3. Toggle "Allow in incognito"
4. Open incognito window
5. Test extension functionality

### 3.3 Verify Content Script Injection

**Check Injection:**
1. Open any webpage
2. Press F12 → Console tab
3. Type: `window.autofillEngine`
4. Should return object (not undefined)

**Debug Content Script:**
```javascript
// In browser console
console.log(window.autofillEngine);
chrome.storage.local.get(['profile'], console.log);
```

### 3.4 Platform Testing

#### A. Sample HTML Form Test

**Create test-form.html:**
```html
<!DOCTYPE html>
<html>
<body>
  <form>
    <input name="firstName" placeholder="First Name">
    <input name="lastName" placeholder="Last Name">
    <input type="email" name="email" placeholder="Email">
    <input name="phone" placeholder="Phone">
    <input name="city" placeholder="City">
    <select name="country">
      <option value="">Select Country</option>
      <option value="IN">India</option>
    </select>
  </form>
</body>
</html>
```

**Test Steps:**
1. Open test-form.html in Chrome
2. Click extension icon → "Auto-Fill Form"
3. Verify all fields populated
4. Check country dropdown selected

#### B. Workday Testing

**Target Sites:**
- `company.wd1.myworkdayjobs.com`
- Any Workday careers portal

**Test Process:**
1. Navigate to job posting
2. Click "Apply" → Wait for iframe load
3. Click extension → "Auto-Fill Form"
4. Verify basic fields filled
5. Navigate through multi-step form
6. Test each section separately

**Debug Workday:**
```javascript
// Check iframe detection
console.log(window.autofillEngine.iframes.size);
// Check profile data
chrome.storage.local.get(['profile'], console.log);
```

#### C. Greenhouse Testing

**Target Sites:**
- `boards.greenhouse.io/company-name`

**Test Steps:**
1. Find job → "Apply for this job"
2. Fill basic info section
3. Click extension → "Auto-Fill Form"
4. Verify contact details filled
5. Continue to next sections
6. Test file upload fields (should be skipped)

#### D. LinkedIn Easy Apply

**Test Process:**
1. LinkedIn Jobs → Find "Easy Apply" job
2. Click "Easy Apply"
3. Click extension → "Auto-Fill Form"
4. Verify profile info populated
5. Continue through steps
6. Test skills section

#### E. Naukri Testing

**Test Steps:**
1. Naukri.com → Login → Apply to job
2. Click extension → "Auto-Fill Form"
3. Verify Indian-specific fields:
   - City: "Belagavi"
   - State: "Karnataka"
   - Phone: "+916362888293"
4. Check experience fields

## 4. CSP (Content Security Policy) Issues

### 4.1 MV3 CSP Restrictions

**What's NOT Allowed:**
- `eval()` and `new Function()`
- Inline `<script>` tags
- `javascript:` URLs
- Remote script loading
- `unsafe-inline` or `unsafe-eval`

**What IS Allowed:**
- `chrome.scripting.executeScript()`
- Separate .js files
- `postMessage()` communication
- Web accessible resources

### 4.2 Workday CSP Workarounds

**Problem:** Workday blocks script injection

**Solution 1 - Chrome Scripting API:**
```javascript
// In content.js
chrome.scripting.executeScript({
  target: { tabId: tab.id, allFrames: true },
  files: ['injected.js']
});
```

**Solution 2 - PostMessage Communication:**
```javascript
// Parent to iframe
iframe.contentWindow.postMessage({
  type: 'AUTOFILL_PROFILE',
  profile: this.profile
}, '*');

// Iframe response
window.addEventListener('message', (event) => {
  if (event.data.type === 'AUTOFILL_PROFILE') {
    // Fill form
  }
});
```

**Solution 3 - Web Accessible Resources:**
```json
"web_accessible_resources": [
  {
    "resources": ["injected.js"],
    "matches": ["<all_urls>"]
  }
]
```

### 4.3 CSP Debugging

**Check CSP Headers:**
```javascript
// In DevTools Console
fetch(location.href).then(r => 
  console.log(r.headers.get('content-security-policy'))
);
```

**Common CSP Errors:**
- "Refused to execute inline script"
- "Refused to load the script"
- "Refused to evaluate a string as JavaScript"

**Fix Strategy:**
1. Move inline scripts to separate files
2. Use `chrome.scripting` instead of direct injection
3. Use `postMessage` for cross-frame communication
4. Declare all resources in `web_accessible_resources`

## 5. Versioning Best Practices

### 5.1 Semantic Versioning (SemVer)

**Format:** `MAJOR.MINOR.PATCH`

**When to Increment:**
- **MAJOR (1.0.0 → 2.0.0):** Breaking changes, API changes
- **MINOR (1.0.0 → 1.1.0):** New features, backward compatible
- **PATCH (1.0.0 → 1.0.1):** Bug fixes, security patches

**Examples:**
- Initial release: `1.0.0`
- Add new platform support: `1.1.0`
- Fix field matching bug: `1.0.1`
- Change profile structure: `2.0.0`

### 5.2 Update manifest.json

```json
{
  "version": "1.2.3",
  "version_name": "1.2.3 - Enhanced Workday Support"
}
```

### 5.3 Maintain CHANGELOG.md

```markdown
# Changelog

## [1.2.0] - 2024-01-15
### Added
- Support for Naukri.com platform
- Middle name field detection
- Alternate phone number support

### Fixed
- Workday iframe injection issues
- LinkedIn Easy Apply multi-step forms

### Changed
- Improved field matching patterns
- Updated profile data structure

## [1.1.0] - 2024-01-01
### Added
- Greenhouse platform support
- Shadow DOM penetration
- Mutation observer for dynamic content

### Fixed
- CSP compliance issues
- Cross-origin iframe handling
```

### 5.4 Automated Versioning (CI/CD)

**GitHub Actions Example:**
```yaml
name: Build Extension
on:
  push:
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update version
        run: |
          VERSION=${GITHUB_REF#refs/tags/v}
          sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" manifest.json
      - name: Create ZIP
        run: zip -r extension-$VERSION.zip . -x "*.git*" "node_modules/*"
```

**Package.json Integration:**
```json
{
  "scripts": {
    "version": "node scripts/update-manifest-version.js",
    "build": "npm run clean && npm run minify && npm run zip"
  }
}
```

## 6. Final Production Checklist

**Before Release:**
- [ ] All console.log() removed
- [ ] No debugging alerts or test code
- [ ] Manifest permissions minimized
- [ ] Icons included (16px, 48px, 128px)
- [ ] README.md updated
- [ ] CHANGELOG.md updated
- [ ] Version number incremented
- [ ] ZIP file created correctly
- [ ] Tested on all target platforms
- [ ] CSP compliance verified
- [ ] Incognito mode tested
- [ ] No JavaScript errors in console

**File Size Optimization:**
- Minified JS files
- Compressed images
- Removed unused dependencies
- ZIP file under 10MB (Chrome Web Store limit)

**Security Review:**
- No hardcoded credentials
- No external API calls
- Local storage only
- Proper CSP compliance
- No eval() or unsafe practices