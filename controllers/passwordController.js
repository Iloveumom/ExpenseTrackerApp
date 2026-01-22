const { v4: uuidv4 } = require("uuid");
const User = require("../models/users");
const ForgotPasswordRequest = require("../models/ForgotPasswordRequest");
const { sendForgotPasswordMail } = require("../services/brevoMail");
const bcrypt=require("bcrypt");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // CREATE FORGOT PASSWORD REQUEST
    const request = await ForgotPasswordRequest.create({
      id: uuidv4(),
      SignupId: user.id,
      isActive: true
    });

    const resetUrl = `http://localhost:4000/password/resetpassword/${request.id}`;

    // SEND MAIL WITH RESET LINK
    await sendForgotPasswordMail(email, resetUrl);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent"
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};
// Verify Link
const verifyResetLink = async (req, res) => {
  
  const { uuid } = req.params;
  console.log("First",req.params);
  const request = await ForgotPasswordRequest.findOne({
    where: { id: uuid, isActive: true }
  });

  if (!request) {
    return res.status(400).json({ message: "Invalid link" });
  }
 res.redirect(`/reset-password.html?uuid=${uuid}`);
}

const resetPassword = async (req, res) => {
  const { uuid } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    //console.log("fsdf",uuid);
    const request = await ForgotPasswordRequest.findOne({
      where: { id: uuid, isActive: true }
    });
   // console.log("link",request);
    if (!request) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    const user = await User.findByPk(request.SignupId);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    request.isActive = false;
    await request.save();

    res.status(200).json({ message: "Password reset successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error",error:err});
  }
}

module.exports = { forgotPassword,resetPassword,verifyResetLink};
