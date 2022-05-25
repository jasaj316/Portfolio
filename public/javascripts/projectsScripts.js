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
// Portfolio

// Modal Images

let modalActive = false;

function removeModal() {
  //remove modal elements
  let oldBg = document.querySelector(".modal-bg");
  let oldImg = document.querySelector(".modal-img");
  oldBg.remove();
  oldImg.remove();
  //modalActive is false
  modalActive = false;
}

function addModal(e) {
  //select main and insert the modal "beforeend"
  let main = document.querySelector("main");
  main.insertAdjacentHTML("beforeend", `<div class="modal-bg"><p>✖</p></div><img src="${e.target.src.slice(34)}" class="modal-img">`);
  //modalActive is true
  modalActive = true;
}

window.addEventListener("click", (e) => {
  //if clicking a portfolio img, add a modal window if none is active
  if ((e.target.nodeName == "IMG" && !e.target.hasAttribute("id")) && !modalActive) {
    addModal(e)
  }
  else if (modalActive && e.target.innerHTML == "✖") {
    // if clicking x, remove modal if it exists
    removeModal();
  }
});