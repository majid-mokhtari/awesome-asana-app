import Header from './header'
import Footer from './footer'
import './index.css';

const root = document.getElementById('root')

//include header
root.innerHTML += Header;

function buildGallery(data){
    var gallery = document.createElement("div");
        gallery.setAttribute('class', 'gallery');
    for(let i=0; i<data.length; i++){
        let galleryItem = document.createElement("div");
        galleryItem.setAttribute('class', 'gallery-item');
        let image = document.createElement("img");
        image.setAttribute("src", data[i].image);
        image.setAttribute("height", 300)
        image.setAttribute("width", 300)
        image.addEventListener("click", () => window.open(data[i].source, '_blank'))
        galleryItem.appendChild(image);
        gallery.appendChild(galleryItem);
    }
    root.appendChild(gallery)
    
    //include footer
    root.innerHTML += Footer;
  }

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data/dogs.json');
xhr.onload = function() {
  if (xhr.status === 200) {
     const { dogs } = JSON.parse(xhr.responseText)
     buildGallery(dogs)
  } else {
      console.log('Request failed.  Returned status of ' + xhr.status);
  }
};
xhr.send();