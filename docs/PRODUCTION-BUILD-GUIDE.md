# 🏗️ Production Build Guide

This guide provides comprehensive instructions for building, testing, and deploying the Job Application Autofill Extension for production use.

## 📋 Table of Contents

- [Quick Build Commands](#quick-build-commands)
- [Platform-Specific Instructions](#platform-specific-instructions)
- [Build Process Overview](#build-process-overview)
- [Production Checklist](#production-checklist)
- [Testing & Validation](#testing--validation)
- [Deployment Options](#deployment-options)
- [Security Guidelines](#security-guidelines)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## ⚡ Quick Build Commands

### Development Build
```bash
# Clone and setup
git clone https://github.com/yourusername/job-autofill-extension.git
cd job-autofill-extension

# Build for development
npm run build

# Load in Chrome
# 1. Go to chrome://extensions/
# 2. Enable Developer Mode
# 3. Click "Load unpacked"
# 4. Select the dist/ folder
```

### Production Build
```bash
# Create production-ready build
npm run build:prod

# Create distribution ZIP
npm run package

# Result: job-autofill-extension-v1.1.0.zip
```

### Quick Test
```bash
# Open test form
open docs/test-form.html

# Or serve locally
python -m http.server 8000
# Navigate to http://localhost:8000/docs/test-form.html
```

## 🖥️ Platform-Specific Instructions

### Windows

#### Prerequisites
```cmd
# Install Node.js (if using npm scripts)
# Download from https://nodejs.org/

# Or use Chocolatey
choco install nodejs

# Verify installation
node --version
npm --version
```

#### Build Process
```cmd
# Method 1: Using npm scripts
npm run build
npm run build:prod

# Method 2: Using batch script
scripts\build-production.bat

# Method 3: Manual build
mkdir dist
xcopy src dist\src /E /I
xcopy public dist\public /E /I
copy manifest.json dist\
```

#### Create ZIP Package
```cmd
# Using PowerShell
cd dist
powershell Compress-Archive -Path * -DestinationPath ..\job-autofill-extension.zip -Force
cd ..

# Using 7-Zip (if installed)
7z a job-autofill-extension.zip dist\*
```

### macOS

#### Prerequisites
```bash
# Install Node.js using Homebrew
brew install node

# Or download from https://nodejs.org/

# Verify installation
node --version
npm --version
```

#### Build Process
```bash
# Method 1: Using npm scripts
npm run build
npm run build:prod

# Method 2: Using shell script
chmod +x scripts/build-production.sh
./scripts/build-production.sh

# Method 3: Manual build
mkdir -p dist
cp -r src dist/
cp -r public dist/
cp manifest.json dist/
```

#### Create ZIP Package
```bash
# Using built-in zip
cd dist
zip -r ../job-autofill-extension.zip . -x "*.DS_Store"
cd ..

# Verify ZIP contents
unzip -l job-autofill-extension.zip
```

### Linux (Ubuntu/Debian)

#### Prerequisites
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using snap
sudo snap install node --classic

# Verify installation
node --version
npm --version
```

#### Build Process
```bash
# Method 1: Using npm scripts
npm run build
npm run build:prod

# Method 2: Using shell script
chmod +x scripts/build-production.sh
./scripts/build-production.sh

# Method 3: Manual build
mkdir -p dist
cp -r src dist/
cp -r public dist/
cp manifest.json dist/
```

#### Create ZIP Package
```bash
# Using zip utility
sudo apt-get install zip  # if not installed
cd dist
zip -r ../job-autofill-extension.zip . -x "*.DS_Store"
cd ..
```

## 🔄 Build Process Overview

### 1. Pre-Build Validation
```bash
# Validate manifest.json
node -e "console.log(JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')))"

# Check file structure
ls -la src/
ls -la public/

# Validate JavaScript syntax
node -c src/content/content.js
node -c src/popup/popup.js
node -c src/profile/profile.js
```

### 2. Build Steps

#### Automated Build (Recommended)
```javascript
// scripts/build.js
const fs = require('fs');
const path = require('path');

// 1. Clean dist folder
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
fs.mkdirSync('dist');

// 2. Copy source files
copyDir('src', 'dist/src');
copyDir('public', 'dist/public');

// 3. Copy manifest
fs.copyFileSync('manifest.json', 'dist/manifest.json');

// 4. Validate build
validateBuild();
```

#### Manual Build Steps
1. **Clean**: Remove existing `dist/` folder
2. **Copy**: Copy `src/`, `public/`, and `manifest.json` to `dist/`
3. **Validate**: Check all files are present and valid
4. **Package**: Create ZIP file for distribution

### 3. Post-Build Validation
```bash
# Check dist structure
tree dist/  # or ls -R dist/

# Validate manifest in dist
node -e "console.log(JSON.parse(require('fs').readFileSync('dist/manifest.json', 'utf8')))"

# Check file sizes
du -sh dist/*
```

## ✅ Production Checklist

### Code Quality
- [ ] **Remove Debug Code**: No `console.log()`, `alert()`, or debug statements
- [ ] **Error Handling**: All functions have proper error handling
- [ ] **Code Comments**: Complex logic is documented
- [ ] **Consistent Style**: Code follows established patterns
- [ ] **No Hardcoded Data**: All configuration is externalized

### Security Review
- [ ] **Minimal Permissions**: Only required permissions in manifest
- [ ] **No External Calls**: No unauthorized network requests
- [ ] **Input Sanitization**: All user inputs are sanitized
- [ ] **CSP Compliance**: Content Security Policy requirements met
- [ ] **No Sensitive Data**: No API keys, passwords, or tokens

### Functionality Testing
- [ ] **Basic Autofill**: Works on test form
- [ ] **Profile Management**: Save/load profile data
- [ ] **Cross-Platform**: Tested on target job sites
- [ ] **Error Scenarios**: Handles missing fields gracefully
- [ ] **Performance**: No memory leaks or performance issues

### File Structure
- [ ] **All Files Present**: Required files in correct locations
- [ ] **Correct Paths**: Manifest references are accurate
- [ ] **Icons**: All icon sizes included (16px, 48px, 128px)
- [ ] **Documentation**: README and guides are up-to-date
- [ ] **Version Numbers**: Consistent across all files

### Browser Compatibility
- [ ] **Chrome**: Latest stable version
- [ ] **Edge**: Chromium-based Edge
- [ ] **Incognito Mode**: Works in private browsing
- [ ] **Multiple Tabs**: Handles multiple instances
- [ ] **Extension Updates**: Survives extension reloads

## 🧪 Testing & Validation

### Automated Testing
```bash
# Run test suite (if available)
npm test

# Validate manifest
npm run validate

# Check code quality
npm run lint
```

### Manual Testing Checklist

#### Basic Functionality
1. **Load Extension**
   - [ ] Extension loads without errors
   - [ ] Icon appears in toolbar
   - [ ] Popup opens correctly

2. **Profile Management**
   - [ ] Can open profile management page
   - [ ] Can save profile data
   - [ ] Data persists after browser restart
   - [ ] Can update existing profile

3. **Form Filling**
   - [ ] Works on test form (`docs/test-form.html`)
   - [ ] Fills all supported field types
   - [ ] Handles missing fields gracefully
   - [ ] Provides appropriate user feedback

#### Platform-Specific Testing
1. **Workday**
   - [ ] Handles iframe-based forms
   - [ ] Works with dynamic content loading
   - [ ] Fills multi-step applications
   - [ ] Respects CSP restrictions

2. **Greenhouse**
   - [ ] Standard form filling
   - [ ] Skips file upload fields
   - [ ] Handles required field validation

3. **LinkedIn**
   - [ ] Easy Apply process
   - [ ] Multi-step form navigation
   - [ ] Skills section handling

4. **Generic Sites**
   - [ ] Works on unknown job sites
   - [ ] Graceful degradation
   - [ ] No JavaScript errors

### Performance Testing
```bash
# Memory usage monitoring
# 1. Open Chrome Task Manager (Shift+Esc)
# 2. Load extension
# 3. Monitor memory usage during operation
# 4. Should be < 10MB under normal use

# Speed testing
# 1. Time form filling operations
# 2. Should complete in < 2 seconds for typical forms
# 3. No noticeable browser lag
```

## 🚀 Deployment Options

### Chrome Web Store (Recommended)

#### Prerequisites
- Google Developer account ($5 registration fee)
- Chrome Web Store Developer Dashboard access
- Completed extension with all required metadata

#### Submission Process
1. **Prepare Package**
   ```bash
   npm run build:prod
   # Creates optimized build in dist/
   
   # Create store-ready ZIP
   cd dist
   zip -r ../extension-store-v1.1.0.zip . -x "*.DS_Store"
   ```

2. **Store Listing**
   - Extension name: "Job Application Autofill"
   - Category: Productivity
   - Description: Use main README description
   - Screenshots: Add extension screenshots
   - Privacy policy: Required for extensions accessing user data

3. **Review Process**
   - Initial review: 1-3 business days
   - Updates: Usually faster approval
   - Follow Chrome Web Store policies

### Manual Distribution

#### Enterprise Deployment
```bash
# Create enterprise package
npm run build:prod

# Distribute via:
# 1. Internal file sharing
# 2. Company intranet
# 3. Email distribution
# 4. USB drives for air-gapped environments
```

#### Developer Distribution
```bash
# Create developer package with source
git archive --format=zip --output=job-autofill-extension-source.zip HEAD

# Include build instructions
echo "See docs/PRODUCTION-BUILD-GUIDE.md for build instructions" > BUILD.txt
```

## 🔒 Security Guidelines

### Data Protection
- **Local Storage Only**: All data stored in `chrome.storage.local`
- **No Cloud Services**: No external API calls or data transmission
- **Encryption**: Consider encrypting sensitive profile data
- **Access Control**: Minimal required permissions only

### Code Security
```javascript
// Good: Safe value setting
element.value = sanitizedValue;
element.dispatchEvent(new Event('input', { bubbles: true }));

// Bad: Unsafe HTML injection
element.innerHTML = userInput; // Never do this

// Good: Input sanitization
function sanitizeInput(input) {
  return input.replace(/[<>\"'&]/g, '');
}
```

### Permission Audit
```json
{
  "permissions": [
    "activeTab",    // Required: Access current tab for form filling
    "storage"       // Required: Store user profile data locally
  ]
  // No additional permissions should be added without justification
}
```

### CSP Compliance
- No `eval()` or `new Function()`
- No inline scripts or styles
- All resources declared in manifest
- Proper event handling without inline handlers

## 📋 Best Practices

### Version Management
```bash
# Update version in multiple files
# 1. manifest.json
# 2. package.json
# 3. docs/CHANGELOG.md

# Use semantic versioning
# Major.Minor.Patch (e.g., 1.2.3)
```

### Release Process
1. **Code Freeze**: Stop feature development
2. **Testing**: Complete full test suite
3. **Documentation**: Update all docs
4. **Version Bump**: Update version numbers
5. **Build**: Create production build
6. **Validation**: Final testing on clean browser
7. **Package**: Create distribution files
8. **Deploy**: Submit to store or distribute
9. **Monitor**: Watch for user feedback and issues

### Backup Strategy
```bash
# Backup before major changes
git tag v1.1.0
git push origin v1.1.0

# Keep multiple build versions
cp job-autofill-extension.zip backups/v1.1.0-$(date +%Y%m%d).zip
```

### Documentation Maintenance
- Keep README.md updated with new features
- Update CHANGELOG.md for each release
- Maintain developer documentation
- Include migration guides for breaking changes

## 🔧 Troubleshooting

### Common Build Issues

#### "Module not found" errors
```bash
# Solution: Check file paths in manifest.json
# Ensure all referenced files exist in dist/
ls -la dist/src/content/
ls -la dist/src/popup/
```

#### ZIP file too large
```bash
# Check file sizes
du -sh dist/*

# Remove unnecessary files
rm -rf dist/node_modules/  # Should not be included
rm -rf dist/.git/          # Should not be included
rm dist/*.log              # Remove log files
```

#### Extension won't load
```bash
# Check manifest syntax
node -e "JSON.parse(require('fs').readFileSync('dist/manifest.json', 'utf8'))"

# Check Chrome extensions page for errors
# chrome://extensions/ → Developer mode → Check for error messages
```

### Performance Issues
```bash
# Profile memory usage
# 1. Open Chrome Task Manager (Shift+Esc)
# 2. Look for extension process
# 3. Monitor during operation

# Check for memory leaks
# 1. Use Chrome DevTools Memory tab
# 2. Take heap snapshots before/after operations
# 3. Look for growing object counts
```

### Store Rejection Issues
- **Privacy Policy**: Required for data collection
- **Permissions**: Justify all requested permissions
- **Functionality**: Must work as described
- **Content**: No misleading descriptions
- **Quality**: Must meet store quality guidelines

## 📞 Support

### Build Issues
- Check [GitHub Issues](https://github.com/yourusername/job-autofill-extension/issues)
- Review [Developer Documentation](docs/README.md)
- Test with provided test form

### Store Submission
- Review [Chrome Web Store Developer Policies](https://developer.chrome.com/docs/webstore/program_policies/)
- Check [Extension Quality Guidelines](https://developer.chrome.com/docs/webstore/quality_guidelines/)
- Use [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)

---

For additional help, please open an issue on GitHub or refer to the main [README.md](../README.md).