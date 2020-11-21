const aws = require("aws-sdk");
const s3 = new aws.S3({
  signatureVersion: 'v4',
  region: process.env.AWS_S3_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadToS3 = async (key, buffer, mimetype)  =>{
  return new Promise((resolve) => {
    s3.putObject(
      {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        ContentType: mimetype,
        Key: key,
        Body: buffer
      },
      () => resolve()
    );
  });
}

const getSignedUrl = async (key, expires = 3600) => {
  return new Promise((resolve) => {
    s3.getSignedUrl(
      "getObject",
      {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Expires: expires
      },
      (err, url) => {
        if (err) throw new Error(err);

        resolve(url);
      }
    );
  });
}

const getSignedUrls = async (objects) => {
  const urls = await Promise.all(objects.map(async ({key, book_id}) => {
    const url = await getSignedUrl(key);
    return { url, book_id }
  }));
  console.log(urls);
  return new Promise((resolve) => {
    resolve(urls);
  });
}

module.exports = { uploadToS3, getSignedUrl, getSignedUrls };
