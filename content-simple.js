// Simple content script without complex iframe handling
(function() {
  'use strict';
  
  let profile = null;
  
  // Load profile data
  async function loadProfile() {
    try {
      const result = await chrome.storage.local.get(['profile']);
      profile = result.profile;
      console.log('Profile loaded:', !!profile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  }
  
  // Simple field mappings
  function getFieldValue(identifier) {
    if (!profile) return null;
    
    const id = identifier.toLowerCase();
    
    // Name fields
    if (/first.*name|fname/.test(id)) return profile.personal?.firstName;
    if (/last.*name|lname/.test(id)) return profile.personal?.lastName;
    if (/full.*name|^name$/.test(id)) return profile.personal?.fullName;
    
    // Contact fields
    if (/email/.test(id)) return profile.contact?.email;
    if (/phone|tel/.test(id)) return profile.contact?.phone;
    
    // Address fields
    if (/city/.test(id)) return profile.contact?.address?.city;
    if (/state/.test(id)) return profile.contact?.address?.state;
    if (/country/.test(id)) return profile.contact?.address?.country;
    if (/zip|postal/.test(id)) return profile.contact?.address?.postalCode;
    if (/address|street/.test(id)) return profile.contact?.address?.line1;
    
    // Links
    if (/linkedin/.test(id)) return profile.onlineProfiles?.linkedin;
    if (/github/.test(id)) return profile.onlineProfiles?.github;
    if (/portfolio|website/.test(id)) return profile.onlineProfiles?.portfolio;
    
    // Work
    if (/company|employer/.test(id)) return profile.workExperience?.[0]?.company;
    if (/title|position|role/.test(id)) return profile.workExperience?.[0]?.role;
    
    return null;
  }
  
  // Get field identifier
  function getFieldIdentifier(element) {
    const parts = [
      element.name,
      element.id,
      element.placeholder,
      element.getAttribute('aria-label')
    ];
    return parts.filter(Boolean).join(' ');
  }
  
  // Fill form elements
  function fillForm() {
    console.log('Starting form fill...');
    
    if (!profile) {
      console.log('No profile data available');
      return;
    }
    
    const elements = document.querySelectorAll('input[type=\"text\"], input[type=\"email\"], input[type=\"tel\"], input:not([type]), textarea');
    console.log('Found', elements.length, 'form elements');
    
    let filledCount = 0;
    
    elements.forEach(element => {
      // Skip if already filled or disabled
      if (element.value?.trim() || element.disabled || element.readOnly) return;
      
      const identifier = getFieldIdentifier(element);
      const value = getFieldValue(identifier);
      
      if (value) {
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        filledCount++;
        console.log('Filled:', identifier, '=', value);
      }
    });
    
    console.log('Filled', filledCount, 'fields');
  }
  
  // Listen for messages from popup
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'AUTOFILL_TRIGGER') {
      fillForm();
    }
  });
  
  // Initialize
  loadProfile();
  
  console.log('Autofill content script loaded');
})();