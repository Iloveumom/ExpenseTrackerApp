const User = require("../models/users");
const { sendForgotPasswordMail } = require("../services/brevoMail");
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // Check user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Send email only (NO reset link)
    await sendForgotPasswordMail(email);

    return res.status(200).json({
      success: true,
      message: "Forgot password email sent successfully"
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
};
module.exports={forgotPassword};