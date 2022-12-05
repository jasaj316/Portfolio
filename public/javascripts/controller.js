let main = document.querySelector("main");

// importing scripts
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

// home page 
let currentPage = pageDir[0];

// load scripts after fetching html
function loadScripts() {
  // iterate through pagescripts
  for (let i = 1; i < currentPage.length; i++) {
    // run pagescript if it exists
    if (currentPage[i]) {
      currentPage[i]();
      // remove reference to prevent duplicate scripts
      currentPage[i] = false;
    };
  }
}

// fetching current html 
function loadPage() {
  // fetch html as text
  fetch(`./public/pages/${currentPage[0]}.html`)
    .then(resp => {
      return resp.text();
    })
    .then(text => {
      // put it in main
      main.innerHTML = text;
      // then load scripts
      loadScripts();
    })
};


// adding listeners to buttons
buttonDir.forEach(btn => {
  // change current page and reload
  btn[0].addEventListener("click", () => { currentPage = pageDir[btn[1]]; loadPage(); });
});

//when the page is created, load the home page
main.onload = loadPage();