const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/about", authController.isLoggedIn, viewController.getAbout);

router.get("/login", authController.isLoggedIn, viewController.getLogin);

router.get("/signup", authController.isLoggedIn, viewController.getSignup);

router.get(
  "/instructions",
  authController.isLoggedIn,
  viewController.getInstruction
);

router.get(
  "/admin",
  authController.Protected,
  authController.restrictTo("admin"),
  viewController.getAdmin
);

router.get(
  "/add-candidate",
  authController.Protected,
  authController.restrictTo("admin"),
  viewController.getAddCandidate
);

router.get(
  "/candidates/:id",
  authController.Protected,
  authController.restrictTo("admin"),
  viewController.getCandidateById
);

router.get(
  "/delete-candidate/:id",
  authController.Protected,
  authController.restrictTo("admin"),
  viewController.deleteCandidate
);

router.get("/home", authController.Protected, viewController.getHome);

router.get(
  "/identity-verification",
  authController.Protected,
  viewController.getVerify
);

router.get(
  "/select-candidate",
  authController.Protected,
  viewController.getSelectCandidate
);

router.get(
  "/review-vote",
  authController.Protected,
  viewController.getReviewVote
);

router.get(
  "/generate-certificate",
  authController.Protected,
  viewController.getGenerateCertificate
);

router.get(
  "/results",
  authController.Protected,
  (req, res, next) => {
    if (req.cookies.results === "false") {
      res.redirect("/home");
    } else {
      next();
    }
  },
  viewController.getResults
);

module.exports = router;
