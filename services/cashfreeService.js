const { Cashfree } = require('cashfree-pg');
require('dotenv').config();  // Load env variables

// Hardcoded credentials
const APP_ID = process.env.CASHFREE_API_KEY;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const cashfree = new Cashfree(Cashfree.SANDBOX, APP_ID, SECRET_KEY);

console.log("cash fre",APP_ID);
const generateSession = async ({ orderId, orderAmount, orderCurrency,  customerID ,customerPhone}) => {
  try {
    // Initialize Cashfree with constructor
    const expiryDate=new Date(Date.now()+60*60*1000); //1 hour from now
    const formatedExprDate=expiryDate.toISOString();
    // Build order payload
    const request = {
      order_amount: parseFloat(orderAmount),
      order_currency: orderCurrency,
      order_id: orderId,
      customer_details: {
        customer_id: customerID,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `http://localhost:4000/payment/payment-status/${orderId}`, // after payment
         payment_methods: "cc,dc,upi"
      },
      order_expiry_date:formatedExprDate
    };
    //console.log("testing cash free service");
    // Create order
    const response = await cashfree.PGCreateOrder(request);
    //console.log(response.data.payment_session_id);
    // Return payment_session_id for front‑end checkout
    return response.data.payment_session_id;
  } catch (err) {
    console.error(err.response || err.message);
    throw new Error("Failed to generate Cashfree session ID");
  }
};
const paymentVerification = async (orderId) => {
  try {
    const response = await cashfree.PGFetchOrder(orderId);

    /*
      response.data.order_status
      PAID
      ACTIVE
      FAILED
      CANCELLED
    */

    return response.data;

  } catch (err) {
    console.error(err.response || err.message);
    throw new Error("Failed to verify payment");
  }
};
module.exports={generateSession,paymentVerification};