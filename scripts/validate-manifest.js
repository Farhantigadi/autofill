#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Validates Chrome extension manifest.json
 */
function validateManifest() {
  const manifestPath = path.join(__dirname, '..', 'manifest.json');
  
  try {
    // Check if manifest exists
    if (!fs.existsSync(manifestPath)) {
      throw new Error('manifest.json not found');
    }

    // Parse manifest
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);

    // Validate required fields
    const requiredFields = ['manifest_version', 'name', 'version'];
    for (const field of requiredFields) {
      if (!manifest[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate manifest version
    if (manifest.manifest_version !== 3) {
      throw new Error('Only Manifest V3 is supported');
    }

    // Validate file references
    const filesToCheck = [];
    
    if (manifest.content_scripts) {
      manifest.content_scripts.forEach(script => {
        if (script.js) {
          filesToCheck.push(...script.js);
        }
      });
    }

    if (manifest.action?.default_popup) {
      filesToCheck.push(manifest.action.default_popup);
    }

    if (manifest.web_accessible_resources) {
      manifest.web_accessible_resources.forEach(resource => {
        if (resource.resources) {
          filesToCheck.push(...resource.resources);
        }
      });
    }

    // Check if referenced files exist
    for (const file of filesToCheck) {
      const filePath = path.join(__dirname, '..', file);
      if (!fs.existsSync(filePath)) {
        console.warn(`Warning: Referenced file not found: ${file}`);
      }
    }

    console.log('✅ Manifest validation passed');
    console.log(`📦 Extension: ${manifest.name} v${manifest.version}`);
    
  } catch (error) {
    console.error('❌ Manifest validation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  validateManifest();
}

module.exports = { validateManifest };