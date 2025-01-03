const editBtn = document.querySelector(".add-btn");

const inputNume = document.querySelector(".input-nume");
const inputPrenume = document.querySelector(".input-prenume");
const inputDescriere = document.querySelector(".input-descriere");
const inputVarsta = document.querySelector(".input-varsta");
const inputPartid = document.querySelector(".input-partid");

const invalidNameBox = document.querySelector(".invalid-nume-box");
const invalidPrenumeBox = document.querySelector(".invalid-prenume-box");
const invalidDescriereBox = document.querySelector(".invalid-descriere-box");
const invalidVarstaBox = document.querySelector(".invalid-varsta-box");
const invalidPartidBox = document.querySelector(".invalid-partid-box");

const editCandidate = async (id, nume, prenume, descriere, varsta, partid) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://localhost:3000/api/v1/candidates/${id}`,
      data: {
        nume,
        prenume,
        descriere,
        varsta,
        partid,
      },
    });
    window.location.assign("/admin");
    console.log(res);
  } catch (err) {
    console.log(err);
    let errNume;
    let errPrenume;
    let errDescriere;
    let errVarsta;
    let errPartid;
    if (err.response.data.err.errors.nume) {
      errNume = err.response.data.err.errors.nume.message;
      inputNume.classList.remove("is-valid");
      invalidNameBox.classList.remove("valid-feedback");
      inputNume.classList.add("is-invalid");
      invalidNameBox.classList.add("invalid-feedback");
      invalidNameBox.textContent = errNume;
    } else {
      inputNume.classList.remove("is-invalid");
      inputNume.classList.add("is-valid");
      invalidNameBox.classList.remove("invalid-feedback");
      invalidNameBox.classList.add("valid-feedback");
      invalidNameBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.prenume) {
      errPrenume = err.response.data.err.errors.prenume.message;
      inputPrenume.classList.remove("is-valid");
      invalidPrenumeBox.classList.remove("valid-feedback");
      inputPrenume.classList.add("is-invalid");
      invalidPrenumeBox.classList.add("invalid-feedback");
      invalidPrenumeBox.textContent = errPrenume;
    } else {
      inputPrenume.classList.remove("is-invalid");
      inputPrenume.classList.add("is-valid");
      invalidPrenumeBox.classList.remove("invalid-feedback");
      invalidPrenumeBox.classList.add("valid-feedback");
      invalidPrenumeBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.descriere) {
      errDescriere = err.response.data.err.errors.descriere.message;
      inputDescriere.classList.remove("is-valid");
      invalidDescriereBox.classList.remove("valid-feedback");
      inputDescriere.classList.add("is-invalid");
      invalidDescriereBox.classList.add("invalid-feedback");
      invalidDescriereBox.textContent = errDescriere;
    } else {
      inputDescriere.classList.remove("is-invalid");
      inputDescriere.classList.add("is-valid");
      invalidDescriereBox.classList.remove("invalid-feedback");
      invalidDescriereBox.classList.add("valid-feedback");
      invalidDescriereBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.varsta) {
      errVarsta = err.response.data.err.errors.varsta.message;
      inputVarsta.classList.remove("is-valid");
      invalidVarstaBox.classList.remove("valid-feedback");
      inputVarsta.classList.add("is-invalid");
      invalidVarstaBox.classList.add("invalid-feedback");
      invalidVarstaBox.textContent = errVarsta;
    } else {
      inputVarsta.classList.remove("is-invalid");
      inputVarsta.classList.add("is-valid");
      invalidVarstaBox.classList.remove("invalid-feedback");
      invalidVarstaBox.classList.add("valid-feedback");
      invalidVarstaBox.textContent = "Looks good!";
    }
    if (err.response.data.err.errors.partid) {
      errPartid = err.response.data.err.errors.partid.message;
      inputPartid.classList.remove("is-valid");
      invalidPartidBox.classList.remove("valid-feedback");
      inputPartid.classList.add("is-invalid");
      invalidPartidBox.classList.add("invalid-feedback");
      invalidPartidBox.textContent = errPartid;
    } else {
      inputPartid.classList.remove("is-invalid");
      inputPartid.classList.add("is-valid");
      invalidPartidBox.classList.remove("invalid-feedback");
      invalidPartidBox.classList.add("valid-feedback");
      invalidPartidBox.textContent = "Looks good!";
    }
  }
};

editBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const id = window.location.pathname.split("/")[2];
  const nume = inputNume.value;
  const prenume = inputPrenume.value;
  const descriere = inputDescriere.value;
  const varsta = inputVarsta.value;
  const partid = inputPartid.value;

  editCandidate(id, nume, prenume, descriere, varsta, partid);
});
