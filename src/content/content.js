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
  
  // Exact field name matches first
  if (identifier === 'phoneextension') {
    console.log('Matched phoneExtension');
    return '+91';
  }
  if (identifier === 'roledescription' || /role.*description|describe.*responsibilities/.test(identifier)) {
    console.log('Matched roleDescription');
    return profile.roleDescription;
  }
  if (identifier === 'educationcollege') {
    console.log('Matched educationCollege');
    return profile.educationCollege;
  }
  if (identifier === 'educationhighest') {
    console.log('Matched educationHighest');
    return profile.educationHighest;
  }
  if (identifier === 'educationcgpa') {
    console.log('Matched educationCGPA');
    return profile.educationCGPA;
  }
  if (identifier === 'educationend' || /graduation.*date|education.*end/.test(identifier)) {
    console.log('Matched educationEnd');
    return profile.educationEnd;
  }
  if (identifier === 'skills') {
    console.log('Matched skills');
    return profile.skills.join(', ');
  }
  if (identifier === 'coverletter' || /cover.*letter/.test(identifier)) {
    console.log('Matched coverLetter');
    return profile.coverLetterTemplate;
  }
  if (identifier === 'ageconfirmation') {
    console.log('Matched ageConfirmation');
    return 'Yes';
  }
  if (identifier === 'jobtitle') {
    console.log('Matched jobTitle');
    return profile.currentRole;
  }
  if (identifier === 'worklocation') {
    console.log('Matched workLocation');
    return profile.workLocation;
  }
  if (identifier === 'experiencestartdate' || /from|start.*date/.test(identifier)) {
    console.log('Matched experienceStartDate');
    return profile.experienceStartDate;
  }
  if (identifier === 'experienceenddate' || /to|end.*date/.test(identifier)) {
    console.log('Matched experienceEndDate');
    return profile.experienceEndDate;
  }
  if (identifier === 'salaryexpectation') {
    console.log('Matched salaryExpectation');
    return '4.2 LPA';
  }
  if (identifier === 'noticeperiod') {
    console.log('Matched noticePeriod');
    return 'Immediate';
  }
  if (identifier === 'workpermit') {
    console.log('Matched workPermit');
    return 'Yes';
  }
  if (identifier === 'thirdpartycontractor') {
    console.log('Matched thirdPartyContractor');
    return 'No';
  }
  if (identifier === 'futureopportunities') {
    console.log('Matched futureOpportunities');
    return 'Yes';
  }
  if (identifier === 'citizenship') {
    console.log('Matched citizenship');
    return 'None of the above';
  }
  if (identifier === 'resumelink') {
    console.log('Matched resumeLink');
    return profile.resumeLink;
  }
  
  // Pattern matches for common fields
  if (/first.*name|fname/.test(identifier)) {
    console.log('Matched firstName');
    return profile.firstName;
  }
  if (/last.*name|lname/.test(identifier)) {
    console.log('Matched lastName');
    return profile.lastName;
  }
  if (/email/.test(identifier)) {
    console.log('Matched email');
    return profile.email;
  }
  if (/^phone$|^tel$/.test(identifier)) {
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
  if (/postal|zip/.test(identifier)) {
    console.log('Matched postal');
    return profile.postalCode;
  }
  if (/linkedin/.test(identifier)) {
    console.log('Matched linkedin');
    return profile.linkedin;
  }
  if (/github/.test(identifier)) {
    console.log('Matched github');
    return profile.github;
  }
  if (/portfolio/.test(identifier)) {
    console.log('Matched portfolio');
    return profile.portfolio;
  }
  if (/company/.test(identifier)) {
    console.log('Matched company');
    return profile.currentCompany;
  }
  
  console.log('No match found for:', identifier);
  return null;
}

function getElementIdentifier(element) {
  const parts = [
    element.name,
    element.id,
    element.placeholder,
    element.getAttribute('aria-label')
  ].filter(Boolean);
  
  // Also check the label text
  const label = element.closest('label') || document.querySelector(`label[for="${element.id}"]`);
  if (label) {
    parts.push(label.textContent.trim());
  }
  
  return parts.join(' ');
}

function getElementName(element) {
  return element.name || element.id || element.placeholder || element.tagName;
}

function setElementValue(element, value) {
  if (element.tagName === 'SELECT') {
    // For select elements, find the option that matches the value
    const option = Array.from(element.options).find(opt => 
      opt.value === value || opt.text === value
    );
    if (option) {
      element.value = option.value;
    }
  } else {
    element.value = value;
  }
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}