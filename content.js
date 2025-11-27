console.log('Autofill content script loaded');

let profile = null;

// Load profile data
chrome.storage.local.get(['profile']).then(result => {
  profile = result.profile;
  console.log('Profile loaded:', !!profile);
  if (profile) {
    console.log('Profile structure:', Object.keys(profile));
  }
}).catch(error => {
  console.error('Failed to load profile:', error);
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  
  if (request.action === 'FILL_FORM') {
    const result = fillForm();
    sendResponse({ success: result.success, count: result.count });
    return true;
  }
});

function fillForm() {
  console.log('Starting form fill...');
  
  if (!profile) {
    console.log('No profile data available');
    return { success: false, count: 0 };
  }
  
  const elements = document.querySelectorAll('input, textarea, select');
  console.log('Found', elements.length, 'form elements');
  
  let filledCount = 0;
  
  elements.forEach(element => {
    if (shouldSkipElement(element)) return;
    
    const value = getValueForElement(element);
    if (value) {
      setElementValue(element, value);
      filledCount++;
      console.log('Filled:', getElementName(element), '=', value);
    }
  });
  
  console.log('Form fill completed. Filled', filledCount, 'fields');
  return { success: filledCount > 0, count: filledCount };
}

function shouldSkipElement(element) {
  return element.value?.trim() || 
         element.disabled || 
         element.readOnly || 
         element.type === 'hidden' || 
         element.type === 'submit' || 
         element.type === 'button';
}

function getValueForElement(element) {
  const identifier = getElementIdentifier(element).toLowerCase();
  console.log('Checking element:', identifier);
  
  // Use the flat profile structure from popup.js
  if (/first.*name|fname/.test(identifier)) {
    console.log('Matched firstName');
    return profile.firstName;
  }
  if (/last.*name|lname/.test(identifier)) {
    console.log('Matched lastName');
    return profile.lastName;
  }
  if (/full.*name|^name$/.test(identifier)) {
    console.log('Matched fullName');
    return profile.fullName;
  }
  if (/email/.test(identifier)) {
    console.log('Matched email');
    return profile.email;
  }
  if (/phone|tel/.test(identifier)) {
    console.log('Matched phone');
    return profile.phone;
  }
  if (/city/.test(identifier)) {
    console.log('Matched city');
    return profile.city;
  }
  if (/state/.test(identifier)) {
    console.log('Matched state');
    return profile.state;
  }
  if (/country/.test(identifier)) {
    console.log('Matched country');
    return profile.country;
  }
  if (/zip|postal/.test(identifier)) {
    console.log('Matched postal');
    return profile.postalCode;
  }
  if (/address|street/.test(identifier)) {
    console.log('Matched address');
    return profile.addressLine1;
  }
  if (/linkedin/.test(identifier)) {
    console.log('Matched linkedin');
    return profile.linkedin;
  }
  if (/github/.test(identifier)) {
    console.log('Matched github');
    return profile.github;
  }
  if (/portfolio|website/.test(identifier)) {
    console.log('Matched portfolio');
    return profile.portfolio;
  }
  if (/company|employer/.test(identifier)) {
    console.log('Matched company');
    return profile.currentCompany;
  }
  if (/title|position|role/.test(identifier)) {
    console.log('Matched role');
    return profile.currentRole;
  }
  
  console.log('No match found for:', identifier);
  return null;
}

function getElementIdentifier(element) {
  return [
    element.name,
    element.id,
    element.placeholder,
    element.getAttribute('aria-label')
  ].filter(Boolean).join(' ');
}

function getElementName(element) {
  return element.name || element.id || element.placeholder || element.tagName;
}

function setElementValue(element, value) {
  element.value = value;
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}