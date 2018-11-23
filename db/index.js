module.exports = callback => {
  const models = require("./models");
  const logger = require("../utils/logger");
  models.sequelize
    .sync()
    .then(function() {
      logger.info("SQL connection successful.");
      return callback(models);
    })
    .catch(function(error) {
      logger.error(error);
    });
};
