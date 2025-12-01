// Extension Validation Script
// Run this in browser console to check for issues

console.log('🔍 Validating Extension Files...');

// Check if files exist
const requiredFiles = [
  'manifest.json',
  'src/popup/popup.html',
  'src/popup/popup.js', 
  'src/content/content.js',
  'src/profile/profile.html',
  'src/profile/profile.js',
  'public/icons/icon.svg'
];

console.log('📁 Required Files Check:');
requiredFiles.forEach(file => {
  fetch(file)
    .then(response => {
      if (response.ok) {
        console.log(`✅ ${file} - Found`);
      } else {
        console.log(`❌ ${file} - Missing (${response.status})`);
      }
    })
    .catch(error => {
      console.log(`❌ ${file} - Error: ${error.message}`);
    });
});

// Check manifest
fetch('manifest.json')
  .then(response => response.json())
  .then(manifest => {
    console.log('📋 Manifest Validation:');
    console.log(`✅ Name: ${manifest.name}`);
    console.log(`✅ Version: ${manifest.version}`);
    console.log(`✅ Manifest Version: ${manifest.manifest_version}`);
    
    if (manifest.manifest_version === 3) {
      console.log('✅ Using Manifest V3');
    } else {
      console.log('⚠️ Not using Manifest V3');
    }
    
    if (manifest.permissions && manifest.permissions.length > 0) {
      console.log(`✅ Permissions: ${manifest.permissions.join(', ')}`);
    }
    
    if (manifest.action && manifest.action.default_popup) {
      console.log(`✅ Popup: ${manifest.action.default_popup}`);
    }
  })
  .catch(error => {
    console.log(`❌ Manifest Error: ${error.message}`);
  });

console.log('🎯 Validation Complete! Check results above.');