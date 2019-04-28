import footer from "../footer";
import header from "../header";
import Gallery from "./gallery/Gallery";
import "./app.css";

class App {
  constructor() {
    this.root = document.getElementById("root");
  }

  render() {
    this.renderHeader();
  }

  async renderHeader() {
    await header()
      .then(res => {
        this.root.innerHTML += res;
      })
      .catch(err => console.log(err));
    this.renderGallery();
  }

  async renderGallery() {
    this.gallery = new Gallery();
    //set limit and offset to for pagination
    //to control how many images we request from server
    await this.gallery
      .fetchData({ limit: 10, offset: 0 })
      .then(res => {
        const gal = this.gallery.render(res);
        this.root.appendChild(gal);
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
    this.renderFooter();
  }

  async renderFooter() {
    await footer()
      .then(res => {
        this.root.innerHTML += res;
      })
      .catch(err => console.log(err));
    //bind all events after whole page is loaded
    this.bindEvents();
  }

  bindEvents() {
    this.gallery.bindEvents();
  }
}

export default App;
