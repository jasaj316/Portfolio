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
