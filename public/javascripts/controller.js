// importing page data
import { projects } from "./pages/projects.js";
import { about } from "./pages/about.js";
import { contact } from "./pages/contact.js";

// importing scripts
import { projectsScripts } from "./scripts/projectsScripts.js";
import { contactScripts } from "./scripts/contactScripts.js";

//page body
let main = document.querySelector("main");

// button links
let buttonLogo = document.querySelector(".logo img");
let buttonProjects = document.querySelector("nav a:nth-child(1)");
let buttonContact = document.querySelector("nav a:nth-child(2)");

// directory of pages and associated scripts
const pageDir = [
  ["projects", projectsScripts],
  ["about"],
  ["contact", contactScripts]
];

//setting home page
let currentPage = pageDir[0];


// routing for loading pages, running scripts
function loadPage() {
  //create html inside main
  if (currentPage[0] == "projects") {
    main.innerHTML = projects;
  }
  else if (currentPage[0] == "about") {
    main.innerHTML = about;
  }
  else if (currentPage[0] == "contact") {
    main.innerHTML = contact;
  }
  // run pagescript if it exists, remove reference to prevent duplicate scripts
  for (let i = 1; i < currentPage.length; i++) {
    if (currentPage[i]) {
      currentPage[i]();
      currentPage[i] = false;
    };
  }
};

// setting up button links (hrefs)
buttonLogo.addEventListener("click", () => { currentPage = pageDir[0]; loadPage(); })
buttonProjects.addEventListener("click", () => { currentPage = pageDir[0]; loadPage(); })
buttonContact.addEventListener("click", () => { currentPage = pageDir[2]; loadPage(); })

//when the page is created, load the home page
main.onload = loadPage();