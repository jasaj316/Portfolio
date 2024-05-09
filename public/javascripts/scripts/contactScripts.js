export function contactScripts() {
  let formButton = document.querySelector(".form-button");

  // populate mailto link with form data
  formButton.addEventListener("click", () => {
    formButton.href = `mailto:jasaj316@gmail.com?subject=${subject.value}&body=${body.value}`;
  })
}