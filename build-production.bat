@echo off
echo Building Production Chrome Extension...

REM Clean previous builds
if exist "dist" rmdir /s /q dist
mkdir dist

REM Copy core files
copy manifest.json dist\
copy popup.html dist\
copy popup.js dist\
copy content.js dist\
copy injected.js dist\
copy profile.html dist\
copy profile.js dist\
copy README.md dist\
copy CHANGELOG.md dist\

REM Copy icons folder
xcopy icons dist\icons\ /E /I

REM Create production ZIP
cd dist
powershell Compress-Archive -Path * -DestinationPath ..\autofill-extension-production.zip -Force
cd ..

echo Production build complete: autofill-extension-production.zip
echo.
echo Next steps:
echo 1. Test the extension by loading dist folder in chrome://extensions
echo 2. Verify all functionality works
echo 3. Upload ZIP to Chrome Web Store or distribute manually
pause