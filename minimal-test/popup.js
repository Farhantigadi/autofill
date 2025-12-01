document.getElementById('fill').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: 'FILL' }, (response) => {
    document.getElementById('status').textContent = response ? `Filled ${response.count} fields` : 'Error';
  });
});