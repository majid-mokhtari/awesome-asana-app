import "./modal.css";

class Modal {
  constructor(img) {
    this.modal = document.getElementById("myModal");
    this.modal.innerHTML = "";

    const closeBtn = document.createElement("span");
    closeBtn.setAttribute("class", "close");
    closeBtn.addEventListener("click", () => this.closeModal());
    closeBtn.innerHTML = "&times;";

    const modalContent = document.createElement("img");
    modalContent.setAttribute("class", "modal-content ");
    modalContent.setAttribute("src", img.src);

    this.modal.appendChild(closeBtn);
    this.modal.appendChild(modalContent);
    this.modal.style.display = "block";
  }
  closeModal() {
    this.modal.style.display = "none";
  }
}

export default Modal;
