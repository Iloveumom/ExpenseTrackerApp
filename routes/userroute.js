const express=require("express");
const router=express.Router();
const {checkLogindetail,addSignupdetail}=require('../controllers/usercontoler');
router.post("/login",checkLogindetail);
router.post("/signup",addSignupdetail);
module.exports=router;