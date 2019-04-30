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
    this.totalImages = 0;
  }

  fetchData(params) {
    const self = this;
    const { limit, offset } = params;
    //calculate next page index
    this.activePageIndex = Math.floor(offset / 8);
    return new Promise((resolve, reject) => {
      fetch("data/dogs.json")
        .then(response => {
          return response.json();
        })
        .then(({ dogs }) => {
          self.totalImages = dogs.length;
          self.data = dogs.slice(offset, offset + limit);
          resolve(self.data);
        })
        .catch(err => reject(err));
    });
  }

  render() {
    this.gallery.innerHTML = "";
    var gallery = document.createElement("div");
    gallery.setAttribute("class", "gallery");
    //build gallery
    for (let i = 0; i < this.data.length; i++) {
      let galleryItem = document.createElement("div");
      galleryItem.setAttribute("class", "gallery-item");
      let image = new Image();
      image.setAttribute("class", "gallery-img");
      galleryItem.appendChild(image);
      gallery.appendChild(galleryItem);
    }
    const pag = this.getPagination();
    this.gallery.appendChild(gallery);
    this.gallery.appendChild(pag);
    return this.gallery;
  }

  getPagination() {
    this.pagination = new Pagination(Math.ceil(this.totalImages / 8));
    return this.pagination.render(this.activePageIndex);
  }

  bindEvents() {
    const images = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < images.length; i++) {
      //lazing loading images
      var downloadingImage = new Image();
      downloadingImage.onload = function() {
        images[i].src = this.src;
      };
      downloadingImage.src = this.data[i].image;
      //open modal when clicked
      images[i].addEventListener("click", () => {
        const modal = new Modal();
        modal.render(images[i]);
      });
    }
    this.pagination.bindEvents();
  }
}

export default Gallery;
