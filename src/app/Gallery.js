import Footer from "../footer";
import Header from "../header";
import Modal from "./modal/Modal";
import "./styles.css";

class Gallery {
  constructor() {
    this.data = [];
    this.root = document.getElementById("root");
    this.root.innerHTML += Header;
  }
  fetchData() {
    const self = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/dogs.json");
    xhr.onload = function() {
      if (xhr.status === 200) {
        const { dogs } = JSON.parse(xhr.responseText);
        this.data = dogs;
        self.buildGallery(dogs);
      } else {
        console.log("Request failed.  Returned status of " + xhr.status);
      }
    };
    xhr.send();
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
    this.root.appendChild(gallery);
    this.root.innerHTML += Footer;

    const images = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < images.length; i++) {
      this.onImageClick(images[i]);
    }
  }
  onImageClick(img) {
    img.addEventListener("click", () => {
      const modal = new Modal(img);
    });
  }
}

export default Gallery;
