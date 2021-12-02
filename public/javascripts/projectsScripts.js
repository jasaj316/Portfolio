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
    // make one hidden, change text
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
    //  make two hidden, change text
    itemsTwo.classList.add("hidden");
    linkTwo.innerHTML = textTwo[0];
  }
})
// Portfolio

// Modal Images
let selectedImg = "";
let modalElements = document.createElement(`<div class="modal-bg"></div>
<img src="${selectedImg}" alt="" class="modal-img">`);

function removeModal() {
  let oldBg = document.querySelector(".modal-bg");
  let oldImg = document.querySelector(".modal-img");
  document.removeChild(oldBg);
  document.removeChild(oldImg);
}

window.addEventListener("click", (e) => {
  //on click, remove any existing modal
  if (document.querySelector(".modal-bg")) {
    removeModal();
  }
  //if clicking img, open the modal window
  if (e.target.nodeName == "IMG") {
    // add the target src to the modal element
    selectedImg = e.target.src;
    // insert modal element
    document.insertBefore(modalElements, itemsOne);
  }
  else {
    // if not clicking an image, remove modal
    removeModal()
  }
});