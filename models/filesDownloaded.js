const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db_connection");
const FilesDownloaded = sequelize.define("FilesDownloaded", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fileURL: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

module.exports=FilesDownloaded; 
