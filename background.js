import Replicate from "replicate";
import REPLICATE_API_TOKEN from "./config.js";


chrome.storage.sync.get("REPLICATE_API_TOKEN", (data) => {
    const replicate = new Replicate({
        auth: REPLICATE_API_TOKEN,
      });
      

  async function getImageVariations(imageUrl) {
    const output = await replicate.run(
      "lambdal/stable-diffusion-image-variation:7c399ba0e1b33ed8ec39ed30eb6b0a2d9e054462543c428c251293034af82a8e",
      {
        input: {
          input_image: imageUrl,
        },
        num_outputs: 2,
      }
    );

    return output;
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "requestImageVariations") {
      const imageUrl = request.imageUrl;
      getImageVariations(imageUrl).then((imageUrls) => {
        sendResponse(imageUrls);
      });
    }
    return true;
  });
});

chrome.contextMenus.create({
  id: "createImageVariations",
  title: "Create Image Variations",
  contexts: ["image"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "createImageVariations") {
    chrome.tabs.sendMessage(tab.id, {
      action: "getImageVariations",
      imageUrl: info.srcUrl,
    });
  }
});

