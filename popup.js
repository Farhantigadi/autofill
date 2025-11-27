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
      firstName: "Mohammadfarhan",
      lastName: "Tigadi",
      fullName: "Mohammadfarhan Tigadi",
      email: "farhantigadi123@gmail.com",
      phone: "6362888293",
      phoneExtension: "+91",
      location: "Belagavi, Karnataka, India",
      city: "Belagavi",
      state: "Karnataka",
      country: "India",
      postalCode: "590001",
      addressLine1: "Belagavi, Karnataka",
      addressLine2: "",
      linkedin: "https://www.linkedin.com/in/mohammadfarhan-tigadi/",
      github: "https://github.com/Farhantigadi",
      portfolio: "https://farhan-portfolio-beta.vercel.app/",
      educationHighest: "Bachelor of Engineering in Electronics & Communication",
      educationCollege: "S. G. Balekundri Institute of Technology, Belagavi",
      educationCGPA: "8.35",
      educationStart: "Dec 2021",
      educationEnd: "May 2025",
      experienceStatus: "Fresher / Intern",
      currentCompany: "Alstonair Technologies",
      currentRole: "Software Developer Intern",
      workLocation: "Bangalore",
      experienceStartDate: "Aug 2025",
      experienceEndDate: "Nov 2025",
      roleDescription: "Designed and implemented RESTful APIs using Spring Boot. Integrated backend with MySQL database. Supported frontend using React, HTML, CSS, and JavaScript. Used Git & GitHub for version control. Performed API testing using Postman.",
      skills: ["Java", "Spring Boot", "REST APIs", "JWT Authentication", "MySQL", "JPA", "Hibernate", "Git", "GitHub", "GitHub Actions", "Agile Scrum", "Postman", "HTML", "CSS", "JavaScript", "React (Basics)"],
      certifications: ["Java Development - Kodnest", "Java Programming Beginner to Master - Udemy", "SQL Programming & Data Manipulation - Udemy", "Spring Boot 3 + Spring Framework 6 - Udemy"],
      resumeLink: "",
      coverLetterTemplate: "Dear Hiring Manager,\n\nI am excited to apply for this position. As a final-year Electronics & Communication Engineering student at S. G. Balekundri Institute of Technology with a CGPA of 8.35, I have developed strong technical skills in Java development and backend technologies.\n\nDuring my internship at Alstonair Technologies (Aug-Nov 2025), I gained hands-on experience designing RESTful APIs using Spring Boot, integrating MySQL databases, and supporting frontend development with React. I have successfully built projects including a Banking Application with JWT security and a Journal App with role-based access control.\n\nMy technical expertise includes Java, Spring Boot, REST APIs, JWT Authentication, MySQL, JPA, Hibernate, Git, and Agile methodologies. I have completed certifications in Java Development, Spring Framework, and SQL Programming, demonstrating my commitment to continuous learning.\n\nI am particularly drawn to backend development and would welcome the opportunity to contribute to your team's success. I am available to start immediately and open to any work arrangement.\n\nThank you for considering my application.\n\nSincerely,\nMohammad Farhan Tigadi"
    };
  }
}

new PopupController();