const signup = async (
  nume,
  prenume,
  username,
  email,
  password,
  confirmPassword,
  varsta,
  sex
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/signup",
      data: {
        nume,
        prenume,
        username,
        email,
        password,
        confirmPassword,
        varsta,
        sex,
      },
    });
    succesAlert.classList.remove("visibility");
    nameInput.value = "";
    prenumeInput.value = "";
    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
    varstaInput.value = "";
    sexInput.value = "";

    nameInput.classList.remove("is-invalid");
    nameInput.classList.remove("is-valid");

    prenumeInput.classList.remove("is-invalid");
    prenumeInput.classList.remove("is-valid");

    usernameInput.classList.remove("is-invalid");
    usernameInput.classList.remove("is-valid");

    emailInput.classList.remove("is-invalid");
    emailInput.classList.remove("is-valid");

    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-valid");

    confirmPasswordInput.classList.remove("is-invalid");
    confirmPasswordInput.classList.remove("is-valid");

    varstaInput.classList.remove("is-invalid");
    varstaInput.classList.remove("is-valid");

    sexInput.classList.remove("is-invalid");
    sexInput.classList.remove("is-valid");

    setTimeout(() => {
      succesAlert.classList.add("visibility");
    }, 3000);
    console.log(res);
  } catch (err) {
    console.log(err);
    let nameErr;
    let prenumeErr;
    let usernameErr;
    let emailErr;
    let passwordErr;
    let confirmPasswordErr;
    let varstaErr;
    let sexErr;

    if (err.response.data.message) {
      emailErr = err.response.data.message;
      invalidEmailBox.textContent = emailErr;
      emailInput.classList.add("is-invalid");
      invalidEmailBox.classList.remove("valid-feedback");
      invalidEmailBox.classList.add("invalid-feedback");
    } else {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
      invalidEmailBox.classList.remove("invalid-feedback");
      invalidEmailBox.classList.add("valid-feedback");
      invalidEmailBox.textContent = "Looks good!";
    }

    if (err.response.data.err.errors.nume) {
      nameErr = err.response.data.err.errors.nume.message;
      invalidNameBox.textContent = nameErr;
      nameInput.classList.add("is-invalid");
      invalidNameBox.classList.remove("valid-feedback");
      invalidNameBox.classList.add("invalid-feedback");
    } else {
      nameInput.classList.remove("is-invalid");
      nameInput.classList.add("is-valid");
      invalidNameBox.classList.remove("invalid-feedback");
      invalidNameBox.classList.add("valid-feedback");
      invalidNameBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.prenume) {
      prenumeErr = err.response.data.err.errors.prenume.message;
      invalidPrenumeBox.textContent = prenumeErr;
      prenumeInput.classList.add("is-invalid");
      invalidPrenumeBox.classList.remove("valid-feedback");
      invalidPrenumeBox.classList.add("invalid-feedback");
    } else {
      prenumeInput.classList.remove("is-invalid");
      prenumeInput.classList.add("is-valid");
      invalidPrenumeBox.classList.remove("invalid-feedback");
      invalidPrenumeBox.classList.add("valid-feedback");
      invalidPrenumeBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.username) {
      usernameErr = err.response.data.err.errors.username.message;
      invalidUsernameBox.textContent = usernameErr;
      usernameInput.classList.add("is-invalid");
      invalidUsernameBox.classList.remove("valid-feedback");
      invalidUsernameBox.classList.add("invalid-feedback");
    } else {
      usernameInput.classList.remove("is-invalid");
      usernameInput.classList.add("is-valid");
      invalidUsernameBox.classList.remove("invalid-feedback");
      invalidUsernameBox.classList.add("valid-feedback");
      invalidUsernameBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.email) {
      emailErr = err.response.data.err.errors.email.message;
      invalidEmailBox.textContent = emailErr;
      emailInput.classList.add("is-invalid");
      invalidEmailBox.classList.remove("valid-feedback");
      invalidEmailBox.classList.add("invalid-feedback");
    } else {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
      invalidEmailBox.classList.remove("invalid-feedback");
      invalidEmailBox.classList.add("valid-feedback");
      invalidEmailBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.password) {
      passwordErr = err.response.data.err.errors.password.message;
      invalidPasswordBox.textContent = passwordErr;
      passwordInput.classList.add("is-invalid");
      invalidPasswordBox.classList.remove("valid-feedback");
      invalidPasswordBox.classList.add("invalid-feedback");
    } else {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
      invalidPasswordBox.classList.remove("invalid-feedback");
      invalidPasswordBox.classList.add("valid-feedback");
      invalidPasswordBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.confirmPassword) {
      confirmPasswordErr = err.response.data.err.errors.confirmPassword.message;
      invalidConfirmPasswordBox.textContent = confirmPasswordErr;
      confirmPasswordInput.classList.add("is-invalid");
      invalidConfirmPasswordBox.classList.remove("valid-feedback");
      invalidConfirmPasswordBox.classList.add("invalid-feedback");
    } else {
      confirmPasswordInput.classList.remove("is-invalid");
      confirmPasswordInput.classList.add("is-valid");
      invalidConfirmPasswordBox.classList.remove("invalid-feedback");
      invalidConfirmPasswordBox.classList.add("valid-feedback");
      invalidConfirmPasswordBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.varsta) {
      varstaErr = err.response.data.err.errors.varsta.message;
      invalidVarstaBox.textContent = varstaErr;
      varstaInput.classList.add("is-invalid");
      invalidVarstaBox.classList.remove("valid-feedback");
      invalidVarstaBox.classList.add("invalid-feedback");
    } else {
      varstaInput.classList.remove("is-invalid");
      varstaInput.classList.add("is-valid");
      invalidVarstaBox.classList.remove("invalid-feedback");
      invalidVarstaBox.classList.add("valid-feedback");
      invalidVarstaBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.sex) {
      sexErr = err.response.data.err.errors.sex.message;
      invalidSexBox.textContent = sexErr;
      sexInput.classList.add("is-invalid");
      invalidSexBox.classList.remove("valid-feedback");
      invalidSexBox.classList.add("invalid-feedback");
    } else {
      sexInput.classList.remove("is-invalid");
      sexInput.classList.add("is-valid");
      invalidSexBox.classList.remove("invalid-feedback");
      invalidSexBox.classList.add("valid-feedback");
      invalidSexBox.textContent = "Looks good!";
    }
  }
};
