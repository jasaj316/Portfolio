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
  if (itemsOne.classList.contains("hidden")) {
    //make one visible, change text
    itemsOne.classList.remove("hidden");
    linkOne.innerHTML = "3D Art ▲";
    //if two is visible
    if (!itemsTwo.classList.contains("hidden")) {
      // make two hidden
      itemsTwo.classList.add("hidden");
    }

  }
  // else if one is already visible
  else {
    // make one hidden, change text
    itemsOne.classList.add("hidden");
    linkOne.innerHTML = "3D Art ▼";
  }
})

// clicking link two
linkTwo.addEventListener("click", () => {
  //if two is hidden
  if (itemsTwo.classList.contains("hidden")) {
    //make two visible, change text
    itemsTwo.classList.remove("hidden");
    linkTwo.innerHTML = "Web Dev ▲";
    //if one is visible
    if (!itemsOne.classList.contains("hidden")) {
      // make one hidden
      itemsOne.classList.add("hidden");
    }

  }
  // else if two is already visible
  else {
    //  make two hidden
    itemsTwo.classList.add("hidden");
    linkTwo.innerHTML = "Web Dev ▼";
  }
})
// Portfolio