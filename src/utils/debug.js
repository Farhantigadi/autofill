// Debug script - paste in browser console to troubleshoot

console.log('=== AUTOFILL DEBUG ===');

// Check if extension is loaded
console.log('1. Extension loaded:', !!window.autofillEngine);

// Check profile data
chrome.storage.local.get(['profile'], (result) => {
  console.log('2. Profile data:', result.profile);
  
  if (!result.profile) {
    console.error('❌ No profile data found');
  } else {
    console.log('✅ Profile loaded');
    console.log('   - Name:', result.profile.personal?.firstName);
    console.log('   - Email:', result.profile.contact?.email);
  }
});

// Check form fields
const inputs = document.querySelectorAll('input, textarea, select');
console.log('3. Form fields found:', inputs.length);

inputs.forEach((input, i) => {
  if (i < 10) { // Show first 10 fields
    console.log(`   Field ${i+1}:`, {
      name: input.name,
      id: input.id,
      placeholder: input.placeholder,
      type: input.type,
      value: input.value
    });
  }
});

// Test field matching
if (window.autofillEngine && inputs.length > 0) {
  console.log('4. Testing field matching...');
  const testInput = inputs[0];
  const identifier = window.autofillEngine.getFieldIdentifier(testInput);
  console.log('   Sample identifier:', identifier);
  
  const value = window.autofillEngine.matchFieldValue(identifier);
  console.log('   Matched value:', value);
}

console.log('=== DEBUG COMPLETE ===');