const express=require("express");
const router=express.Router();
const {showLeaderBoard}=require('../controllers/premiumcontroller');
const {authenticate}=require('../middleware/auth');
const { isPremiumUser } = require("../middleware/isPremium");
router.get("/showLeaderboard",authenticate,isPremiumUser,showLeaderBoard);
module.exports=router;