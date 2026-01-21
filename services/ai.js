const  { GoogleGenAI }=require("@google/genai");
require("dotenv").config();
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
async function getAIContent(content) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: content,
  });

  return response.text;
}
module.exports={getAIContent}