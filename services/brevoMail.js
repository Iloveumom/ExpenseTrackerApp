const SibApiV3Sdk = require("sib-api-v3-sdk");
const dotenv = require("dotenv").config();
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];

apiKey.apiKey = process.env.SENDIN_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendForgotPasswordMail = async (toEmail) => {
   try
   {
    const res=await apiInstance.sendTransacEmail({
    sender: {
      email: "jtndrbhatia93@gmail.com",
      name: "Your App"
    },
    to: [{ email: toEmail }],
    subject: "Forgot Password Request",
    htmlContent: `
      <h3>Forgot Password</h3>
      <p>If this email is registered, you will hear from us shortly.</p>
    `
  });
  console.log("successs eiami",res);
}
catch(err){
    console.log(err);
}
};
module.exports={sendForgotPasswordMail};
