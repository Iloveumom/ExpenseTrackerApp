const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db_connection");
const User = require("./users");

const ForgotPasswordRequest = sequelize.define("ForgotPasswordRequest", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});



module.exports = ForgotPasswordRequest;
