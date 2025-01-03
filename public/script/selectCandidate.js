const confirmBtn = document.querySelector(".select-btn");
const candidatInput = document.querySelector(".candidat-input");
const step3Btn = document.querySelector(".step-3-btn");
const confirmBox = document.querySelector(".select-btn-box");

step3Btn.classList.add("disabled-btn");

const updateVote = async (candidat) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/api/v1/update-vote",
      data: { candidat },
    });
  } catch (err) {
    console.log(err);
  }
};

const inputState = () => {
  if (!candidatInput.value) {
    confirmBtn.classList.add("disabled-btn");
  } else {
    confirmBtn.classList.remove("disabled-btn");
  }
};

candidatInput.addEventListener("input", inputState);

inputState();

confirmBtn.addEventListener("click", () => {
  const candidat = candidatInput.value;
  confirmBox.innerHTML = `
  <div class="spinner-border" role="status" style="margin-bottom:12px; margin-top:10px;">
    <span class="sr-only">Loading...</span>
  </div>`;
  setTimeout(() => {
    confirmBox.innerHTML = `
    <a href="/review-vote" class="select-btn step-3-btn">Pasul 3 <i class="fa-solid fa-arrow-right"></a>`;
    candidatInput.classList.add("disabled-btn");
  }, 5000);
  updateVote(candidat);
});
