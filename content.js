chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "requestImageUrl") {
      sendResponse({ imageUrl: window.location.href });
    }
    return false;
  });
  
