const {Sequelize}=require('sequelize');
const sequelize=new Sequelize('expensetrackerdb',"root","root@123",{
    host:"localhost",
    dialect:"mysql" 
});

(async()=>{
    try
{
    await sequelize.authenticate();
    console.log("connection establised successsfully!!");
}
catch(err)
{
    console.log(err.message);
}
})();
module.exports=sequelize;