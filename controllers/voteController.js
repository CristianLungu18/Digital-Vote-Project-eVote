const Vote = require("../models/voteModel");
const PDFDocument = require("pdfkit");
const bcrypt = require("bcrypt");
const Candidate = require("../models/candidateModel");
const sendConfirmVoteEmail = require("../config/sendConfirmVoteEmail");

exports.postVote = async (req, res) => {
  try {
    const newVote = await Vote.create(req.body);
    const CNP = req.body.CNP;
    res.cookie("CNP", CNP);
    res.status(200).json({
      status: "succes",
      data: {
        newVote,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateVote = async (req, res) => {
  try {
    const CNP = req.cookies.CNP;
    const myVote = await Vote.findOne({ CNP });
    myVote.candidat = req.body.candidat;
    myVote.save();
    console.log(myVote);
    res.status(200).json({
      status: "succes",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.generatePDF = async (req, res) => {
  try {
    const CNP = req.cookies.CNP;
    const myVote = await Vote.findOne({ CNP });
    console.log(req.user);
    // Configurăm antetele pentru descărcarea PDF-ului
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="certificat-vot-${Date.now()}.pdf"`
    );

    // Creăm un nou document PDF
    const doc = new PDFDocument();
    doc.pipe(res);

    // Adăugăm conținut în PDF
    doc
      .fontSize(16)
      .text("Certificat de vot electronic", { align: "center" })
      .moveDown(1);

    doc
      .fontSize(16)
      .text(`Stimate ${myVote.nume} ${myVote.prenume},`, { align: "left" })
      .moveDown();

    doc
      .fontSize(14)
      .text(
        "Va multumim ca ati participat la procesul de vot electronic! Votul dumneavoastra a fost inregistrat cu succes. Mai jos gasiti detalii despre votul exprimat:",
        { align: "justify" }
      )
      .moveDown(1);

    // Sectiune detalii vot
    doc.fontSize(14).text("Detalii vot:", { underline: true }).moveDown(1);

    doc
      .fontSize(13)
      .text(`- ID Vot: ${myVote._id}`)
      .text(`- Nume si Prenume: ${myVote.nume} ${myVote.prenume}`)
      .text(`- CNP: ${myVote.CNP}`)
      .text(`- Serie: ${myVote.serie}`)
      .text(`- Numar: ${myVote.numar}`)
      .text(`- Oras: ${myVote.oras}`)
      .text(`- Varsta:${myVote.varsta}`)
      .text(`- Data si ora votului: ${myVote.votedAt.toLocaleString()}`)
      .moveDown(1);

    doc
      .fontSize(12)
      .text(
        "- Votul dumneavoastra a fost inregistrat in sistemul nostru si a fost procesat cu succes. Va asiguram ca procesul de votare a fost confidential si securizat, iar rezultatele vor fi utilizate doar in scopul electoral.",
        { align: "justify", lineGap: 1 }
      )
      .moveDown(1);

    doc
      .fontSize(12)
      .text(
        "- Dupa exprimarea votului, toate informatiile au fost criptate si stocate in siguranta, conform legislatiei in vigoare. Acest certificat va garanteaza ca procesul a fost finalizat fara incidente.",
        { align: "justify", lineGap: 1 }
      )
      .moveDown(1);

    doc
      .fontSize(12)
      .text(
        "- Votul dumneavoastra reprezinta un act de responsabilitate civica. Participarea activa la alegeri este esentiala pentru consolidarea democratiei si pentru reflectarea vointei cetatenilor in procesul de guvernare.",
        { align: "justify", lineGap: 1 }
      )
      .moveDown(1);

    doc
      .fontSize(12)
      .text(
        "- Daca aveti nelamuriri sau intrebari legate de votul electronic, nu ezitati sa contactati autoritatile competente sau sa consultati ghidurile disponibile online.",
        { align: "justify", lineGap: 1 }
      )
      .moveDown(1);

    doc
      .fontSize(12)
      .text(
        "Acest certificat confirma ca votul dumneavoastra a fost procesat in mod securizat si confidential.",
        { align: "justify", lineGap: 4 }
      )
      .moveDown(2);

    // Adaugam un mesaj de multumire
    doc
      .fontSize(16)
      .text("Va multumim pentru implicarea dumneavoastra civica!", {
        align: "center",
      })
      .moveDown();

    doc
      .fontSize(12)
      .text(
        `Certificat generat automat la data de ${new Date().toLocaleString()}.`,
        { align: "right" }
      );

    // Inchidem documentul
    doc.end();

    sendConfirmVoteEmail(
      req.user.email,
      myVote.nume,
      myVote.prenume,
      myVote._id,
      myVote.CNP,
      myVote.votedAt
    )
      .then(() => {
        console.log("Email confirmare vot trimis cu succes!");
      })
      .catch((err) => {
        console.log(err);
      });

    myVote.CNP = myVote.CNP.slice(7, 13);
    myVote.nume = await bcrypt.hash(myVote.nume, 12);
    myVote.prenume = await bcrypt.hash(myVote.prenume, 12);
    myVote.serie = await bcrypt.hash(myVote.serie, 12);
    myVote.numar = await bcrypt.hash(myVote.numar, 12);

    myVote.save();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.getVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.status(200).json({
      status: "succes",
      results: votes.length,
      data: {
        votes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.getChartVotes = async (req, res) => {
  try {
    let candidates = await Candidate.find().select("nume prenume -_id");

    let finalStringCandidates = candidates.map(
      (item) => `${item.nume} ${item.prenume}`
    );

    let numberOfVotes = await Promise.all(
      finalStringCandidates.map(async (candidate) => {
        const voteCount = await Vote.countDocuments({ candidat: candidate });
        return { candidat: candidate, voturi: voteCount };
      })
    );

    res.status(200).json({
      status: "success",
      data: numberOfVotes,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};
