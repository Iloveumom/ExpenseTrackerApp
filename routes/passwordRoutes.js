const express = require("express");
const router = express.Router();
const {forgotPassword,verifyResetLink,resetPassword} = require("../controllers/passwordController");
const { route } = require("./userroute");

router.post("/forgotpassword",forgotPassword);
router.get("/resetpassword/:uuid", verifyResetLink);
router.post("/resetpassword/:uuid",resetPassword);

module.exports = router;
