const isPremiumUser = (req, res, next) => {
    console.log("ispu",req.user);

  if (!req.user.isPremium) {
    return res.status(403).json({ message: "Premium users only" });
  }
  next();
};
module.exports={isPremiumUser};