const generateBtn = document.querySelector(".generate-btn");
const generateBox = document.querySelector(".generate-btn-box");
const generateText = document.querySelector(".generate-text");
const fourthPhoto = document.querySelector(".fourth-photo");

const generatePDF = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/generate-pdf",
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));

    const a = document.createElement("a");
    a.href = url;
    a.download = "certificat-vot.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Eroare la generarea PDF-ului:", err);
  }
};

generateBtn.addEventListener("click", () => {
  generateBox.innerHTML = `
   <div class="spinner-border" role="status" style="margin-top: 50px;margin-bottom: 43px;">
    <span class="sr-only">Loading...</span>
  </div>`;
  setTimeout(() => {
    generateText.textContent = `Vă mulțumim pentru vot! Certificatul a fost generat cu succes.`;
    generateBox.innerHTML = `
     <div class="home-btn-box">
        <a class="btn-home" href="/home">Home</a>
    </div>`;
    fourthPhoto.src = "/img/FourthStep-checked.png";
    fourthPhoto.style.width = "100px";
    generatePDF();
  }, 5000);
});
