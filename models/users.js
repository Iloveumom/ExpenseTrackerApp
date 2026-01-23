const {DataTypes}=require('sequelize');
const sequelize=require("../utils/db_connection");
const signup=sequelize.define('Signup',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
     total_expense:{
         type:DataTypes.INTEGER,
         defaultValue:0
    },isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
});
module.exports=signup;