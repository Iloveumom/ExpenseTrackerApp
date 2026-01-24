const Expense = require('../models/expenses');
const Signup= require('../models/users');
const sequelize=require("../utils/db_connection");
const showLeaderBoard = async (req, res) => {
 try 
 {
  const data = await Signup.findAll({
    order: [['total_expense', 'DESC']] // DESC = high to low
  });
  res.status(200).json({ success: true, data });
} catch (err) {
  res.status(500).json({ error: err.message });
}
};
module.exports={showLeaderBoard};