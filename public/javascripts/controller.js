// import scripts
import { projectsScripts } from "./scripts/projectsScripts.js";
import { contactScripts } from "./scripts/contactScripts.js";

// directory of page titles and associated scripts
const pageDir = [
  ["projects", projectsScripts],
  ["bio"],
  ["contact", contactScripts]
];
// set homepage to a pageDir #
const homePage = pageDir[0];

// directory of button ids and associated pageDir #
let buttonDir = [
  [buttonLogo, 0],
  [buttonBio, 1],
  [buttonContact, 2]
];

function runCurrentScripts(currentHash) {
  // iterate through pages
  pageDir.forEach(page => {
    // on the current page
    if (currentHash == page[0]) {
      for (let i = 1; i < page.length; i++) {
        // run this page's scripts if they exist
        if (page[i]) {
          page[i]();
          // remove reference to prevent duplicate scripts
          page[i] = false;
        }
      }
    }
  })
}

function fetchCurrentPage() {
  // get hash from url
  let currentHash = window.location.href.split("#")[1];

  // make sure the current hash is valid
  let hashExists = false;
  pageDir.forEach(page => {
    // on the current page
    if (currentHash == page[0]) {
      hashExists = true;
    }
  })
  // if current hash is valid
  if (hashExists) {
    // fetch html as text
    fetch(`./public/pages/${currentHash}.html`)
      .then(resp => {
        return resp.text();
      })
      .then(text => {
        // put it in main (ID=main)
        main.innerHTML = text;
        // run page's scripts
        runCurrentScripts(currentHash);
      })
  }
  // set hash to homepage if there is no hash / hash is invalid
  if (!currentHash || currentHash == null || !hashExists) {
    window.location = `#${homePage[0]}`;
  }
}

// adding listeners to button events   // Changes current hash to the button's associated pageDir #
buttonDir.forEach(btn => btn[0].addEventListener("click", () => window.location = `#${pageDir[btn[1]][0]}`));

// adding listeners for changing pages
let changeCurrentPageEvents = ["hashchange", "load"];
changeCurrentPageEvents.forEach(e => window.addEventListener(e, fetchCurrentPage));