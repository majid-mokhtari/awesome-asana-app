import "./modal.css";

class Modal {
  constructor() {
    this.modal = document.getElementById("myModal");
  }
  close() {
    this.modal.style.display = "none";
  }
  render(img) {
    this.modal.innerHTML = "";
    const closeBtn = document.createElement("span");
    closeBtn.setAttribute("class", "close");
    closeBtn.addEventListener("click", () => this.close());
    closeBtn.innerHTML = "&times;";

    const modalContent = document.createElement("img");
    modalContent.setAttribute("class", "modal-content ");
    modalContent.setAttribute("src", img.src);

    this.modal.appendChild(closeBtn);
    this.modal.appendChild(modalContent);
    this.modal.style.display = "block";
  }
}

export default Modal;
