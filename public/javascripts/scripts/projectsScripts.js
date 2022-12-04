export function projectsScripts() {
  // Portfolio
  const linkOne = document.querySelector("#link-one");
  const linkTwo = document.querySelector("#link-two");

  const itemsOne = document.querySelector("#items-one");
  const itemsTwo = document.querySelector("#items-two");

  const textOne = ["3D Art ▼", "3D Art ▲"];
  const textTwo = ["Web Dev ▼", "Web Dev ▲"];
  // clicking link one
  linkOne.addEventListener("click", () => {
    //if one is hidden
    if (itemsOne.classList.contains("hidden")) {
      //make one visible, change text
      itemsOne.classList.remove("hidden");
      linkOne.innerHTML = textOne[1];
      //if two is visible
      if (!itemsTwo.classList.contains("hidden")) {
        // make two hidden, change text
        itemsTwo.classList.add("hidden");
        linkTwo.innerHTML = textTwo[0];
      }

    }
    // else if one is already visible
    else {
      // make one hidden, two visible, change text
      itemsTwo.classList.remove("hidden");
      linkTwo.innerHTML = textTwo[1];
      itemsOne.classList.add("hidden");
      linkOne.innerHTML = textOne[0];
    }
  })

  // clicking link two
  linkTwo.addEventListener("click", () => {
    //if two is hidden
    if (itemsTwo.classList.contains("hidden")) {
      //make two visible, change text
      itemsTwo.classList.remove("hidden");
      linkTwo.innerHTML = textTwo[1];
      //if one is visible
      if (!itemsOne.classList.contains("hidden")) {
        // make one hidden, change text
        itemsOne.classList.add("hidden");
        linkOne.innerHTML = textOne[0];
      }

    }
    // else if two is already visible
    else {
      //  make two hidden, one visible, change text
      itemsOne.classList.remove("hidden");
      linkOne.innerHTML = textOne[1];
      itemsTwo.classList.add("hidden");
      linkTwo.innerHTML = textTwo[0];
    }
  })



  // Modal Images
  let modalActive = false;

  function removeModal() {
    // enable scrolling
    document.body.style.overflow = 'visible';
    // remove modal elements
    let oldBg = document.querySelector(".modal-bg");
    let oldImg = document.querySelector(".modal-img-container");
    oldBg.remove();
    oldImg.remove();
    // modalActive is false
    modalActive = false;
  }


  // zooming in or out of an image
  function scrollImg(e, img) {
    // get computed image height as a number
    let imgHeight = Number(window.getComputedStyle(img).height.split("px")[0]);
    // set scroll amount
    let scrollAmnt = e.deltaY;

    // locking img aligns
    // if mouse is at the top of the image
    if (e.y <= window.innerHeight / 2) {
      // lock alignment to start when image is close to the height of window
      if (imgHeight <= window.innerHeight - scrollAmnt * 2) {
        img.style.alignSelf = 'start';
      }
    }
    // if mouse is at the bottom of the image
    else {
      // lock alignment to end when image is same height as window
      if (imgHeight <= window.innerHeight - scrollAmnt * 2) {
        console.log(img.style.alignSelf);
        img.style.alignSelf = 'end';
      }
    }

    // setting zoom heights
    // only zoom in to 4x
    if (window.innerHeight * 4 > imgHeight) {
      // if zooming in at bottom
      if (e.deltaY < 0 && img.style.alignSelf == "end") {
        img.style.height = `${imgHeight -= scrollAmnt}px`
      }
      // if zooming in at top
      if (e.deltaY < 0 && img.style.alignSelf == "start") {
        img.style.height = `${imgHeight -= scrollAmnt}px`
      }
    }
    // only zoom out to screen size
    if (window.innerHeight + scrollAmnt <= imgHeight) {
      // if zooming out at bottom
      if (e.deltaY > 0 && img.style.alignSelf == "end") {
        img.style.height = `${imgHeight -= scrollAmnt}px`
      }
      // if zooming out at top
      if (e.deltaY > 0 && img.style.alignSelf == "start") {
        img.style.height = `${imgHeight -= scrollAmnt}px`
      }
    }


  }



  function addModal(e) {
    // select main and insert the modal "beforeend"
    let main = document.querySelector("main");
    main.insertAdjacentHTML("beforeend", `
    <div class="modal-bg"></div>
    <div class="modal-img-container">
      <img src="./public${e.target.src.split(/public/)[1]}" class="modal-img">
    </div>
    `);
    // modalActive is true
    modalActive = true;
    // prevent scrolling
    document.body.style.overflow = 'hidden';
    // add eventListener on image for scrolling
    let img = document.querySelector(".modal-img");
    img.addEventListener("wheel", (e) => {
      scrollImg(e, img);
    });
  }
  // eventListener for showing/hiding modal
  window.addEventListener("click", (e) => {
    // if clicking a portfolio img, add a modal window if none is active
    if ((e.target.nodeName == "IMG" && !e.target.hasAttribute("id")) && !modalActive) {
      addModal(e)
    }
    else if (modalActive) {
      // if clicking x, remove modal if it exists
      removeModal();
    }
  });

}