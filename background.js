import REPLICATE_API_TOKEN from "./config.js";

async function getImageVariations(imageUrl) {
  const response = await fetch(
    "https://api.replicate.ai/lambdal/stable-diffusion-image-variation:7c399ba0e1b33ed8ec39ed30eb6b0a2d9e054462543c428c251293034af82a8e",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        input: {
          input_image: imageUrl,
        },
        num_outputs: 2,
      }),
    }
  );

  const data = await response.json();
  return data;
}

chrome.contextMenus.remove("createImageVariations", () => {
  chrome.contextMenus.create({
    id: "createImageVariations",
    title: "Revisualize Image",
    contexts: ["image"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "createImageVariations") {
    getImageVariations(info.srcUrl).then((imageUrls) => {
      // Save image URLs to local storage
      chrome.storage.local.set({ imageUrls: imageUrls });

      // Send a message to content.js to display the images
      chrome.tabs.sendMessage(tab.id, {
        action: "displayImageVariations",
        imageUrls: imageUrls,
      });
    });
  }
});

