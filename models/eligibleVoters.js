const mongoose = require("mongoose");
const validator = require("validator");

const addressSchema = new mongoose.Schema({
  strada: { type: String, required: true },
  numar: { type: String, required: true },
  bloc: { type: String, required: false },
  scara: { type: String, required: false },
  apartament: { type: String, required: false },
  oras: { type: String, required: true },
  judet: { type: String, required: true },
  codPostal: { type: String, required: true },
});

const eligibleVotersSchema = new mongoose.Schema({
  CNP: {
    type: String,
    trim: true,
    unique: [true, "This CNP already exist!"],
    required: [true, "CNP is required!"],
    maxLength: [13, "Invalid CNP!"],
    validate: [
      {
        validator: function (value) {
          return value.length === 13;
        },
        message: "The CNP must have 13 characters!",
      },
      {
        validator: function (value) {
          const an = parseInt(value.substring(1, 3), 10);
          const luna = parseInt(value.substring(3, 5), 10);
          const zi = parseInt(value.substring(5, 7), 10);
          const primaCifra = parseInt(value[0], 10);

          const secol = primaCifra <= 2 ? 1900 : primaCifra <= 4 ? 1800 : 2000;
          const dataNasterii = new Date(secol + an, luna - 1, zi);

          const azi = new Date();
          let varsta = azi.getFullYear() - dataNasterii.getFullYear();
          const lunaCurenta = azi.getMonth();
          const ziuaCurenta = azi.getDate();

          if (
            lunaCurenta < dataNasterii.getMonth() ||
            (lunaCurenta === dataNasterii.getMonth() &&
              ziuaCurenta < dataNasterii.getDate())
          ) {
            varsta--;
          }

          return varsta >= 18;
        },
        message: "Trebuie să aveți cel puțin 18 ani.",
      },
      {
        validator: function (value) {
          return validator.isNumeric(value);
        },
        message: "CNP-ul trebuie să conțină doar cifre!",
      },
    ],
  },
  serie: {
    type: String,
    trim: true,
    required: [true, "Serie is required!"],
    validate: [
      {
        validator: function (value) {
          return validator.isAlpha(value);
        },
        message: "Invalid serie!",
      },
      {
        validator: function (value) {
          return value.length === 2;
        },
        message: "The CNP must have 2 characters!",
      },
    ],
  },
  numar: {
    type: String,
    trim: true,
    required: [true, "Numar is required!"],
    validate: [
      {
        validator: function (value) {
          return validator.isNumeric(value);
        },
        message: "Invalid serie!",
      },
      {
        validator: function (value) {
          return value.length === 6;
        },
        message: "The numar must have 6 characters!",
      },
    ],
  },
  nume: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
    maxLength: [50, "The name must have maximum 50 characters!"],
  },
  prenume: {
    type: String,
    required: [true, "Prenume is required!"],
    trim: true,
    maxLength: [50, "The prenume must have maximum 50 characters!"],
  },
  address: {
    type: addressSchema,
    required: [true, "Address is required!"],
  },
});

const eligibleVoters = mongoose.model("eligible_voters", eligibleVotersSchema);
module.exports = eligibleVoters;
