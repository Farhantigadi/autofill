class PopupController {
  constructor() {
    this.initializeProfile();
    this.bindEvents();
  }

  async initializeProfile() {
    const result = await chrome.storage.local.get(['profile']);
    if (!result.profile) {
      await chrome.storage.local.set({ profile: this.getDefaultProfile() });
    }
  }

  bindEvents() {
    document.getElementById('autofill').addEventListener('click', () => this.handleAutofill());
    document.getElementById('manage').addEventListener('click', () => this.openProfileManager());
  }

  async handleAutofill() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      chrome.tabs.sendMessage(tab.id, { action: 'FILL_FORM' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          this.showStatus('Please refresh the page and try again', 'error');
        } else if (response && response.success) {
          this.showStatus(`Filled ${response.count} fields successfully!`, 'success');
        } else {
          this.showStatus('No matching fields found', 'error');
        }
      });
    } catch (error) {
      console.error('Autofill error:', error);
      this.showStatus('Failed to fill form', 'error');
    }
  }

  openProfileManager() {
    chrome.tabs.create({ url: chrome.runtime.getURL('profile.html') });
  }

  showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
    
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }

  getDefaultProfile() {
    return {
      firstName: "Mohammad Farhan",
      lastName: "Tigadi",
      fullName: "Mohammad Farhan Tigadi",
      email: "farhantigadi123@gmail.com",
      phone: "+91 6362888293",
      location: "Belagavi, Karnataka, India",
      city: "Belagavi",
      state: "Karnataka",
      country: "India",
      postalCode: "590001",
      addressLine1: "Belagavi, Karnataka",
      linkedin: "https://www.linkedin.com/in/mohammadfarhan-tigadi/",
      github: "https://github.com/Farhantigadi",
      portfolio: "https://farhan-portfolio-beta.vercel.app/",
      educationHighest: "Bachelor of Engineering in Electronics & Communication",
      educationCollege: "S. G. Balekundri Institute of Technology, Belagavi",
      educationCGPA: "8.35",
      currentCompany: "Alstonair Technologies",
      currentRole: "Software Developer Intern",
      skills: ["Java", "Spring Boot", "REST APIs", "JWT Authentication", "MySQL", "JPA", "Hibernate", "Git", "GitHub", "GitHub Actions", "Agile Scrum", "Postman", "HTML", "CSS", "JavaScript", "React (Basics)"],
      coverLetterTemplate: "Dear Hiring Manager, I am excited to apply for this role as I have strong experience with Java, Spring Boot, REST APIs, and MySQL..."
    };
  }
}

new PopupController();