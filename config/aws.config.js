"use strict";

module.exports = logger => {
  const AWS = require("aws-sdk");
  const options = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  };
  AWS.config.update({
    credentials: new AWS.Credentials(
      options.accessKeyId,
      options.secretAccessKey
    ),
    region: options.region
  });

  return AWS;
};
