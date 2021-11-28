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

linkOne.addEventListener("click", () => {
  itemsOne.classList.toggle("hidden");
})

linkTwo.addEventListener("click", () => {
  itemsTwo.classList.toggle("hidden");
})
// Portfolio