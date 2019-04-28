import Footer from "../footer";
import Header from "../header";
import Gallery from "./Gallery";
import "./styles.css";

class App {
  constructor() {
    this.root = document.getElementById("root");
  }
  render() {
    this.renderHeader();
  }
  async renderHeader() {
    await Header()
      .then(res => {
        this.root.innerHTML += res;
      })
      .catch(err => console.log(err));
    this.renderGallery();
  }
  async renderGallery() {
    this.gallery = new Gallery();
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
    await Footer()
      .then(res => {
        this.root.innerHTML += res;
      })
      .catch(err => console.log(err));
    this.bindEvents();
  }
  bindEvents() {
    this.gallery.bindEvents();
  }
}

export default App;
