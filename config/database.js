const mongoose = require("mongoose");

const databaseString = process.env.DATABASE_STRING;

const connectString = databaseString.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(connectString)
  .then(() => {
    console.log("The database was connected!");
  })
  .catch((err) => {
    console.log(err);
  });
