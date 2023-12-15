export function projectsScripts() {
  // Modal Images
  let modalActive = false;
  function removeModal() {
    // enable scrolling
    document.body.style.overflow = 'visible';
    document.body.style.paddingRight = '0px';
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
      else
        img.style.cursor = "zoom-out";
    }
    // zoom out to screen size
    if (e.deltaY > 0) {
      if (zoomAmnt > 1) {
        zoomAmnt -= zoomStep;
        img.style.cursor = "zoom-in";
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
    //detect scrollbar width
    document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
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