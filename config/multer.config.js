module.exports = ({ AWS, logger }) => {
  // S3 upload
  const multer = require("multer");
  const multerS3 = require("multer-s3");
  const s3 = new AWS.S3();
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "researchkernel-user-uploads",
      metadata: function(req, file, cb) {
        logger.info(file);
        cb(null, { fieldName: file.fieldname, mimetype: file.mimetype });
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      }
    })
  });
  return upload;
};
