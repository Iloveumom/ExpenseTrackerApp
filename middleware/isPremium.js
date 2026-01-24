const isPremiumUser = (req, res, next) => {
   
  if (!req.user.isPremium) {
    return res.status(403).json({ message: "Premium users only" });
  }
  next();
};
module.exports={isPremiumUser};