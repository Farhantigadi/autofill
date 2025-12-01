chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'FILL') {
    const data = {
      firstName: "Mohammadfarhan",
      lastName: "Tigadi", 
      email: "farhantigadi123@gmail.com",
      phone: "6362888293"
    };
    
    let count = 0;
    Object.keys(data).forEach(key => {
      const element = document.querySelector(`[name="${key}"]`);
      if (element) {
        element.value = data[key];
        count++;
      }
    });
    
    sendResponse({ count });
  }
});