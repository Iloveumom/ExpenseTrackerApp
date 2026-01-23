const Expenses = require('../models/expenses')
const Signup = require('../models/users');
const sequelize=require('../utils/db_connection')
const { Op } = require("sequelize");
const addExpense = async (req, res) => 
  {
    const transaction= await sequelize.transaction();
    //transaction use 
      try {
  const { amount, description, category } = req.body;
  const SignupId = req.user.id;
   //negtive amount check 
   if(amount <= 0) 
    {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }
    //Expense add
    await Expenses.create({
      amount,
      description,
      category,
      SignupId: SignupId
    },{transaction});

    // User table me totalExpense update
    await Signup.increment(
      { total_expense: amount },
      { where: { id: SignupId },transaction}
    );
    await transaction.commit();
    res.status(200).json({
      success: true,
      message: "Expense added and total updated successfully"
    });

  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message });
  }
};

const getExpenses=async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // default page 1
        console.log("page",page);
        const limit =10; // backend controlled limit
        const offset = (page - 1) * limit;

        // total items for this user
        const total = await Expenses.count({
            where: { SignupId: req.user.id }
        });

        // fetch paginated expenses
        const data = await Expenses.findAll({
            where: { SignupId: req.user.id },
            offset: offset,
            limit: limit,
            order: [["createdAt", "DESC"]] // optional: latest first
        });

        res.status(200).json({
            data,
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }


}

const deleteExpense = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const SignupId = req.user.id;

    //  Expense fetch (ownership + amount)
    const expense = await Expenses.findOne({
      where: { id, SignupId },
      transaction
    });

    if (!expense) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    // Soft delete (deletedAt auto fill)
    await Expenses.destroy({
      where: { id, SignupId },
      transaction
    });

    // total_expense decrement
    await Signup.decrement(
      { total_expense: expense.amount },
      {
        where: {
          id: SignupId,
          total_expense: { [Op.gte]: expense.amount }
        },
        transaction
      }
    );

    // Commit
    await transaction.commit();

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully"
    });

  } catch (err) {
    await transaction.rollback();
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = { addExpense,getExpenses,deleteExpense};
