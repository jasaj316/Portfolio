export function projectsScripts() {
  let modal = document.querySelector("#modal");
  let modalImg = document.querySelector("#modal>div img");

  // close modal when clicking modal
  modal.addEventListener("click", () => {
    modal.close();
  });

  // once the modal image is loaded, show modal
  modalImg.addEventListener("load", () => {
    modal.showModal();
  });

  // when clicking on a portfolio img, set the modal image's src to the portfolio img's src
  document.addEventListener("click", (e) => {
    if (e.target.nodeName === "IMG" && e.target.parentNode.className === "card") {
      modalImg.src = e.target.src;
    }
  });
}