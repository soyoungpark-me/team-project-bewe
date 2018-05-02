const fs = require('fs');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.loadFromPath('./../COMMON/config/AWSConfig.json');

const s3 = new aws.S3();

const storageS3 = multerS3({
  s3: s3,
  bucket: 'server-devcamp-bewe/images',
  acl: 'public-read',
  key: function (req, file, callback) {
    const fname = Date.now() + '_' + file.originalname;
    callback(null, fname);
  }
});

exports.uploadSingle = multer({storage: storageS3}).single('image');
exports.uploadArray = multer({storage: storageS3}).array('image', 5);