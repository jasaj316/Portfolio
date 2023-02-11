// import scripts
import { projectsScripts } from "./scripts/projectsScripts.js";
import { contactScripts } from "./scripts/contactScripts.js";

// directory of page titles and associated scripts
const pageDir = [
  ["3D-art", projectsScripts],
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


function fetchCurrentPage() {
  // make sure the current hash is valid
  let hashIsCorrect = false;
  pageDir.forEach(page => {
    // check for the current page
    if (window.location.href.split("#")[1] === page[0]) {
      // current hash is valid
      hashIsCorrect = true;
      // fetch page html
      fetch(`./public/pages/${page[0]}.html`)
        .then(resp => {
          return resp.text();
        })
        .then(text => {
          // put it in main (ID=main)
          main.innerHTML = text;
        })
      // run this page's scripts if they exist
      for (let i = 1; i < page.length; i++) {
        if (page[i]) {
          page[i]();
          // remove reference to prevent duplicate scripts
          page[i] = false;
        }
      }
      // set document title
      document.title = document.title.split("|")[0] + ` | ${page[0].toUpperCase().slice(0, 1) + page[0].slice(1)}`;
    }
  })
  // set hash to homepage if hash is invalid
  if (!hashIsCorrect) {
    window.location = `#${homePage[0]}`;
  }
}

// adding listeners to button events   // Changes current hash to the button's associated pageDir #
buttonDir.forEach(btn => btn[0].addEventListener("click", () => window.location = `#${pageDir[btn[1]][0]}`));

// adding listeners for changing pages
let changeCurrentPageEvents = ["hashchange", "load"];
changeCurrentPageEvents.forEach(e => window.addEventListener(e, fetchCurrentPage));


// hit tracking
window.addEventListener("DOMContentLoaded", () => {

  // get list of cookies
  let cookieList = [document.cookie.split(";"), false];
  // if visited cookie exists, set to true
  cookieList[0].forEach(cookie => {
    if (cookie == "site=visited") {
      cookieList[1] = true;
    }
  })
  // if visited cookie does not exist, increment and set cookie
  if (cookieList[1] == false) {
    fetch(`https://api.countapi.xyz/hit/jasaj316/value`)
      .then(blob => blob.json())
      .then(json => console.log(json))

    document.cookie = `site=visited; expires=${new Date(2147483647 * 1000).toUTCString()}`;
  }
});

/* check key value: 
fetch(`https://api.countapi.xyz/get/jasaj316/value`)
    .then(blob => blob.json())
    .then(json => console.log(json.value))
*/