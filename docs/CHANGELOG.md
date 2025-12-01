# Changelog

All notable changes to the Job Application Autofill Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-27

### Added
- Initial release of Job Application Autofill Extension
- Manifest V3 compliance
- Universal form field detection and filling
- Support for major job platforms:
  - Workday (with iframe support)
  - Greenhouse
  - Lever
  - LinkedIn Easy Apply
  - Naukri.com
  - Indeed, Monster, Glassdoor
- Comprehensive profile data structure:
  - Personal information (name, DOB, gender, nationality)
  - Contact details (email, phone, address)
  - Online profiles (LinkedIn, GitHub, Portfolio)
  - Work experience and education
  - Skills categorization
  - Job preferences and salary expectations
- Advanced field matching with 25+ pattern types
- Cross-origin iframe injection with CSP compliance
- Mutation observer for dynamic content detection
- Shadow DOM penetration
- Profile management interface
- Local data storage with chrome.storage.local
- Multi-language field support (English, French, Hindi terms)

### Technical Features
- ES6 class-based architecture
- Event-driven iframe communication
- React-compatible form filling
- Graceful error handling
- Performance optimization with debounced filling
- Security-first design with no external API calls

### Security
- All data stored locally in browser
- No cloud services or external dependencies
- CSP-compliant script injection
- Respects cross-origin restrictions
- No eval() or unsafe JavaScript practices

### Browser Support
- Chrome (Manifest V3)
- Chromium-based browsers
- Incognito mode compatible