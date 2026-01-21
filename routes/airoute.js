const express=require("express");
const router=express.Router();
const {getCategoryByAi}=require('../controllers/aicontroller');

router.post("/getCategoryByAi",getCategoryByAi);
module.exports=router;

