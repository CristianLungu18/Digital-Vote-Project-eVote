const cnpInput = document.querySelector(".cnp-input");

const verifyBtn = document.querySelector(".check-btn");

const numeInput = document.querySelector(".nume-input-result");
const prenumeInput = document.querySelector(".prenume-input-result");
const serieInput = document.querySelector(".serie-input-result");
const numarInput = document.querySelector(".numar-buletin-input-result");
const stradaInput = document.querySelector(".strada-input-result");
const numarStradaInput = document.querySelector(".numar-bloc-input-result");
const blocInput = document.querySelector(".bloc-input-result");
const scaraInput = document.querySelector(".scara-input-result");
const apartamentInput = document.querySelector(".apartamnet-input-result");
const orasInput = document.querySelector(".oras-input-result");
const judetInput = document.querySelector(".judet-input-result");
const codPostalInput = document.querySelector(".cod-postal-input-result");

const checkInput = document.querySelector(".form-check-input");
const confirmBtn = document.querySelector(".confirm-btn");
const checkBox = document.querySelector(".check-box");
const resultBox = document.querySelector(".grid-box-result");
const confirmBtnBox = document.querySelector(".confirm-btn-box");

const step2Btn = document.querySelector(".step2-btn-box");
const checkBtnBox = document.querySelector(".check-btn-box");

const invalidCNPBox = document.querySelector(".invalid-cnp-box");
const helpText = document.querySelector(".help-text");

function extractInfoFromCNP(cnp) {
  if (cnp.length !== 13 || !/^\d+$/.test(cnp)) {
    throw new Error("CNP-ul trebuie să fie un număr format din 13 cifre.");
  }

  // Determinarea sexului
  const sexDigit = parseInt(cnp[0], 10);
  let sex;
  if ([1, 3, 5, 7].includes(sexDigit)) {
    sex = "Masculin";
  } else if ([2, 4, 6, 8].includes(sexDigit)) {
    sex = "Feminin";
  } else {
    throw new Error("CNP-ul nu este valid (cifra sexului invalidă).");
  }

  // Determinarea anului nașterii
  const yearDigits = parseInt(cnp.slice(1, 3), 10);
  let yearOfBirth;
  if ([1, 2].includes(sexDigit)) {
    yearOfBirth = 1900 + yearDigits;
  } else if ([3, 4].includes(sexDigit)) {
    yearOfBirth = 1800 + yearDigits;
  } else if ([5, 6].includes(sexDigit)) {
    yearOfBirth = 2000 + yearDigits;
  } else if ([7, 8].includes(sexDigit)) {
    yearOfBirth = 2000 + yearDigits; // Pentru persoane străine rezidente
  }

  // Determinarea lunii și zilei nașterii
  const monthOfBirth = parseInt(cnp.slice(3, 5), 10);
  const dayOfBirth = parseInt(cnp.slice(5, 7), 10);

  // Validarea datei de naștere
  const birthDate = new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth);
  if (
    birthDate.getFullYear() !== yearOfBirth ||
    birthDate.getMonth() + 1 !== monthOfBirth ||
    birthDate.getDate() !== dayOfBirth
  ) {
    throw new Error("Data nașterii extrasă din CNP nu este validă.");
  }

  // Calcularea vârstei
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return {
    sex: sex,
    age: age,
  };
}

const verify = async (CNP) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/eligibleVoters",
      data: {
        CNP,
      },
    });

    cnpInput.style.paddingLeft = "37px";

    cnpInput.classList.remove("is-invalid");
    cnpInput.classList.add("is-valid");
    invalidCNPBox.classList.remove("invalid-feedback");
    invalidCNPBox.classList.add("valid-feedback");
    invalidCNPBox.textContent = "CNP valid!";
    helpText.textContent = "";

    resultBox.classList.remove("visibility");
    checkBox.classList.remove("visibility");
    confirmBtnBox.classList.remove("visibility");
    numarInput
    numeInput.value = res.data.data.myVoter.nume;
    prenumeInput.value = res.data.data.myVoter.prenume;
    serieInput.value = res.data.data.myVoter.serie;
    numarInput.value = res.data.data.myVoter.numar;
    stradaInput.value = res.data.data.myVoter.address.strada;
    numarStradaInput.value = res.data.data.myVoter.address.numar;
    blocInput.value = res.data.data.myVoter.address.bloc;
    scaraInput.value = res.data.data.myVoter.address.scara;
    apartamentInput.value = res.data.data.myVoter.address.apartament;
    orasInput.value = res.data.data.myVoter.address.oras;
    judetInput.value = res.data.data.myVoter.address.judet;
    codPostalInput.value = res.data.data.myVoter.address.codPostal;
    
    cnpInput.classList.add("disabled");
    verifyBtn.classList.add("disabled-btn");
    verifyBtn.classList.add("disabled");
    confirmBtn.classList.add("disabled-btn");
  } catch (err) {
    cnpInput.style.paddingLeft = "37px";
    cnpInput.classList.add("is-invalid");
    invalidCNPBox.classList.add("invalid-feedback");
    invalidCNPBox.textContent = err.response.data.message;
    helpText.textContent = "";
    checkBtnBox.innerHTML = `<button type="submit" class="check-btn">Verifica CNP</button>`;
    const newCheck = document.querySelector(".check-btn");
    newCheck.addEventListener("click", (e) => {
      e.preventDefault();
      const CNP = cnpInput.value;
      checkBtnBox.innerHTML = `
      <div class="spinner-border" role="status" style="margin-top:25px;">
        <span class="sr-only">Loading...</span>
      </div>`;
      setTimeout(() => {
        checkBtnBox.innerHTML = ``;
        verify(CNP);
      }, 5000);
    });
  }
};

const postVote = async (
  CNP,
  nume,
  prenume,
  serie,
  numar,
  oras,
  varsta,
  sex
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/postVote",
      data: {
        CNP,
        nume,
        prenume,
        serie,
        numar,
        oras,
        varsta,
        sex,
      },
    });
    confirmBtn.classList.add("disabled-btn");
  } catch (err) {
    console.log(err);
  }
};

checkInput.addEventListener("click", () => {
  if (checkInput.checked) {
    confirmBtn.classList.remove("disabled-btn");
  } else {
    confirmBtn.classList.add("disabled-btn");
  }
});

verifyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const CNP = cnpInput.value;
  checkBtnBox.innerHTML = `
  <div class="spinner-border" role="status" style="margin-top:25px;">
    <span class="sr-only">Loading...</span>
  </div>`;
  setTimeout(() => {
    checkBtnBox.innerHTML = ``;
    verify(CNP);
  }, 1);
});

if (confirmBtn) {
  confirmBtn.addEventListener("click", (e) => {
    const CNP = cnpInput.value;
    const infoCNP = extractInfoFromCNP(CNP);
    const nume = numeInput.value;
    const prenume = prenumeInput.value;
    const serie = serieInput.value;
    const numar = numarInput.value;
    const oras = orasInput.value;
    confirmBtnBox.innerHTML = `
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>`;
    setTimeout(() => {
      confirmBtnBox.innerHTML = ` 
        <a href="/select-candidate" class="confirm-btn"> Pasul 2 <i class="fa-solid fa-arrow-right"></i></a>
      `;
    }, 5000);

    postVote(CNP, nume, prenume, serie, numar, oras, infoCNP.age, infoCNP.sex);
  });
}

const inputState = () => {
  if (cnpInput.value) {
    verifyBtn.classList.remove("disabled-btn");
  } else {
    verifyBtn.classList.add("disabled-btn");
  }
};

inputState();

cnpInput.addEventListener("input", inputState);
