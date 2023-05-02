chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'requestImageUrl' }, (response) => {
      if (response.imageUrl) {
        chrome.runtime.sendMessage({ action: 'requestImageVariations', imageUrl: response.imageUrl }, (imageUrls) => {
          displayImageVariations(imageUrls);
        });
      }
    });
  });
  
  function displayImageVariations(imageUrls) {
    const variations = document.getElementById('variations');
  
    for (const imageUrl of imageUrls) {
      const img = document.createElement('img');
      img.src = imageUrl;
      variations.appendChild(img);
    }
  }
  