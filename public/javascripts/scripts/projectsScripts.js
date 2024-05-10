export function projectsScriptsLoad() {
  // modal elements
  let modal = document.querySelector("#modal");
  let modalImg = document.querySelector("#modal>div img");
  let modalTitle = document.querySelector("#modal>div h2");
  let modalLb = document.querySelector("#modal>div p:first-of-type");
  let modalRb = document.querySelector("#modal>div p:last-of-type");

  // an array of all card titles and their images
  let cards = [];
  document.querySelectorAll(".card").forEach(card => {
    cards.push({ title: card.querySelector("h3"), img: card.querySelector("img") })
  });

  function loadImg(e, dir = "") {
    // if clicking card img, show that img
    if (e.target.nodeName === "IMG" && e.target.parentNode.className === "card") {
      modalImg.src = e.target.src;
    }
    // else if using arrows, show previous or next img
    else if (dir === "L") {
      for (let i = 0; i < cards.length; i++) {
        if (modalImg.src === cards[i].img.src)
          if (i > 0) {
            modalImg.src = cards[i - 1].img.src;
            break;
          }
          else {
            modalImg.src = cards[cards.length - 1].img.src;
            break;
          }
      }
    }
    else if (dir === "R") {
      for (let i = 0; i < cards.length; i++) {
        if (modalImg.src === cards[i].img.src)
          if (i < cards.length - 1) {
            modalImg.src = cards[i + 1].img.src;
            break;
          }
          else {
            modalImg.src = cards[0].img.src;
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

  // once the modal image is loaded, assign title according to current img, show modal 
  modalImg.addEventListener("load", () => {
    cards.forEach(card => {
      if (modalImg.src === card.img.src) {
        modalTitle.innerHTML = card.title.innerHTML;
      }
    })
    modal.showModal();

  });

  //when going left/right, set the modal image's src to the privious or next card img's src
  modalLb.addEventListener("click", (e) => {
    loadImg(e, "L");
  });
  modalRb.addEventListener("click", (e) => {
    loadImg(e, "R");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")
      loadImg(e, "L");

    else if (e.key === "ArrowRight")
      loadImg(e, "R");
  });
  // when clicking on a card img, set the modal image's src to the card img's src
  document.addEventListener("click", (e) => {
    loadImg(e);
  });
}


// unloads modal and resets video
export function projectsScriptsUnload() {
  document.querySelector("#modal")?.close();
  document.querySelectorAll('iframe')?.forEach(i => { i.src = i.src });
}