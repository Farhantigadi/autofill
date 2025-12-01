# Job Application Autofill Chrome Extension

A production-ready Chrome extension that automatically fills job application forms across all platforms including Workday, Lever, Greenhouse, LinkedIn, Naukri, and more.

## Features

- **Universal Compatibility**: Works on any job platform including iframe-based forms (Workday)
- **Smart Field Detection**: Advanced pattern matching for field identification
- **Local Storage**: All data stored securely in your browser
- **Manifest V3**: Latest Chrome extension standards
- **Production Ready**: Clean, modular, and maintainable code

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked" and select this extension folder
4. The extension icon will appear in your toolbar

## Usage

1. Navigate to any job application form
2. Click the extension icon in your toolbar
3. Click "Auto-Fill Form" to populate all matching fields
4. Use "Manage Profile" to update your information

## Supported Platforms

- Workday (with iframe support)
- Greenhouse
- Lever
- LinkedIn Jobs
- Naukri.com
- Indeed
- Monster
- Glassdoor
- And virtually any other job platform

## Architecture

```
├── manifest.json          # Extension configuration
├── popup.html/js          # Extension popup interface
├── content.js             # Form detection and filling logic
├── profile.html/js        # Profile management interface
└── README.md             # Documentation
```

## Security & Privacy

- All data stored locally using `chrome.storage.local`
- No external API calls or cloud services
- Respects browser security policies
- Works within iframe restrictions

## Technical Details

- **Manifest V3** compliant
- **ES6 Classes** for clean code structure
- **Pattern-based matching** for robust field detection
- **Event-driven architecture** for iframe communication
- **Graceful error handling** and user feedback

## Development

The extension uses modern JavaScript patterns familiar to backend developers:
- Class-based architecture similar to Spring Boot controllers
- Modular design with separation of concerns
- Event-driven communication like REST API patterns
- Clean error handling and validation