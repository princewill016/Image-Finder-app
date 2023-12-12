const accessKey = "FRz5xrgnYrzZk4dB6iCqxtA83CUng2z9nlH8OLbc0oo";
const API = `https://api.unsplash.com/photos/?client_id=${accessKey}`;
const input = document.querySelector(".input");
const showBtn = document.querySelector(".show-more");
const searchBtn = document.getElementById("find");
const imageCard = document.querySelector(".image-cards");

function findImages() {
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((images) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("card");
        const image = document.createElement("img");
        image.src = images.urls.small;
        image.alt = images.alt_description;
        const ImageLink = document.createElement("a");
        ImageLink.href = images.links.html;
        ImageLink.target = "_blank";
        ImageLink.textContent = images.description;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(ImageLink);
        imageCard.appendChild(imageWrapper);
      });
    });
}

searchBtn.addEventListener("click", findImages);
