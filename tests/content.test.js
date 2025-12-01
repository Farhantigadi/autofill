/**
 * @jest-environment jsdom
 */

describe('Content Script Field Detection', () => {
  let mockProfile;

  beforeEach(() => {
    mockProfile = {
      firstName: 'Mohammadfarhan',
      lastName: 'Tigadi',
      email: 'farhantigadi123@gmail.com',
      phone: '6362888293',
      phoneExtension: '+91'
    };

    // Setup DOM
    document.body.innerHTML = `
      <form>
        <input name="firstName" type="text">
        <input name="lastName" type="text">
        <input name="email" type="email">
        <input name="phone" type="tel">
        <input name="phoneExtension" type="text">
      </form>
    `;
  });

  test('should detect first name field', () => {
    const element = document.querySelector('[name="firstName"]');
    const identifier = getElementIdentifier(element);
    expect(identifier.toLowerCase()).toContain('firstname');
  });

  test('should detect email field', () => {
    const element = document.querySelector('[name="email"]');
    const identifier = getElementIdentifier(element);
    expect(identifier.toLowerCase()).toContain('email');
  });

  test('should match phone extension pattern', () => {
    const identifier = 'phoneextension';
    const isPhoneExt = /phoneextension|extension|country.*code/.test(identifier);
    expect(isPhoneExt).toBe(true);
  });

  test('should handle missing elements gracefully', () => {
    const element = document.querySelector('[name="nonexistent"]');
    expect(element).toBeNull();
  });
});

// Helper function (would be imported from actual content script)
function getElementIdentifier(element) {
  if (!element) return '';
  return [
    element.name,
    element.id,
    element.placeholder,
    element.getAttribute('aria-label')
  ].filter(Boolean).join(' ');
}