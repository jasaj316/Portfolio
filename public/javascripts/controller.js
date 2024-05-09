// import scripts
import { projectsScripts } from "./scripts/projectsScripts.js";
import { contactScripts } from "./scripts/contactScripts.js";

// directory of page titles, is html loaded?, and associated scripts
const pageDir = [
  ["3D-art", false, projectsScripts],
  ["bio", false],
  ["contact", false, contactScripts]
];
// set homepage to a pageDir #
const homePage = pageDir[0];

// directory of button ids and associated pageDir #
const buttonDir = [
  [buttonLogo, 0],
  [buttonBio, 1],
  [buttonContact, 2]
];

function fetchCurrentPage() {
  // stop youtube when changing page
  document.querySelectorAll('iframe').forEach(i => { i.src = i.src });
  // make sure the current hash is valid by setting it false
  let hashIsCorrect = false;
  pageDir.forEach(page => {
    // hide all pages
    document.querySelector(`#page-${page[0]}`)?.classList.add("hidden");
    // check for the current page in pageDir
    if (window.location.href.split("#")[1] === page[0]) {
      // current hash is valid
      hashIsCorrect = true;

      // if current page hasn't been loaded yet, add it to the document, then run scripts
      if (page[1] === false) {
        // fetch page html
        fetch(`./public/pages/${page[0]}.html`)
          .then(resp => {
            return resp.text();
          })
          .then(text => {
            // create new div element with fetched html and id=page[0]
            let tempEl = document.createElement("div");
            tempEl.setAttribute("id", `page-${page[0]}`);
            tempEl.innerHTML = text;
            main.appendChild(tempEl);
            page[1] = true;
          });
        // check if page element is valid before running scripts
        let pageLoadInterval = setInterval(() => {
          //  if valid, run this page's scripts if they exist. 
          if (main.querySelector(`#page-${page[0]}:last-child`)) {
            clearInterval(pageLoadInterval);
            for (let i = 2; i < page.length; i++) {
              if (page[i]) {
                page[i]();
              }
            }
          }
        }, 10)
      }

      // unhide this page
      document.querySelector(`#page-${page[0]}`)?.classList.remove("hidden");
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
