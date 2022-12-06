let main = document.querySelector("main");

// import scripts
import { projectsScripts } from "./scripts/projectsScripts.js";
import { contactScripts } from "./scripts/contactScripts.js";

// directory of page titles and associated scripts
const pageDir = [
  ["projects", projectsScripts],
  ["about"],
  ["contact", contactScripts]
];

// directory of button ids and associated pageDir #
let buttonDir = [
  [buttonLogo, 0],
  [buttonAbout, 1],
  [buttonContact, 2]
];

// variable for tracking what page to direct to
let currentPage = null


function changeCurrentPage() {
  // set page to homepage if there is no hash
  if (!window.location.href.split("#")[1] || window.location.href.split("#")[1] == null) {
    currentPage = pageDir[0];
    window.location = `#${currentPage[0]}`;
  }
  else {
    // if there is a hash, set page to current pageDir
    pageDir.forEach(page => {
      if (window.location.href.split("#")[1] == page[0]) {
        currentPage = page;
      }
    });
  }
  // fetch html as text
  fetch(`./public/pages/${currentPage[0]}.html`)
    .then(resp => {
      return resp.text();
    })
    .then(text => {
      // put it in main
      main.innerHTML = text;
      // iterate through pagescripts
      for (let i = 1; i < currentPage.length; i++) {
        // run pagescript if it exists
        if (currentPage[i]) {
          currentPage[i]();
          // remove reference to prevent duplicate scripts
          currentPage[i] = false;
        };
      }
    })
}


// adding listeners to button events
buttonDir.forEach(btn => {
  // change current page and hash
  btn[0].addEventListener("click", () => {
    currentPage = pageDir[btn[1]];
    window.location = `#${currentPage[0]}`;
    console.log(currentPage);
  });
});

// adding listener for when hash is changed
window.addEventListener("hashchange", changeCurrentPage);
// adding listener for when site first loads
window.addEventListener("load", changeCurrentPage);