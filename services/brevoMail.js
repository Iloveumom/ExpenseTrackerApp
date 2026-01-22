const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];

apiKey.apiKey = process.env.SENDIN_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendForgotPasswordMail = async (toEmail, resetUrl) => {
  try {
    console.log("RESET URL:", resetUrl); // 🔥 fallback if mail fails

    const response = await apiInstance.sendTransacEmail({
      sender: {
        email: "jtndrbhatia93@gmail.com",
        name: "Expense Tracker App"
      },
      to: [{ email: toEmail }],
      subject: "Reset your password",
      htmlContent: `
        <h3>Password Reset Request</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link is valid for one-time use only.</p>
      `
    });

    return response;

  } catch (err) {
    console.log("Brevo Mail Error:", err.message);
  }
};

module.exports = { sendForgotPasswordMail };
