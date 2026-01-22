const express=require("express");
const app=express();
const port=4000;
const db=require("./utils/db_connection");
const cors = require("cors");
const userroute=require("./routes/userroute");
const expenseroute=require("./routes/expenseroute");
const premiumroute=require("./routes/premiumroute");
const airoute=require("./routes/airoute");
const passwordRoutes = require("./routes/passwordRoutes");

const path = require("path");

//all modal import
require("./models");

app.use(express.json());            
app.use(cors()); // allow all origins



app.use("/users",userroute);
app.use("/expenses",expenseroute);
app.use("/premium",premiumroute);
app.use("/Ai",airoute);
app.use("/password", passwordRoutes);
app.use(express.static(path.join(__dirname, "./frontend")));

db.sync()
.then((res)=>{
        app.listen(port,()=>{
           console.log("server running");
})
}).catch((err)=>{
        console.log(err);
});