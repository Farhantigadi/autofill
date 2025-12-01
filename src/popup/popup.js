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
    chrome.tabs.create({ url: chrome.runtime.getURL('src/profile/profile.html') });
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
      postalCode: "591102",
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
      roleDescription: "Designed and implemented RESTful backend APIs using Spring Boot and integrated them with a MySQL database. Supported frontend development using React, HTML, CSS, and JavaScript to ensure smooth integration with backend APIs. Managed the collaborative codebase using Git and GitHub for version control. Conducted thorough API testing using Postman to validate functionality and reliability.",
      skills: ["Java", "Spring Boot", "REST APIs", "JWT Authentication", "MySQL", "JPA", "Hibernate", "Git", "GitHub", "GitHub Actions", "Agile Scrum", "Postman", "HTML", "CSS", "JavaScript", "React (Basics)"],
      certifications: ["Java Development - Kodnest", "Java Programming Beginner to Master - Udemy", "SQL Programming & Data Manipulation - Udemy", "Spring Boot 3 + Spring Framework 6 - Udemy"],
      resumeLink: "",
      coverLetterTemplate: "Dear Hiring Manager,\n\nI am writing to express my interest in entry-level backend or full-stack developer opportunities at your organization. With a Bachelor of Engineering in Electronics and Communication and hands-on experience as a Java Developer Intern, I have developed a strong foundation in building, securing, and testing modern web applications using Java, Spring Boot, RESTful APIs, and MySQL.\n\nIn my recent internship at Alstonair Technologies, I designed and implemented RESTful backend APIs with Spring Boot, integrated them with MySQL databases, and collaborated closely with frontend teams working in React, HTML, CSS, and JavaScript. I regularly used Git and GitHub for version control and followed Agile-Scrum practices, ensuring clean collaboration and continuous integration with GitHub Actions. These experiences have helped me become comfortable working in real-world team environments and delivering maintainable code.\n\nBeyond professional experience, I have built projects such as a secure Journal App and a Banking Application, where I implemented JWT-based authentication, Spring Security, role-based access control, and relational database design using JPA/Hibernate. I also focused on code quality and reliability by integrating SonarCloud, writing unit and integration tests with JUnit and Mockito, and documenting APIs with Swagger, validating them using Postman. These projects reflect my ability to design end-to-end backend solutions with a focus on security, scalability, and code quality.\n\nMy technical skill set includes Java (Core and Advanced), JavaScript, HTML, CSS, SQL, Spring Boot, Tailwind CSS, JPA, Hibernate, MySQL, Git, GitHub, GitHub Actions, Postman, SonarCloud, IntelliJ IDEA, and VS Code, along with an understanding of RESTful APIs, JWT authentication, and Agile-Scrum methodologies. I am eager to contribute these skills to a dynamic engineering team, while continuing to learn and grow as a developer.\n\nThank you for considering my application. I would welcome the opportunity to discuss how my background and skills can add value to your team.\n\nSincerely,\nMohammadfarhan Tigadi"
    };
  }
}

new PopupController();