export function projectsScripts() {
  let modal = document.querySelector("#modal");
  let modalImg = document.querySelector("#modal>div img");
  let modalLb = document.querySelector("#modal>div p:first-of-type");
  let modalRb = document.querySelector("#modal>div p:last-of-type");

  // get an array of all card images
  let cardImgs = document.querySelectorAll(".card img");

  function loadImg(e) {
    if (e.target.nodeName === "IMG" && e.target.parentNode.className === "card") {
      modalImg.src = e.target.src;
    }
    else if (e.target == modalLb) {
      for (let i = 0; i < cardImgs.length; i++) {
        if (modalImg.src === cardImgs[i].src)
          if (i > 0) {
            modalImg.src = cardImgs[i - 1].src;
            break;
          }
          else {
            modalImg.src = cardImgs[cardImgs.length - 1].src;
            break;
          }
      }
    }
    else if (e.target == modalRb) {
      for (let i = 0; i < cardImgs.length; i++) {
        if (modalImg.src === cardImgs[i].src)
          if (i < cardImgs.length - 1) {
            modalImg.src = cardImgs[i + 1].src;
            break;
          }
          else {
            modalImg.src = cardImgs[0].src;
            break;
          }
      }
    }
    // stop modal listener from receiving event
    e.stopPropagation();
  }

  // close modal when clicking modal
  modal.addEventListener("click", () => {
    modal.close();
  });

  // once the modal image is loaded, show modal
  modalImg.addEventListener("load", () => {
    modal.showModal();
  });

  //when clicking left/right, set the modal image's src to tehe privious or next card img's src
  modalLb.addEventListener("click", (e) => {
    loadImg(e);
  });
  modalRb.addEventListener("click", (e) => {
    loadImg(e);
  });
  // when clicking on a card img, set the modal image's src to the card img's src
  document.addEventListener("click", (e) => {
    loadImg(e);
  });
}