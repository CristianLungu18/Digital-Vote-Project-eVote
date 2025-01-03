const signUpBtn = document.querySelector(".signup-btn");
const nameInput = document.querySelector(".name-input");
const prenumeInput = document.querySelector(".prenume-input");
const usernameInput = document.querySelector(".username-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const confirmPasswordInput = document.querySelector(".confirmPassword-input");
const varstaInput = document.querySelector(".varsta-input");
const sexInput = document.querySelector(".sex-input");
const succesAlert = document.querySelector(".alert-box");
const invalidNameBox = document.querySelector(".invalid-name-box");
const invalidPrenumeBox = document.querySelector(".invalid-prenume-box");
const invalidUsernameBox = document.querySelector(".invalid-username-box");
const invalidEmailBox = document.querySelector(".invalid-email-box");
const invalidPasswordBox = document.querySelector(".invalid-password-box");
const invalidConfirmPasswordBox = document.querySelector(
  ".invalid-confirmPassword-box"
);
const invalidVarstaBox = document.querySelector(".invalid-varsta-box");
const invalidSexBox = document.querySelector(".invalid-sex-box");
const signUpForm = document.querySelector(".form-container");


signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const prenume = prenumeInput.value;
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = confirmPasswordInput.value;
  const varsta = varstaInput.value;
  const sex = sexInput.value;
  signup(
    name,
    prenume,
    username,
    email,
    password,
    passwordConfirm,
    varsta,
    sex
  );
});
