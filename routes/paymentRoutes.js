const express = require('express');
const router = express.Router();
const {createPayment,paymentStatus} = require('../controllers/paymentController');
const {authenticate}=require("../middleware/auth");

// POST: Create Cashfree session ID
router.post('/pay',authenticate, createPayment);
router.get("/payment-status/:orderId", paymentStatus);

module.exports = router;
