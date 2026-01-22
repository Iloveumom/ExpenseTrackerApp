const express=require("express");
const router=express.Router();
const {showLeaderBoard}=require('../controllers/premiumcontroller');
router.get("/showLeaderboard",showLeaderBoard);
module.exports=router;