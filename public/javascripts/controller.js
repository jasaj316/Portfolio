// importing page data
import projects from "pages/projects.js";
import about from "pages/about.js";
import contact from "pages/contact.js";

// importing scripts
import projectsScripts from "scripts/projectsScripts.js";
import aboutScripts from "scripts/aboutScripts.js";
import contactScripts from "scripts/contactScripts.js";

let main = document.querySelector("main");

let currentPage = "projects"

// routing for loading pages, running page script
function loadPage(pageScript) {
  //create html inside main
  if (currentPage == "projects") {
    main.innerHTML = projects;
  }
  else if (currentPage == "about") {
    main.innerHTML = about;
  }
  else if (currentPage == "contact") {
    main.innerHTML = contact;
  }
  // run pagescript if it exists
  if (pagescript) { pagescript(); };
};


loadPage(projectsScripts);