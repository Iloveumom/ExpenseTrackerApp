
const User=require("./users");
const Expenses=require("./expenses");
const ForgotPasswordRequest=require("./ForgotPasswordRequest");
const Order=require("./order");

//one to many Relationships
User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

module.exports = {
  User,
  Expenses,
  ForgotPasswordRequest,
  Order
};
