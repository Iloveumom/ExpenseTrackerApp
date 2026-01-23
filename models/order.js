// models/Order.js
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db_connection"); 

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,       // INT auto-increment primary key
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,   // linked with Users table
        allowNull: false
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true               // Cashfree order ID unique
    },
    paymentSessionId: {
        type: DataTypes.STRING,    // Cashfree session token
        allowNull: false
    },
    orderAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    orderCurrency: {
        type: DataTypes.STRING,
        defaultValue: "INR"
    },
    paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: "pending"   // pending, successful, failed
    }
}, );

module.exports = Order;
