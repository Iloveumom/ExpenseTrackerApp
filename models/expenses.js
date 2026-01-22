const {DataTypes}=require('sequelize');
const sequelize=require("../utils/db_connection");
const expenses=sequelize.define('Expenses',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
 
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},
{
      paranoid: true,    // soft delete ON
      timestamps: true
} 
);
module.exports=expenses;