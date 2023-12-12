const accessKey = "FRz5xrgnYrzZk4dB6iCqxtA83CUng2z9nlH8OLbc0oo";
const input = document.getElementById("input");
const showBtn = document.querySelector(".show-more");
const searchBtn = document.getElementById("find");
const imageCard = document.querySelector(".image-cards");
let page = 1;

function findImages() {
  if (page === 1) {
    imageCard.innerHTML = " ";
  }
  let searchTerm = input.value;
  const API = `https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&client_id=${accessKey}`;
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((images) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("card");
        const image = document.createElement("img");
        image.src = images.urls.small;
        image.alt = images.alt_description;
        
        image.addEventListener("click", () => {
          downloadImage(image.urls.full, image.alt_description);
        });

        const ImageLink = document.createElement("a");
        ImageLink.href = images.links.html;
        ImageLink.target = "_blank";
        ImageLink.textContent = images.description;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(ImageLink);
        imageCard.appendChild(imageWrapper);
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });

  page++;
  if (page > 1) {
    showBtn.style.display = "block";
  }
}
function downloadImage(imageUrl, altText) {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = altText || "image";
  link.click();
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  page = 1;
  findImages();
});

showBtn.addEventListener("click", () => {
  findImages();
});
