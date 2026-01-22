const express=require("express");
const router=express.Router();
const {addExpense,getExpenses,deleteExpense}=require('../controllers/expensecontroller');
const {authenticate}=require('../middleware/auth')

router.post("/",authenticate,addExpense);
router.get("/getExpenses",authenticate,getExpenses);
router.delete("/:id",authenticate,deleteExpense);
module.exports=router;