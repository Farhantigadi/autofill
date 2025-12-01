class ProfileManager {
  constructor() {
    this.fields = [
      'firstName', 'lastName', 'email', 'phone',
      'city', 'state', 'country', 'postalCode',
      'linkedin', 'github', 'portfolio',
      'currentCompany', 'currentRole',
      'skills', 'coverLetterTemplate'
    ];
    
    this.init();
  }

  async init() {
    await this.loadProfile();
    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('save').addEventListener('click', () => this.saveProfile());
    document.getElementById('reset').addEventListener('click', () => this.resetToDefault());
  }

  async loadProfile() {
    const result = await chrome.storage.local.get(['profile']);
    const profile = result.profile || {};

    this.fields.forEach(field => {
      const element = document.getElementById(field);
      if (element) {
        if (field === 'skills' && Array.isArray(profile[field])) {
          element.value = profile[field].join(', ');
        } else {
          element.value = profile[field] || '';
        }
      }
    });
  }

  async saveProfile() {
    const profile = {};

    this.fields.forEach(field => {
      const element = document.getElementById(field);
      if (element) {
        if (field === 'skills') {
          profile[field] = element.value.split(',').map(s => s.trim()).filter(s => s);
        } else {
          profile[field] = element.value.trim();
        }
      }
    });

    // Generate computed fields
    profile.fullName = `${profile.firstName} ${profile.lastName}`.trim();
    profile.location = `${profile.city}, ${profile.state}, ${profile.country}`.replace(/^,\s*|,\s*$/g, '');
    profile.addressLine1 = `${profile.city}, ${profile.state}`.replace(/^,\s*|,\s*$/g, '');

    await chrome.storage.local.set({ profile });
    this.showStatus('Profile saved successfully!');
  }

  async resetToDefault() {
    const defaultProfile = {
      firstName: "Mohammad Farhan",
      lastName: "Tigadi",
      email: "farhantigadi123@gmail.com",
      phone: "+91 6362888293",
      city: "Belagavi",
      state: "Karnataka",
      country: "India",
      postalCode: "590001",
      linkedin: "https://www.linkedin.com/in/mohammadfarhan-tigadi/",
      github: "https://github.com/Farhantigadi",
      portfolio: "https://farhan-portfolio-beta.vercel.app/",
      currentCompany: "Alstonair Technologies",
      currentRole: "Software Developer Intern",
      skills: ["Java", "Spring Boot", "REST APIs", "JWT Authentication", "MySQL", "JPA", "Hibernate", "Git", "GitHub", "GitHub Actions", "Agile Scrum", "Postman", "HTML", "CSS", "JavaScript", "React (Basics)"],
      coverLetterTemplate: "Dear Hiring Manager, I am excited to apply for this role as I have strong experience with Java, Spring Boot, REST APIs, and MySQL..."
    };

    await chrome.storage.local.set({ profile: defaultProfile });
    await this.loadProfile();
    this.showStatus('Profile reset to default values!');
  }

  showStatus(message) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = 'status success';
    status.style.display = 'block';
    
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }
}

new ProfileManager();