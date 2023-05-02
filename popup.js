chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getImageVariations' }, (response) => {
      const variations = document.getElementById('variations');
      // Display the image variations in the popup
    });
  });
  