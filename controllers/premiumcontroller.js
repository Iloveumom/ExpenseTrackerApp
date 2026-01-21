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

  // try {
  //   const data = await Signup.findAll({
  //     attributes: [
  //       'id',
  //       'name',
  //       [
  //         sequelize.fn(
  //           'COALESCE',
  //           sequelize.fn('SUM', sequelize.col('Expenses.amount')),
  //           0
  //         ),
  //         'total_amount'
  //       ]
  //     ],
  //     include: [
  //       {
  //         model: Expense,
  //         attributes: [], // important: expense fields nahi chahiye
  //       }
  //     ],
  //     group: ['Signup.id'],
  //     order: [[sequelize.literal('total_amount'), 'DESC']]
  //   });

  //   res.status(200).json({ success: true, data });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
};
module.exports={showLeaderBoard};