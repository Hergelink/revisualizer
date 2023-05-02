chrome.storage.local.get("imageUrls", (data) => {
  if (data.imageUrls) {
    displayImageVariations(data.imageUrls);
  }
});

function displayImageVariations(imageUrls) {
  const variations = document.getElementById("variations");

  for (const imageUrl of imageUrls) {
    const img = document.createElement("img");
    img.src = imageUrl;
    variations.appendChild(img);
  }
}

  