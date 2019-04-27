import Modal from "./modal/Modal";
import "./styles.css";

class Gallery {
  constructor() {
    this.data = [];
  }
  fetchData(params) {
    const { limit, offset } = params;
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "data/dogs.json");
      xhr.onload = function() {
        if (xhr.status === 200) {
          const { dogs } = JSON.parse(xhr.responseText);
          this.data = dogs.slice(offset, offset + limit);
          resolve(this.data);
        } else {
          reject("Request failed.  Returned status of " + xhr.status);
        }
      };
      xhr.send();
    });
  }
  buildGallery(data) {
    var gallery = document.createElement("div");
    gallery.setAttribute("class", "gallery");
    for (let i = 0; i < data.length; i++) {
      let galleryItem = document.createElement("div");
      galleryItem.setAttribute("class", "gallery-item");
      let image = document.createElement("img");
      image.setAttribute("src", data[i].image);
      image.setAttribute("class", "gallery-img");
      galleryItem.appendChild(image);
      gallery.appendChild(galleryItem);
    }
    return gallery;
  }
  bindImageClick() {
    const images = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("click", () => {
        new Modal(images[i]);
      });
    }
  }
}

export default Gallery;
