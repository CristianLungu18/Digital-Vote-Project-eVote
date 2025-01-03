require("dotenv").config();
const express = require("express");

const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const crypto = require("crypto");

// const JWTPassword = crypto.randomBytes(16);
// const JWTHash = crypto.createHash("sha256").update(JWTPassword).digest("hex");

const eligbleVoter = require("./dev-data/eligbleVoters");

const viewRouter = require("./routes/viewRoute");
const userRouter = require("./routes/userRoute");
const eligibleVotersRouter = require("./routes/eligibleVoters");
const candidateRouter = require("./routes/candidateRoute");
const voteRouter = require("./routes/voteRoute");

const db = require("./config/database");

//MODELS
const userModel = require("./models/userModel");
const candidateModel = require("./models/candidateModel");
const eligibleVotersModel = require("./models/eligibleVoters");
const voteModel = require("./models/voteModel");

//SECURITY
const hpp = require("hpp");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

//MIDDLEWARE

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again later",
});

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "connect-src": ["'self'", "https://ka-f.fontawesome.com"],
      "script-src": [
        "'self'",
        "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
        "https://cdn.jsdelivr.net/npm/chart.js",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
        "https://kit.fontawesome.com",
      ],
    },
  })
);
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "25kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(morgan("dev"));

//VIEW ENGINE
app.set("view engine", "ejs");

//ROUTES
// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

app.use("/", viewRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", candidateRouter);
app.use("/api/v1/", eligibleVotersRouter);
app.use("/api/v1/", voteRouter);
app.use("*", (req, res) => {
  res.status(404).render("404.ejs");
});

//INSERT IN DATABASE ELIGBLE VOTERS

// eligibleVotersModel
//   .insertMany(eligbleVoter)
//   .then(() => {
//     console.log("Votantii au fost adaugati cu succes!");
//   })
//   .catch((err) => console.log(err));

//LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT: ${process.env.PORT}`);
});
