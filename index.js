const accessKey = "FRz5xrgnYrzZk4dB6iCqxtA83CUng2z9nlH8OLbc0oo";
const imageCard = document.querySelector(".image-cards");
const input = document.getElementById("input");
const searchBtn = document.getElementById("find");
const showBtn = document.querySelector(".show-more");
let page = 1;
window.addEventListener("load", () => {
  input.value = "";
});
function findImages() {
  if (page === 1) {
    imageCard.innerHTML = "";
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
        const ImageLink = document.createElement("a");
        ImageLink.href = images.links.html;
        ImageLink.target = "_blank";
        ImageLink.textContent = images.description || "Untitled image";
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(ImageLink);
        imageCard.appendChild(imageWrapper);
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
  page++;
  if (input.value == "") {
    showBtn.style.display;
  } else if (page > 1) {
    showBtn.style.display = "block";
  }
}
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  page = 1;
  findImages();
});
showBtn.addEventListener("click", () => {
  findImages();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    page = 1;
    findImages();
  }
});
