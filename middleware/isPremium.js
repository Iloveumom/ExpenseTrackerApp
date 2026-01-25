const isPremiumUser = (req, res, next) => {
   
  if (!req.user.isPremium) {
    return res.status(403).json({success:false, message: "Unauthorized: Premium membership required" });
  }
  next();
};
module.exports={isPremiumUser};