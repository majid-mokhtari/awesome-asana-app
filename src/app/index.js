import Footer from "../footer";
import Header from "../header";
import Gallery from "./Gallery";
import "./styles.css";

class App {
  constructor() {
    this.root = document.getElementById("root");
    this.renderHeader();
    this.renderBody();
  }
  renderHeader() {
    this.root.innerHTML += Header;
  }
  async renderBody() {
    const gallery = new Gallery();
    await gallery
      .fetchData({ limit: 8, offset: 0 })
      .then(res => {
        const gal = gallery.buildGallery(res);
        this.root.appendChild(gal);
        gallery.bindImageClick();
      })
      .catch(err => {
        console.log(err);
      });
    this.renderFooter();
  }
  renderFooter() {
    this.root.innerHTML += Footer;
  }
}

export default App;
