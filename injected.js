(function() {
  try {
    if (window.autofillInjected) return;
    window.autofillInjected = true;
    console.log('Autofill injected script loaded');

    var profile = null;

    window.addEventListener('message', function(event) {
      try {
        if (event.data && event.data.type === 'AUTOFILL_PROFILE') {
          profile = event.data.profile;
          console.log('Profile received in iframe:', !!profile);
          fillCurrentFrame();
        } else if (event.data && event.data.type === 'AUTOFILL_FILL') {
          console.log('Fill command received in iframe');
          fillCurrentFrame();
        }
      } catch (e) {
        console.error('Message handler error:', e);
      }
    });

    function fillCurrentFrame() {
      try {
        if (!profile) {
          console.log('No profile data available in iframe');
          return;
        }

        var elements = document.querySelectorAll('input, textarea, select');
        console.log('Found ' + elements.length + ' elements in iframe');
        
        var filledCount = 0;
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          if (element.value && element.value.trim() || element.disabled || element.readOnly) continue;

          var identifier = getFieldIdentifier(element);
          var value = matchFieldValue(identifier);

          if (value) {
            element.value = value;
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
            filledCount++;
          }
        }
        
        console.log('Filled ' + filledCount + ' fields in iframe');
      } catch (e) {
        console.error('Fill frame error:', e);
      }
    }

    function getFieldIdentifier(element) {
      var parts = [
        element.name,
        element.id,
        element.placeholder,
        element.getAttribute('data-automation-id'),
        element.getAttribute('aria-label'),
        element.className
      ];
      return parts.filter(Boolean).join(' ').toLowerCase();
    }

    function matchFieldValue(identifier) {
      if (/first.*name|fname/.test(identifier)) return profile.personal && profile.personal.firstName;
      if (/last.*name|lname/.test(identifier)) return profile.personal && profile.personal.lastName;
      if (/full.*name|^name$/.test(identifier)) return profile.personal && profile.personal.fullName;
      if (/email/.test(identifier)) return profile.contact && profile.contact.email;
      if (/phone|tel/.test(identifier)) return profile.contact && profile.contact.phone;
      if (/city/.test(identifier)) return profile.contact && profile.contact.address && profile.contact.address.city;
      if (/state/.test(identifier)) return profile.contact && profile.contact.address && profile.contact.address.state;
      if (/country/.test(identifier)) return profile.contact && profile.contact.address && profile.contact.address.country;
      if (/zip|postal/.test(identifier)) return profile.contact && profile.contact.address && profile.contact.address.postalCode;
      if (/address|street/.test(identifier)) return profile.contact && profile.contact.address && profile.contact.address.line1;
      if (/linkedin/.test(identifier)) return profile.onlineProfiles && profile.onlineProfiles.linkedin;
      if (/github/.test(identifier)) return profile.onlineProfiles && profile.onlineProfiles.github;
      if (/portfolio|website/.test(identifier)) return profile.onlineProfiles && profile.onlineProfiles.portfolio;
      if (/company|employer/.test(identifier)) return profile.workExperience && profile.workExperience[0] && profile.workExperience[0].company;
      if (/title|position|role/.test(identifier)) return profile.workExperience && profile.workExperience[0] && profile.workExperience[0].role;
      return null;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        window.parent.postMessage({ type: 'IFRAME_READY' }, '*');
      });
    } else {
      window.parent.postMessage({ type: 'IFRAME_READY' }, '*');
    }
  } catch (e) {
    console.error('Injected script error:', e);
  }
})();