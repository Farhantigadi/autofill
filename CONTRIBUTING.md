# 🤝 Contributing to Job Application Autofill Extension

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Process](#contributing-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Community](#community)

## 📜 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

### Our Pledge
- **Be Respectful**: Treat everyone with respect and kindness
- **Be Inclusive**: Welcome contributors from all backgrounds
- **Be Collaborative**: Work together constructively
- **Be Professional**: Maintain professional communication

### Unacceptable Behavior
- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Spam or off-topic discussions
- Sharing private information without permission

## 🚀 Getting Started

### Prerequisites
- **Git**: Version control system
- **Node.js**: For build scripts (optional)
- **Chrome/Edge**: For testing the extension
- **Text Editor**: VS Code, Sublime Text, or similar

### Quick Setup
```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/yourusername/job-autofill-extension.git
cd job-autofill-extension

# 3. Create a development branch
git checkout -b feature/your-feature-name

# 4. Load extension in Chrome
# Go to chrome://extensions/ → Enable Developer Mode → Load Unpacked → Select project folder
```

## 🛠️ Development Setup

### Environment Setup
```bash
# Install dependencies (if any)
npm install

# Build the extension
npm run build

# Start development
# Load dist/ folder in Chrome extensions page
```

### Project Structure Understanding
```
src/
├── content/     # Form detection and filling logic
├── popup/       # Extension popup interface
├── profile/     # Profile management
├── injected/    # Iframe communication
└── utils/       # Utility functions

docs/            # Documentation
scripts/         # Build scripts
public/icons/    # Extension icons
```

### Development Workflow
1. **Make Changes**: Edit files in `src/` directory
2. **Test Changes**: Reload extension in Chrome
3. **Validate**: Test on `docs/test-form.html`
4. **Debug**: Use browser console and extension DevTools

## 🔄 Contributing Process

### 1. Choose What to Contribute

#### Good First Issues
- Documentation improvements
- Bug fixes for specific websites
- New field pattern additions
- UI/UX improvements
- Test coverage expansion

#### Advanced Contributions
- New platform support
- Performance optimizations
- Security enhancements
- Architecture improvements

### 2. Create an Issue (Optional but Recommended)
```markdown
**Issue Type**: Bug Report / Feature Request / Enhancement

**Description**: Clear description of the problem or feature

**Steps to Reproduce** (for bugs):
1. Go to website X
2. Click extension icon
3. Click "Auto-Fill Form"
4. Expected: Form fills
5. Actual: Error message appears

**Environment**:
- Browser: Chrome 120.0.6099.109
- OS: Windows 11
- Extension Version: 1.1.0
```

### 3. Development Process
```bash
# Create feature branch
git checkout -b feature/add-new-platform-support

# Make your changes
# Edit relevant files in src/

# Test thoroughly
# Load extension and test on multiple sites

# Commit with clear messages
git add .
git commit -m "feat: add support for NewJobSite.com platform

- Add field patterns for NewJobSite forms
- Handle their custom date picker
- Add tests for new platform
- Update documentation"

# Push to your fork
git push origin feature/add-new-platform-support
```

## 📝 Coding Standards

### JavaScript Style Guide

#### General Principles
- **ES6+**: Use modern JavaScript features
- **Consistency**: Follow existing code patterns
- **Readability**: Write self-documenting code
- **Performance**: Optimize for browser extension environment

#### Code Examples
```javascript
// Good: Clear function names and structure
class AutofillEngine {
  constructor() {
    this.profile = null;
    this.filledFields = new Set();
  }
  
  async fillForm() {
    if (!this.profile) {
      console.warn('No profile data available');
      return { success: false, count: 0 };
    }
    
    const elements = this.getFormElements();
    return this.processElements(elements);
  }
}

// Good: Descriptive variable names
const phoneExtensionField = document.querySelector('[name="phoneExtension"]');
const userProfileData = await this.loadUserProfile();

// Bad: Unclear names
const el = document.querySelector('[name="phoneExtension"]');
const data = await this.load();
```

#### Field Pattern Additions
```javascript
// When adding new field patterns, follow this structure:
if (identifier === 'exactfieldname') {
  console.log('Matched exactFieldName');
  return profile.correspondingValue;
}

// Or for pattern matching:
if (/pattern.*match|alternative/.test(identifier)) {
  console.log('Matched pattern');
  return profile.value;
}
```

### HTML/CSS Guidelines
```html
<!-- Good: Semantic HTML with proper classes -->
<div class="form-section">
  <h2 class="section-title">Personal Information</h2>
  <div class="form-row">
    <div class="form-group">
      <label class="required">First Name</label>
      <input name="firstName" type="text" required>
    </div>
  </div>
</div>
```

```css
/* Good: BEM-style naming and organized structure */
.form-section {
  background: white;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.form-section__title {
  color: #0073e6;
  margin-top: 0;
}
```

### Documentation Standards
- **Comments**: Explain complex logic, not obvious code
- **JSDoc**: Use for public functions
- **README**: Update when adding new features
- **Changelog**: Document all changes

```javascript
/**
 * Fills form elements with profile data
 * @param {HTMLElement[]} elements - Form elements to fill
 * @returns {Promise<{success: boolean, count: number}>} Fill result
 */
async fillFormElements(elements) {
  // Implementation
}
```

## 🧪 Testing Guidelines

### Manual Testing Checklist
```bash
# 1. Load extension in Chrome
# chrome://extensions/ → Load Unpacked → Select project folder

# 2. Test basic functionality
# - Extension icon appears
# - Popup opens correctly
# - Profile management works

# 3. Test form filling
# Open docs/test-form.html
# Click "Auto-Fill Form"
# Verify all fields populate correctly

# 4. Test on real sites
# Try Workday, Greenhouse, LinkedIn
# Verify no JavaScript errors in console
```

### Platform-Specific Testing
```javascript
// When adding support for a new platform, test:
// 1. Field detection accuracy
// 2. Form submission compatibility
// 3. Error handling
// 4. Performance impact

// Example test for new platform:
describe('NewPlatform Support', () => {
  it('should detect name fields correctly', () => {
    // Test field detection logic
  });
  
  it('should handle dynamic content', () => {
    // Test mutation observer functionality
  });
});
```

### Browser Testing
- **Chrome**: Primary target (latest stable)
- **Edge**: Chromium-based Edge
- **Incognito**: Test private browsing mode
- **Multiple Tabs**: Ensure no conflicts

## 📥 Pull Request Process

### Before Submitting
- [ ] **Test Thoroughly**: All functionality works as expected
- [ ] **No Console Errors**: Clean browser console
- [ ] **Documentation Updated**: README, comments, changelog
- [ ] **Code Style**: Follows project conventions
- [ ] **Commit Messages**: Clear and descriptive

### PR Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tested on test form (docs/test-form.html)
- [ ] Tested on target platforms
- [ ] No console errors
- [ ] Extension loads correctly

## Platforms Tested
- [ ] Workday
- [ ] Greenhouse
- [ ] LinkedIn
- [ ] Generic forms

## Screenshots (if applicable)
Add screenshots showing the changes in action.

## Additional Notes
Any additional information about the changes.
```

### Review Process
1. **Automated Checks**: Code style and basic validation
2. **Manual Review**: Code quality and functionality review
3. **Testing**: Reviewer tests the changes
4. **Feedback**: Address any requested changes
5. **Approval**: PR approved and merged

## 🐛 Issue Reporting

### Bug Reports
```markdown
**Bug Description**
Clear description of what went wrong.

**Steps to Reproduce**
1. Go to [website]
2. Click extension icon
3. Click "Auto-Fill Form"
4. See error

**Expected Behavior**
What should have happened.

**Actual Behavior**
What actually happened.

**Environment**
- Browser: Chrome 120.0.6099.109
- OS: Windows 11 / macOS 14 / Ubuntu 22.04
- Extension Version: 1.1.0

**Console Errors**
Any JavaScript errors from browser console.

**Screenshots**
If applicable, add screenshots.
```

### Feature Requests
```markdown
**Feature Description**
Clear description of the proposed feature.

**Use Case**
Why is this feature needed? What problem does it solve?

**Proposed Solution**
How do you envision this feature working?

**Alternatives Considered**
Any alternative solutions you've considered.

**Additional Context**
Any other context about the feature request.
```

## 🌟 Community

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Requests**: Code contributions and reviews

### Recognition
Contributors will be recognized in:
- **README.md**: Contributors section
- **CHANGELOG.md**: Credit for specific contributions
- **GitHub**: Contributor statistics and badges

### Maintainer Responsibilities
- **Timely Reviews**: Respond to PRs within 1 week
- **Clear Communication**: Provide helpful feedback
- **Documentation**: Keep guides up-to-date
- **Community**: Foster welcoming environment

## 📚 Resources

### Learning Resources
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

### Development Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Extension DevTools](https://chrome.google.com/webstore/detail/chrome-apps-extensions-de/ohmmkhmmmpcnpikjeljgnaoabkaalbgc)
- [JSON Validator](https://jsonlint.com/) for manifest.json

### Project-Specific Resources
- [Developer Documentation](docs/README.md)
- [Production Build Guide](docs/PRODUCTION-BUILD-GUIDE.md)
- [Test Form](docs/test-form.html)

---

## 🙏 Thank You

Thank you for contributing to the Job Application Autofill Extension! Your contributions help job seekers save time and reduce the friction in the application process.

Every contribution, no matter how small, makes a difference. Whether it's fixing a typo, adding support for a new job platform, or improving the user experience, we appreciate your effort.

**Happy Contributing!** 🚀