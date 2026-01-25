
const User=require("./users");
const Expenses=require("./expenses");
const ForgotPasswordRequest=require("./ForgotPasswordRequest");
const Order=require("./order");
const FilesDownloaded=require("./filesDownloaded");

//one to many Relationships
User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);
User.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(User);

module.exports = {
  User,
  Expenses,
  ForgotPasswordRequest,
  Order,
  FilesDownloaded
};
