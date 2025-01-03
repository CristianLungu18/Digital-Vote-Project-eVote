const logInBtn = document.querySelector(".login-btn");
const emailInput = document.querySelector(".email-input");
const passowrdInput = document.querySelector(".password-input");
const invalidEmailBox = document.querySelector(".invalid-email-box");
const invalidPasswordBox = document.querySelector(".invalid-password-box");

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/login",
      data: {
        email,
        password,
      },
    });
    window.location.assign("/home");
  } catch (err) {
    let emailErr = "";
    let passwordErr = "";
    if (err.response.data.message) {
      emailErr = err.response.data.message;
      emailInput.classList.add("is-invalid");
      invalidEmailBox.textContent = emailErr;
    }
    if (err.response.data.message) {
      passwordErr = err.response.data.message;
      passowrdInput.classList.add("is-invalid");
      invalidPasswordBox.textContent = err.response.data.message;
    }
  }
};

logInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passowrdInput.value;
  login(email, password);
});
