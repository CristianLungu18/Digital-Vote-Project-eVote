const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  nume: {
    type: String,
    trim: true,
    required: [true, "Name is required!"],
    maxLength: [50, "The name must have maximum 50 characters!"],
  },
  prenume: {
    type: String,
    trim: true,
    required: [true, "Prenume is required!"],
    maxLength: [50, "The prenume must have maximum 50 characters! "],
  },
  descriere: {
    type: String,
    trim: true,
    required: [true, "The description is required!"],
    maxLength: [500, "The description must have maximum 500 characters!"],
  },
  varsta: {
    type: Number,
    required: [true, "Varsta is required!"],
    max: [150, "Please insert a valid value!"],
    min: [18, "You must have over 18 years old!"],
  },
  partid: {
    type: String,
    required: [true, "Partid is required!"],
    trim: true,
    enum: {
      values: ["PSD", "PNL", "USR", "AUR"],
      message:
        "Valoarea {VALUE} nu este un partid valid! Valori acceptate: PSD, PNL, USR.",
    },
  },
});

const Candidate = new mongoose.model("candidate", candidateSchema);

module.exports = Candidate;
