require("dotenv").config(); 
const express=require("express");
const app=express();
const db=require("./utils/db_connection");
const cors = require("cors");
const userroute=require("./routes/userroute");
const expenseroute=require("./routes/expenseroute");
const premiumroute=require("./routes/premiumroute");
const airoute=require("./routes/airoute");
const passwordRoutes = require("./routes/passwordRoutes");
const paymentRoutes=require('./routes/paymentRoutes');
const path = require("path");
const {authenticate}=require("./middleware/auth");
const fs=require("fs");
const morgan=require("morgan");
//all modal import
require("./models");

app.use(express.json());            
app.use(cors()); // allow all origins



app.use(express.static(path.join(__dirname, "./frontend")));

//Routes
app.use("/users",userroute);
app.use("/expenses",expenseroute);
app.use("/premium",premiumroute);
app.use("/Ai",airoute);

app.use("/password", passwordRoutes);
app.use("/payment", paymentRoutes);


// GET /api/me check preimum user
app.get("/api/me", authenticate, async (req, res) => {
  res.json({
    isPremium: req.user.isPremium
  });
});

//create log file 
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" } // append mode
);
//Logging error
app.use(morgan("combined", { stream: accessLogStream }));

db.sync()
.then((res)=>{
        app.listen(process.env.PORT || 3000,()=>{
           console.log(`server running port ${process.env.PORT || 3000}`);
})
}).catch((err)=>{
        console.log(err);
});