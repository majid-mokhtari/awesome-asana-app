import "./pagination.css";
import Gallery from "../Gallery";

class Pagination {
  constructor(total) {
    this.totalPages = total;
  }
  onPagClick(index) {
    const gallery = new Gallery();
    gallery
      .fetchData({ limit: 8, offset: index * 8 })
      .then(res => {
        gallery.render(res);
        gallery.bindEvents();
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }
  render(activePageIndex) {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "pagination");
    for (let i = 0; i < this.totalPages; i++) {
      const li = document.createElement("li");
      li.setAttribute("class", "pag-item");
      li.innerText = i + 1;
      if (i === activePageIndex) {
        li.setAttribute("class", "pag-item active");
      }
      ul.appendChild(li);
    }
    return ul;
  }
  bindEvents() {
    const lis = document.getElementsByClassName("pag-item");
    for (let i = 0; i < lis.length; i++) {
      lis[i].addEventListener("click", () => this.onPagClick(i));
    }
  }
}

export default Pagination;
