chrome.contextMenus.create({
    id: 'createImageVariations',
    title: 'Create Image Variations',
    contexts: ['image'],
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'createImageVariations') {
      chrome.tabs.sendMessage(tab.id, {
        action: 'getImageVariations',
        imageUrl: info.srcUrl,
      });
    }
  });
  