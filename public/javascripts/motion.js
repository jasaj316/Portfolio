// Menu
const nav = document.querySelector("nav");
const logo = document.querySelector("div.logo > img");


window.addEventListener("click", (e) => {
  if (e.path[0] == logo) {
    nav.classList.toggle("open");
  } else {
    nav.classList.remove("open");
  }
});
// Menu

// Portfolio
const linkOne = document.querySelector("#link-one");
const linkTwo = document.querySelector("#link-two");

const itemsOne = document.querySelector("#items-one");
const itemsTwo = document.querySelector("#items-two");

// clicking link one
linkOne.addEventListener("click", () => {
  //if one is hidden
  if (itemsOne.classList("hidden")) {
    //make one visible
    itemsOne.classList.remove("hidden");
    //if two is visible
    if (!itemsTwo.classList("hidden")) {
      // make two hidden
      itemsTwo.classList.add("hidden");
    }

  }
  // else if one is already visible
  else {
    //  make one hidden
    itemsOne.classList.add("hidden");
  }
})
linkTwo.addEventListener("click", () => {
  //if two is hidden
  if (itemsTwo.classList("hidden")) {
    //make two visible
    itemsTwo.classList.remove("hidden");
    //if one is visible
    if (!itemsOne.classList("hidden")) {
      // make one hidden
      itemsOne.classList.add("hidden");
    }

  }
  // else if two is already visible
  else {
    //  make two hidden
    itemsTwo.classList.add("hidden");
  }
})
// Portfolio