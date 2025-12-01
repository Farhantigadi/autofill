#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Clean dist folder
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
fs.mkdirSync('dist');

// Copy manifest.json
fs.copyFileSync('manifest.json', 'dist/manifest.json');

// Copy src folder
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir('src', 'dist/src');
copyDir('public', 'dist/public');

console.log('Build completed successfully!');
console.log('Extension files are in the dist/ folder');