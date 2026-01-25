const AWS = require("aws-sdk");

function uploadToS3(data, filename) {

  const s3 = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SEC_KEY,
   
  });

  const params = {
    Bucket: process.env.BUKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read"
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.Location); 
      }
    });
  });
}



module.exports = uploadToS3;
