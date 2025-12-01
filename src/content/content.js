console.log('Autofill content script loaded');

let profile = null;

// Load profile data
if (typeof chrome !== 'undefined' && chrome.storage) {
  chrome.storage.local.get(['profile']).then(result => {
    profile = result.profile;
    console.log('Profile loaded:', !!profile);
    if (profile) {
      console.log('Profile structure:', Object.keys(profile));
    } else {
      console.log('No profile found, using default');
      profile = getDefaultProfile();
    }
  }).catch(error => {
    console.error('Failed to load profile:', error);
    profile = getDefaultProfile();
  });
} else {
  console.log('Chrome extension API not available, using default profile');
  profile = getDefaultProfile();
}

// Listen for messages from popup
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);
    
    if (request.action === 'FILL_FORM') {
      const result = fillForm();
      sendResponse({ success: result.success, count: result.count });
      return true;
    }
  });
}

// Add a global function for testing
window.testAutofill = function() {
  console.log('Testing autofill...');
  const result = fillForm();
  alert(`Filled ${result.count} fields`);
};

function getDefaultProfile() {
  return {
    firstName: "Mohammadfarhan",
    lastName: "Tigadi",
    email: "farhantigadi123@gmail.com",
    phone: "6362888293",
    city: "Belagavi",
    state: "Karnataka",
    country: "India",
    postalCode: "591102",
    currentCompany: "Alstonair Technologies",
    currentRole: "Software Developer Intern",
    workLocation: "Bangalore",
    experienceStartDate: "08/2025",
    experienceEndDate: "11/2025",
    roleDescription: "Designed and implemented RESTful backend APIs using Spring Boot and integrated them with a MySQL database.",
    educationCollege: "S. G. Balekundri Institute of Technology, Belagavi",
    educationHighest: "Bachelor of Engineering in Electronics & Communication",
    educationCGPA: "8.35",
    educationEnd: "05/2025",
    skills: ["Java", "Spring Boot", "REST APIs", "JWT Authentication", "MySQL"],
    linkedin: "https://www.linkedin.com/in/mohammadfarhan-tigadi/",
    github: "https://github.com/Farhantigadi",
    portfolio: "https://farhan-portfolio-beta.vercel.app/",
    coverLetterTemplate: "Dear Hiring Manager, I am interested in backend developer opportunities."
  };
}

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
  const name = (element.name || '').toLowerCase();
  const id = (element.id || '').toLowerCase();
  const allText = `${name} ${id} ${identifier}`.toLowerCase();
  console.log('Checking element:', { name, id, identifier });
  
  // Enhanced matching function
  const matches = (patterns) => patterns.some(pattern => 
    new RegExp(pattern, 'i').test(name) || 
    new RegExp(pattern, 'i').test(id) || 
    new RegExp(pattern, 'i').test(identifier)
  );
  
  // Personal Information - All variations
  if (matches(['^(.*first.*name.*|.*fname.*|.*given.*name.*|.*f_name.*|user.*first.*|candidate.*first.*)$'])) return profile.firstName;
  if (matches(['^(.*last.*name.*|.*lname.*|.*family.*name.*|.*surname.*|.*l_name.*|user.*last.*|candidate.*last.*)$'])) return profile.lastName;
  if (matches(['^(.*full.*name.*|^name$|.*complete.*name.*|.*candidate.*name.*|user.*name.*|applicant.*name.*)$'])) return `${profile.firstName} ${profile.lastName}`;
  if (matches(['^(.*email.*|.*mail.*|.*e_mail.*|user.*email.*|contact.*email.*)$'])) return profile.email;
  if (matches(['^(.*phone.*|.*tel.*|.*mobile.*|.*cell.*|.*contact.*number.*|.*ph.*|user.*phone.*)$'])) return profile.phone;
  if (matches(['^(.*phone.*ext.*|.*extension.*|.*country.*code.*|.*area.*code.*)$'])) return '+91';
  
  // Address Fields - All variations
  if (matches(['^(.*address.*|.*addr.*|.*street.*|.*address.*line.*1.*|user.*address.*)$'])) return `${profile.city}, ${profile.state}`;
  if (matches(['^(.*address.*line.*2.*|.*apt.*|.*suite.*|.*unit.*|.*apartment.*)$'])) return '';
  if (matches(['^(.*city.*|.*town.*|user.*city.*|current.*city.*)$'])) return profile.city;
  if (matches(['^(.*state.*|.*province.*|.*region.*|user.*state.*|current.*state.*)$'])) return profile.state;
  if (matches(['^(.*country.*|.*nation.*|user.*country.*|current.*country.*)$'])) return profile.country;
  if (matches(['^(.*postal.*code.*|.*zip.*code.*|.*zip.*|.*pincode.*|.*pin.*code.*)$'])) return profile.postalCode;
  
  // Work Experience - All variations
  if (matches(['^(.*job.*title.*|.*position.*|.*role.*|.*title.*|.*current.*role.*|.*job.*position.*|work.*title.*)$'])) return profile.currentRole;
  if (matches(['^(.*company.*|.*employer.*|.*organization.*|.*current.*company.*|.*work.*company.*|.*firm.*)$'])) return profile.currentCompany;
  if (matches(['^(.*work.*location.*|.*job.*location.*|.*office.*location.*|.*work.*city.*|.*job.*city.*)$'])) return profile.workLocation;
  if (matches(['^(.*start.*date.*|.*from.*date.*|.*begin.*date.*|.*employment.*start.*|.*work.*start.*|.*job.*start.*)$'])) return profile.experienceStartDate;
  if (matches(['^(.*end.*date.*|.*to.*date.*|.*employment.*end.*|.*work.*end.*|.*job.*end.*|.*finish.*date.*)$'])) return profile.experienceEndDate;
  if (matches(['^(.*role.*desc.*|.*job.*desc.*|.*responsibilities.*|.*duties.*|.*description.*|.*work.*desc.*|.*job.*summary.*)$'])) return profile.roleDescription;
  
  // Education - All variations
  if (matches(['^(.*school.*|.*college.*|.*university.*|.*institution.*|.*education.*institution.*|.*edu.*institute.*)$'])) return profile.educationCollege;
  if (matches(['^(.*degree.*|.*qualification.*|.*education.*level.*|.*highest.*education.*|.*edu.*degree.*|.*academic.*degree.*)$'])) return profile.educationHighest;
  if (matches(['^(.*gpa.*|.*cgpa.*|.*grade.*|.*marks.*|.*percentage.*|.*score.*|.*result.*)$'])) return profile.educationCGPA;
  if (matches(['^(.*graduation.*date.*|.*education.*end.*|.*completion.*date.*|.*grad.*date.*|.*edu.*end.*)$'])) return profile.educationEnd;
  
  // Skills & Links - All variations
  if (matches(['^(.*skills.*|.*technologies.*|.*expertise.*|.*competencies.*|.*tech.*skills.*|.*technical.*skills.*)$'])) return profile.skills.join(', ');
  if (matches(['^(.*linkedin.*|.*linked.*in.*|.*li.*profile.*|.*linkedin.*url.*|.*linkedin.*profile.*)$'])) return profile.linkedin;
  if (matches(['^(.*github.*|.*git.*hub.*|.*github.*url.*|.*github.*profile.*|.*git.*profile.*)$'])) return profile.github;
  if (matches(['^(.*portfolio.*|.*website.*|.*personal.*site.*|.*web.*site.*|.*homepage.*)$'])) return profile.portfolio;
  if (matches(['^(.*resume.*link.*|.*cv.*link.*|.*resume.*url.*|.*cv.*url.*|.*resume.*file.*)$'])) return profile.resumeLink || '';
  
  // Application Questions - All variations
  if (matches(['^(.*work.*permit.*|.*authorization.*|.*eligible.*work.*|.*visa.*status.*|.*work.*auth.*|.*legal.*work.*)$'])) return 'Yes';
  if (matches(['^(.*age.*confirm.*|.*18.*years.*|.*legal.*age.*|.*age.*verification.*|.*adult.*confirm.*)$'])) return 'Yes';
  if (matches(['^(.*salary.*expect.*|.*expected.*salary.*|.*compensation.*|.*pay.*expect.*|.*salary.*range.*)$'])) return '4.2 LPA';
  if (matches(['^(.*notice.*period.*|.*availability.*|.*joining.*date.*|.*start.*date.*|.*available.*date.*)$'])) return 'Immediate';
  if (matches(['^(.*third.*party.*|.*contractor.*|.*vendor.*|.*external.*contractor.*|.*outsource.*)$'])) return 'No';
  if (matches(['^(.*future.*opportunities.*|.*contact.*future.*|.*talent.*pool.*|.*future.*contact.*|.*career.*updates.*)$'])) return 'Yes';
  if (matches(['^(.*citizenship.*|.*nationality.*|.*citizen.*|.*country.*citizen.*|.*national.*status.*)$'])) return 'None of the above';
  if (matches(['^(.*cover.*letter.*|.*motivation.*letter.*|.*personal.*statement.*|.*cover.*note.*|.*application.*letter.*)$'])) return profile.coverLetterTemplate;
  if (matches(['^(.*disability.*|.*accommodation.*|.*special.*needs.*|.*accessibility.*|.*reasonable.*adjustment.*)$'])) return 'No';
  if (matches(['^(.*criminal.*record.*|.*background.*check.*|.*conviction.*|.*criminal.*history.*|.*legal.*issues.*)$'])) return 'No';
  if (matches(['^(.*drug.*test.*|.*substance.*test.*|.*drug.*screen.*|.*medical.*test.*)$'])) return 'Yes';
  if (matches(['^(.*relocation.*|.*willing.*relocate.*|.*move.*|.*relocate.*job.*|.*change.*location.*)$'])) return 'Yes';
  if (matches(['^(.*travel.*|.*willing.*travel.*|.*business.*travel.*|.*work.*travel.*|.*job.*travel.*)$'])) return 'Yes';
  if (matches(['^(.*overtime.*|.*flexible.*hours.*|.*shift.*work.*|.*extended.*hours.*|.*work.*schedule.*)$'])) return 'Yes';rn profile.coverLetterTemplate;
  if (/^(disability|accommodation|special.*needs)$/i.test(name) || /^(disability|accommodation|special.*needs)$/i.test(id)) return 'No';
  if (/^(criminal.*record|background.*check|conviction)$/i.test(name) || /^(criminal.*record|background.*check|conviction)$/i.test(id)) return 'No';
  if (/^(drug.*test|substance.*test)$/i.test(name) || /^(drug.*test|substance.*test)$/i.test(id)) return 'Yes';
  if (/^(relocation|willing.*relocate|move)$/i.test(name) || /^(relocation|willing.*relocate|move)$/i.test(id)) return 'Yes';
  if (/^(travel|willing.*travel|business.*travel)$/i.test(name) || /^(travel|willing.*travel|business.*travel)$/i.test(id)) return 'Yes';
  if (/^(overtime|flexible.*hours|shift.*work)$/i.test(name) || /^(overtime|flexible.*hours|shift.*work)$/i.test(id)) return 'Yes';
  
  // Broad fallback patterns for any missed variations
  if (/first|fname|given/i.test(allText)) return profile.firstName;
  if (/last|lname|family|surname/i.test(allText)) return profile.lastName;
  if (/(^name$|full.*name|complete.*name)/i.test(allText)) return `${profile.firstName} ${profile.lastName}`;
  if (/email|mail/i.test(allText)) return profile.email;
  if (/phone|tel|mobile|contact/i.test(allText)) return profile.phone;
  if (/address|street|addr/i.test(allText)) return `${profile.city}, ${profile.state}`;
  if (/city|town/i.test(allText)) return profile.city;
  if (/state|province/i.test(allText)) return profile.state;
  if (/country|nation/i.test(allText)) return profile.country;
  if (/postal|zip|pin/i.test(allText)) return profile.postalCode;
  if (/title|position|role/i.test(allText)) return profile.currentRole;
  if (/company|employer|organization/i.test(allText)) return profile.currentCompany;
  if (/linkedin/i.test(allText)) return profile.linkedin;
  if (/github/i.test(allText)) return profile.github;
  if (/portfolio|website/i.test(allText)) return profile.portfolio;
  if (/skills|technologies/i.test(allText)) return profile.skills.join(', ');
  if (/cover.*letter|motivation/i.test(allText)) return profile.coverLetterTemplate;
  if (/salary|compensation|pay/i.test(allText)) return '4.2 LPA';
  if (/notice|availability/i.test(allText)) return 'Immediate';
  if (/permit|authorization/i.test(allText)) return 'Yes';
  if (/age.*18|legal.*age/i.test(allText)) return 'Yes';
  if (/future.*contact|opportunities/i.test(allText)) return 'Yes';
  if (/third.*party|contractor/i.test(allText)) return 'No';
  if (/citizenship|nationality/i.test(allText)) return 'None of the above';
  if (/disability|accommodation/i.test(allText)) return 'No';
  if (/criminal|background|conviction/i.test(allText)) return 'No';
  if (/drug.*test|substance/i.test(allText)) return 'Yes';
  if (/relocate|move|relocation/i.test(allText)) return 'Yes';
  if (/travel/i.test(allText)) return 'Yes';
  if (/overtime|flexible.*hours/i.test(allText)) return 'Yes';
  
  console.log('No match found for:', { name, id, identifier });
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