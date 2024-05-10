export function contactScriptsLoad() {
  // populate mailto link with form data
  document.querySelector("#form-button").addEventListener("click", () => {
    formButton.href = `mailto:jasaj316@gmail.com?subject=${subject.value}&body=${body.value}`;
  })
  // populate email text
  document.querySelector("#form-email span").innerHTML = "jasaj316@gmail.com";
}

// nothing to unload
export function contactScriptsUnload() {
}