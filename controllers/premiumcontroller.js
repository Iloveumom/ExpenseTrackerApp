
const Signup= require('../models/users');
const sequelize=require("../utils/db_connection");
const uploadToS3=require('../services/uploadToS3');
const FilesDownloaded=require('../models/filesDownloaded')

const showLeaderBoard = async (req, res) => {
 try 
 {
  const data = await Signup.findAll({
    order: [['total_expense', 'DESC']] // desc= high to low
  });
  res.status(200).json({ success: true, data });
} catch (err) {
  res.status(500).json({ error: err.message });
}
};

const downloadExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    // Get all expenses of logged-in user
    const expenses = await req.user.getExpenses();
    //console.log(expenses);
    const stringfyExpense=JSON.stringify(expenses);
    const filename=`Expense${userId}/${new Date()}.txt`;
    const fileUrl=await uploadToS3(stringfyExpense,filename);
    FilesDownloaded.create({
      fileURL:fileUrl,
      SignupId:userId
    })
   // console.log("return",fileUrl);
    res.status(200).json({fileUrl,success:true});
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      err:err
    });
  }
};
module.exports={showLeaderBoard,downloadExpenses};