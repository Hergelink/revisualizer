chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getImageVariations') {
      const imageUrl = request.imageUrl;
      // Call the API here and return the variations
    }
  });
  