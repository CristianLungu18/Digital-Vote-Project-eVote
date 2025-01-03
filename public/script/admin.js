const showResultsBtn = document.querySelector(".show-results-btn");
let resultsCookie = getCookie("results") === "true";

updateButtonText(resultsCookie);

showResultsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resultsCookie = !resultsCookie;
  document.cookie = `results=${resultsCookie}`;
  updateButtonText(resultsCookie);
});

function getCookie(name) {
  const cookies = document.cookie.split("=")[1];
  return cookies;
}

function updateButtonText(isResultsEnabled) {
  showResultsBtn.textContent = isResultsEnabled
    ? "Ascunde rezultate"
    : "Afișează rezultate";
}
