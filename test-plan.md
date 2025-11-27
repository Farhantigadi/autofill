# Chrome Extension Testing Plan

## Pre-Testing Setup

1. **Install Extension**
   - Load unpacked extension in Chrome
   - Verify extension icon appears in toolbar
   - Click "Manage Profile" and confirm your data is loaded

2. **Test Profile Data**
   - Open profile manager
   - Verify all fields populated with your information
   - Save and reload to confirm persistence

## Test Case 1: Sample HTML Form

**Create test file:**
```html
<!DOCTYPE html>
<html>
<body>
  <form>
    <input name="firstName" placeholder="First Name">
    <input name="lastName" placeholder="Last Name">
    <input type="email" name="email" placeholder="Email">
    <input name="phone" placeholder="Phone">
    <input name="city" placeholder="City">
    <textarea name="coverLetter" placeholder="Cover Letter"></textarea>
    <select name="country">
      <option value="">Select Country</option>
      <option value="IN">India</option>
      <option value="US">United States</option>
    </select>
  </form>
</body>
</html>
```

**Test Steps:**
- [ ] Open HTML file in Chrome
- [ ] Click extension → "Auto-Fill Form"
- [ ] Verify: All fields filled correctly
- [ ] Verify: Country dropdown selects "India"
- [ ] Verify: Cover letter populated

**Edge Cases:**
- [ ] Pre-fill some fields manually → Verify no overwrite
- [ ] Add `disabled` attribute → Verify field skipped
- [ ] Remove field names → Verify placeholder matching works

## Test Case 2: Workday Portal

**Target Sites:**
- Any company's Workday careers page
- Example: `company.wd1.myworkdayjobs.com`

**Test Steps:**
- [ ] Navigate to job posting
- [ ] Click "Apply" button
- [ ] Wait for iframe to load completely
- [ ] Click extension → "Auto-Fill Form"
- [ ] Verify: Basic info fields filled (name, email, phone)
- [ ] Verify: Address fields populated
- [ ] Navigate to next page/section
- [ ] Click auto-fill again → Verify new fields filled

**Workday-Specific Tests:**
- [ ] **Dynamic Loading**: Start filling before page fully loads
- [ ] **Multi-Step Forms**: Test each step separately
- [ ] **Iframe Detection**: Check browser console for iframe messages
- [ ] **Shadow DOM**: Inspect elements to verify shadow DOM penetration

**Expected Issues:**
- [ ] Some custom Workday fields may not match
- [ ] File upload fields should be skipped
- [ ] Date fields may need manual entry

## Test Case 3: Greenhouse Applications

**Target Sites:**
- `boards.greenhouse.io/company-name`
- Look for "Apply for this job" button

**Test Steps:**
- [ ] Click "Apply for this job"
- [ ] Fill basic information section
- [ ] Click extension → "Auto-Fill Form"
- [ ] Verify: Contact details filled
- [ ] Verify: Resume/LinkedIn fields populated
- [ ] Continue to next section
- [ ] Test auto-fill on additional sections

**Greenhouse-Specific Tests:**
- [ ] **Custom Questions**: Verify extension skips company-specific questions
- [ ] **File Uploads**: Confirm resume upload field not affected
- [ ] **Required Fields**: Check all required fields are filled

## Test Case 4: LinkedIn Easy Apply

**Test Steps:**
- [ ] Search for jobs on LinkedIn
- [ ] Find job with "Easy Apply" button
- [ ] Click "Easy Apply"
- [ ] Click extension → "Auto-Fill Form"
- [ ] Verify: Profile information auto-populated
- [ ] Continue through multi-step process
- [ ] Test auto-fill on each step

**LinkedIn-Specific Tests:**
- [ ] **Pre-filled Fields**: LinkedIn may pre-fill some data
- [ ] **Skills Section**: Verify skills list populated
- [ ] **Experience Questions**: Check work experience fields

## Test Case 5: Naukri.com Forms

**Test Steps:**
- [ ] Create/login to Naukri account
- [ ] Find job and click "Apply"
- [ ] Click extension → "Auto-Fill Form"
- [ ] Verify: Indian-specific fields (city, state)
- [ ] Verify: Phone number format maintained
- [ ] Check skills and experience sections

**Naukri-Specific Tests:**
- [ ] **Indian Locations**: Verify "Belagavi, Karnataka" fills correctly
- [ ] **Phone Format**: Check "+91" prefix maintained
- [ ] **Experience Fields**: Test current company/role fields

## Edge Case Testing

### Missing Fields Test
- [ ] Find form missing email field → Verify no errors
- [ ] Test form with only name fields → Verify partial fill
- [ ] Empty form → Verify graceful handling

### Optional Fields Test
- [ ] Form with mix of required/optional → Verify all attempted
- [ ] Fields marked with asterisks → Verify still filled
- [ ] Hidden fields → Verify skipped appropriately

### Delayed Rendering Test
- [ ] Click auto-fill immediately on page load
- [ ] Wait 2 seconds, click auto-fill again
- [ ] Verify: New fields filled on second attempt
- [ ] Check console for mutation observer activity

### Wrong Matches Test
- [ ] Form with field named "company" but expects school name
- [ ] Field labeled "phone" but expects fax number
- [ ] Verify: Reasonable fallback behavior

### Performance Test
- [ ] Large form (50+ fields) → Verify reasonable speed
- [ ] Multiple iframes → Check all are processed
- [ ] Rapid clicking → Verify no duplicate fills

## Error Scenarios

### Cross-Origin Issues
- [ ] Test on sites with strict CORS policies
- [ ] Verify: Graceful fallback to postMessage
- [ ] Check: No console errors for blocked requests

### Browser Compatibility
- [ ] Test in Chrome (primary)
- [ ] Verify: Extension loads correctly
- [ ] Check: All permissions granted

### Data Validation
- [ ] Empty profile → Verify no fields filled
- [ ] Corrupted storage → Verify error handling
- [ ] Invalid URLs in profile → Verify safe handling

## Success Criteria

**Must Pass:**
- [ ] 80%+ fields filled correctly on major platforms
- [ ] No JavaScript errors in console
- [ ] No overwriting of existing data
- [ ] Iframe detection working on Workday

**Should Pass:**
- [ ] Handles dynamic content loading
- [ ] Graceful degradation on unsupported sites
- [ ] Reasonable performance (< 2 seconds)

**Nice to Have:**
- [ ] Perfect field matching on all platforms
- [ ] Zero false positives
- [ ] Instant filling on all sites

## Debugging Tips

**Console Commands:**
```javascript
// Check if extension loaded
window.autofillEngine

// View stored profile
chrome.storage.local.get(['profile'], console.log)

// Test field detection
document.querySelectorAll('input, textarea, select').forEach(el => 
  console.log(el.name, el.id, el.placeholder)
)
```

**Common Issues:**
- Extension not loading → Check manifest.json
- Fields not filling → Check field name patterns
- Iframe issues → Verify postMessage in console
- Performance slow → Check mutation observer frequency