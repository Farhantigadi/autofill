# Job Application Autofill Chrome Extension

A production-ready Chrome extension that automatically fills job application forms across all platforms including Workday, Lever, Greenhouse, LinkedIn, Naukri, and more.

## 🚀 Features

- **Universal Compatibility**: Works on any job platform including iframe-based forms (Workday)
- **Smart Field Detection**: Advanced pattern matching for field identification
- **Local Storage**: All data stored securely in your browser
- **Manifest V3**: Latest Chrome extension standards
- **Production Ready**: Clean, modular, and maintainable code

## 📁 Project Structure

```
├── src/
│   ├── content/         # Content scripts for form detection
│   ├── popup/           # Extension popup interface
│   ├── profile/         # Profile management pages
│   ├── injected/        # Scripts for iframe handling
│   └── utils/           # Utility functions and debugging
├── public/
│   └── icons/           # Extension icons
├── docs/                # Documentation and test files
├── scripts/             # Build and deployment scripts
├── dist/                # Built extension (generated)
├── manifest.json        # Extension manifest
└── package.json         # Project configuration
```

## 🛠️ Installation

### For Development
1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked" and select this extension folder
5. The extension icon will appear in your toolbar

### For Production
1. Run `npm run build` to create production build
2. Load the `dist/` folder as unpacked extension

## 📖 Usage

1. Navigate to any job application form
2. Click the extension icon in your toolbar
3. Click "Auto-Fill Form" to populate all matching fields
4. Use "Manage Profile" to update your information

## 🎯 Supported Platforms

- Workday (with iframe support)
- Greenhouse
- Lever
- LinkedIn Jobs
- Naukri.com
- Indeed
- Monster
- Glassdoor
- And virtually any other job platform

## 🔧 Development

### Build Commands
```bash
npm run build          # Development build
npm run build:prod     # Production build with minification
```

### Testing
Open `docs/test-form.html` in your browser to test the extension functionality.

## 🔒 Security & Privacy

- All data stored locally using `chrome.storage.local`
- No external API calls or cloud services
- Respects browser security policies
- Works within iframe restrictions

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions, please open an issue on GitHub.