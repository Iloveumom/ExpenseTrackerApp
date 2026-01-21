const express=require("express");
const app=express();
const port=4000;
const db=require("./utils/db_connection");
const cors = require("cors");
//
const userroute=require("./routes/userroute");
const expenseroute=require("./routes/expenseroute");
const premiumroute=require("./routes/premiumroute");
const airoute=require("./routes/airoute");
const passwordRoutes = require("./routes/passwordRoutes");




app.use(express.json());            
app.use(cors()); // allow all origins


const User=require("./models/users");
const Expenses=require("./models/expenses");


//one to many
User.hasMany(Expenses);
Expenses.belongsTo(User);


app.get("/",(req,res)=>{
    res.send("testing req and res");
});

app.use("/users",userroute);
app.use("/expenses",expenseroute);
app.use("/premium",premiumroute);
app.use("/Ai",airoute);
app.use("/password", passwordRoutes);


db.sync()
.then((res)=>{
        app.listen(port,()=>{
           console.log("server running");
})
}).catch((err)=>{
        console.log(err);
});