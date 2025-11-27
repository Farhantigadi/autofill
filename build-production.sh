#!/bin/bash

echo "Building Production Chrome Extension..."

# Clean previous builds
rm -rf dist
mkdir -p dist

# Copy core files
cp manifest.json dist/
cp popup.html dist/
cp popup.js dist/
cp content.js dist/
cp injected.js dist/
cp profile.html dist/
cp profile.js dist/
cp README.md dist/
cp CHANGELOG.md dist/

# Copy icons folder
cp -r icons dist/

# Create production ZIP
cd dist
zip -r ../autofill-extension-production.zip . -x "*.DS_Store"
cd ..

echo "Production build complete: autofill-extension-production.zip"
echo ""
echo "Next steps:"
echo "1. Test the extension by loading dist folder in chrome://extensions"
echo "2. Verify all functionality works"
echo "3. Upload ZIP to Chrome Web Store or distribute manually"