
// RESTFULL -APIs for Authentication
const express = require("express");
const authController = require("../controllers/auth.controller");
const { signupValidation } = require("../middlewares");
const router = express.Router();



/** SIGNUP - POST */
router.post("/auth/signup", [ signupValidation.validateRequest ] , authController.signup);

 /** SIGNIN - POST */
router.post("/auth/signin", authController.signin);

module.exports = router
   