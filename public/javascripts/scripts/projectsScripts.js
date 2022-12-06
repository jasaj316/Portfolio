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

  // global scoped zoom value (tracking outside scroll event)
  let zoomAmnt = 1;
  //last mouse position for averaging at high zoom levels
  let LastMouseXY = false;
  // zooming in or out of an image
  function scrollImg(e, img) {
    // get the percent value of mouse position
    let mouseXY = [Math.round(e.x / window.innerWidth * 100), Math.round(e.y / window.innerHeight * 100)];
    //set the speed of zooming
    let zoomStep = 0.2;

    // weigh vertical mouse position closer to edges 
    if (mouseXY[1] > 50) {
      mouseXY[1] += (mouseXY[1] / (zoomAmnt * 4));
      if (mouseXY[1] > 100) {
        mouseXY[1] = 100
      }
    }
    else {
      mouseXY[1] -= ((50 - mouseXY[1]) / (zoomAmnt * 4));
      if (mouseXY[1] < 0) {
        mouseXY[1] = 0
      }
    }
    //nudge mouse position closer to last mouse position depending on zoom amount
    if (LastMouseXY) {
      for (let i = zoomAmnt; i > 1; i = i - zoomStep * 2) {
        mouseXY[0] = (mouseXY[0] + LastMouseXY[0]) / 2;
        mouseXY[1] = (mouseXY[1] + LastMouseXY[1]) / 2;
      }
    }

    // zoom in to 4x
    if (e.deltaY < 0) {
      if (zoomAmnt < 4) {
        zoomAmnt += zoomStep;
        // only change origin if zooming in
        img.style.transformOrigin = `${LastMouseXY[0]}% ${mouseXY[1]}%`;
      }
    }
    // zoom out to screen size
    if (e.deltaY > 0) {
      if (zoomAmnt > 1) {
        zoomAmnt -= zoomStep;

      }
    }
    // set tranform scale
    img.style.transform = `scale(${zoomAmnt})`
    //set previous mouse position
    LastMouseXY = mouseXY;
  }

  // main queryselector
  let main = document.querySelector("main");
  function addModal(e) {
    // insert the modal "beforeend" of main
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
  main.addEventListener("click", (e) => {
    console.log(e.target);
    // if clicking a portfolio img, add a modal window if none is active
    if ((e.target.nodeName == "IMG" && !e.target.hasAttribute("id")) && !modalActive) {
      addModal(e)
    }
    else if (modalActive) {
      // if clicking, remove modal if it exists
      removeModal();
    }
  });
}