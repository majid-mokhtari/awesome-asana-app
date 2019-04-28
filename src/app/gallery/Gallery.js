import Modal from "../modal/Modal";
import Pagination from "../pagination/Pagination";
import "./gallery.css";

class Gallery {
  constructor() {
    this.data = [];
    const gallery = document.getElementById("gallery-container");
    if (!gallery) {
      this.gallery = document.createElement("div");
      this.gallery.setAttribute("id", "gallery-container");
    } else {
      this.gallery = gallery;
    }
    this.pagination = null;
    this.activePageIndex = 0;
  }
  fetchData(params) {
    const self = this;
    const { limit, offset } = params;
    this.activePageIndex = Math.floor(offset / 8);
    return new Promise((resolve, reject) => {
      fetch("data/dogs.json")
        .then(response => {
          return response.json();
        })
        .then(({ dogs }) => {
          self.data = dogs;
          resolve(dogs.slice(offset, offset + limit));
        })
        .catch(err => reject(err));
    });
  }
  render(data) {
    this.gallery.innerHTML = "";
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
    const pag = this.buildPagination(this.activePageIndex);
    this.gallery.appendChild(gallery);
    this.gallery.appendChild(pag);
    return this.gallery;
  }
  buildPagination(index) {
    this.pagination = new Pagination(Math.ceil(this.data.length / 8));
    return this.pagination.render(index);
  }
  bindEvents() {
    const images = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("click", () => {
        new Modal(images[i]);
      });
    }
    this.pagination.bindEvents();
  }
}

export default Gallery;
