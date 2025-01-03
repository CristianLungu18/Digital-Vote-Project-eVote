const checkinput = document.querySelector(".checkinput");
const confirmBtn = document.querySelector(".confirm-btn");

confirmBtn.classList.add("disabled-btn");
checkinput.addEventListener("click", () => {
  if (checkinput.checked) {
    confirmBtn.classList.remove("disabled-btn");
  } else {
    confirmBtn.classList.add("disabled-btn");
  }
});
