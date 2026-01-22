const {getAIContent}=require("../services/ai");
const getCategoryByAi = async (req, res) => {
 try 
 {
    const {description}=req.body;
  const question=`Only option tag with main category  value related to  ${description} and last  option with value other`;
  const answer=await getAIContent(question);
  res.status(200).json({ success: true,answer});
} catch (err) {
    console.log(err.message);
  res.status(500).json({ error: err.message });
}

};
module.exports={getCategoryByAi};