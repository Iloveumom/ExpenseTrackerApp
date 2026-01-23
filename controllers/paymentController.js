const { Order } = require('../models');
const cashfreeService = require('../services/cashfreeService');
const User=require("../models/users");
const createPayment = async (req, res) => {
    // Hardcoded order data
    const orderData = {
        orderId: "ORDER" + Date.now(),
        orderAmount: "2000", 
        orderCurrency:"INR",
        customerID:"1",
        customerPhone: "9090909090"
    };
    try {
        // Call Cashfree service to generate session ID
        const sessionId = await cashfreeService.generateSession(orderData);

        //save Payment detail to db
         const order = await Order.create({
            userId:req.user.id,
            orderId:orderData.orderId,
            paymentSessionId:sessionId,
            orderAmount:orderData.orderAmount,
            orderCurrency:orderData.orderCurrency,
            paymentStatus:"pending"
        });

        res.json({ sessionId }); // send session ID to frontend
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create Cashfree session' });
    }
};
const paymentStatus=async (req, res) =>
{
  try {
    const { orderId } = req.params;
    // Verify from Cashfree
    const cfOrder = await cashfreeService.paymentVerification(orderId);
    // DB Order
    const order = await Order.findOne({ where: { orderId } });
    if (!order) return res.send("Order not found");
    //SUCCESS
    if (cfOrder.order_status === "PAID") {
      order.paymentStatus = "successful";
      await order.save();
      const user = await User.findByPk(order.userId);
      user.isPremium = true;
      await user.save();
      //return res.json({message:"Transaction Successful"});
      return res.redirect("http://localhost:4000/index.html");
    }

    //FAILED
    if (
      cfOrder.order_status === "FAILED" ||
      cfOrder.order_status === "CANCELLED"
    ) 
    {
      order.paymentStatus = "failed";
      await order.save();
       } else {
    return res.redirect("http://localhost:3000/payment-failed");
    }

    // ⏳ PENDING
    res.send("<h1>Payment Pending ⏳</h1>");

  } catch (err) {
    console.error(err);
    res.send("<h2>Error checking payment status</h2>");
  }
};
module.exports={
  createPayment,paymentStatus
}