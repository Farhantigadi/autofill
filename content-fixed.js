// Fixed content script with proper message handling
(function() {
  let profile = null;
  
  // Load profile on startup
  chrome.storage.local.get(['profile']).then(result => {
    profile = result.profile;
    console.log('Autofill: Profile loaded', !!profile);
  }).catch(error => {
    console.error('Autofill: Failed to load profile', error);
  });
  
  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'FILL_FORM') {
      const result = fillForm();
      sendResponse({ success: result.success, count: result.count });
      return true;
    }
  });
  
  function fillForm() {
    console.log('Autofill: Starting form fill');
    
    if (!profile) {
      console.log('Autofill: No profile data');
      return { success: false, count: 0 };
    }
    
    const elements = document.querySelectorAll('input, textarea, select');
    console.log('Autofill: Found', elements.length, 'elements');
    
    let filledCount = 0;
    
    for (let element of elements) {
      if (shouldSkipElement(element)) continue;
      
      const value = getValueForElement(element);\n      if (value) {\n        setElementValue(element, value);\n        filledCount++;\n        console.log('Autofill: Filled', getElementInfo(element), 'with', value);\n      }\n    }\n    \n    console.log('Autofill: Completed, filled', filledCount, 'fields');\n    return { success: filledCount > 0, count: filledCount };\n  }\n  \n  function shouldSkipElement(element) {\n    return element.value?.trim() || \n           element.disabled || \n           element.readOnly || \n           element.type === 'hidden' || \n           element.type === 'submit' || \n           element.type === 'button';\n  }\n  \n  function getValueForElement(element) {\n    const identifier = getElementIdentifier(element);\n    \n    // Name fields\n    if (/first.*name|fname/i.test(identifier)) return profile.personal?.firstName;\n    if (/last.*name|lname/i.test(identifier)) return profile.personal?.lastName;\n    if (/full.*name|^name$/i.test(identifier)) return profile.personal?.fullName;\n    \n    // Contact\n    if (/email/i.test(identifier)) return profile.contact?.email;\n    if (/phone|tel/i.test(identifier)) return profile.contact?.phone;\n    \n    // Address\n    if (/city/i.test(identifier)) return profile.contact?.address?.city;\n    if (/state/i.test(identifier)) return profile.contact?.address?.state;\n    if (/country/i.test(identifier)) return profile.contact?.address?.country;\n    if (/zip|postal/i.test(identifier)) return profile.contact?.address?.postalCode;\n    if (/address|street/i.test(identifier)) return profile.contact?.address?.line1;\n    \n    // Professional\n    if (/linkedin/i.test(identifier)) return profile.onlineProfiles?.linkedin;\n    if (/github/i.test(identifier)) return profile.onlineProfiles?.github;\n    if (/portfolio|website/i.test(identifier)) return profile.onlineProfiles?.portfolio;\n    if (/company|employer/i.test(identifier)) return profile.workExperience?.[0]?.company;\n    if (/title|position|role/i.test(identifier)) return profile.workExperience?.[0]?.role;\n    \n    return null;\n  }\n  \n  function getElementIdentifier(element) {\n    return [\n      element.name,\n      element.id,\n      element.placeholder,\n      element.getAttribute('aria-label')\n    ].filter(Boolean).join(' ');\n  }\n  \n  function getElementInfo(element) {\n    return element.name || element.id || element.placeholder || element.tagName;\n  }\n  \n  function setElementValue(element, value) {\n    element.value = value;\n    element.dispatchEvent(new Event('input', { bubbles: true }));\n    element.dispatchEvent(new Event('change', { bubbles: true }));\n  }\n  \n  console.log('Autofill: Content script initialized');\n})();