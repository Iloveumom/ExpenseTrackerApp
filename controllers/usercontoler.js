const Signup=require('../models/users');
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const addSignupdetail=async(req,res)=>{
    const {name,email,password}=req.body;    
    bcrypt.hash(password,10,async (err,hash)=>{
            try
            {
               // console.log(err,hash);
                if(err)
                {
                    throw new Error("sothing wrong");
                }
                    const result=await Signup.create({
                    name,email,password:hash
                        });
                     res.status(201).json({message:"registration success"});

                    }
                    catch(err)
                    {
                    
                        if (err.name === "SequelizeUniqueConstraintError")
                            {
                                res.status(409).json({ message: "Email already exists" });
                                return;
                            }
                            res.status(500).json({error:err.message});
                        }
    })

};

const checkLogindetail = async (req, res) => {
  const { email, password } = req.body;

  const user = await Signup.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.status(200).json({ message: "Login successful",token:genrateToken(user.id,user.email,user.isPremium)});
};
const genrateToken=(id,email,isPremium)=>{
   return jwt.sign(
    { SignupId:id ,email:email,isPremium:isPremium},"secret_key"
  );
}


module.exports = { checkLogindetail ,addSignupdetail};