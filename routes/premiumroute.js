const express=require("express");
const router=express.Router();
const {showLeaderBoard,downloadExpenses}=require('../controllers/premiumcontroller');
const {authenticate}=require('../middleware/auth');
const { isPremiumUser } = require("../middleware/isPremium");
const { sendForgotPasswordMail } = require("../services/brevoMail");
router.get("/showLeaderboard",authenticate,isPremiumUser,showLeaderBoard);
router.get("/download",authenticate,isPremiumUser,downloadExpenses);

module.exports=router;