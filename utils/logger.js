const bunyan = require("bunyan");
const package = require("../package.json");

const logger = bunyan.createLogger({
  name: package.name,
  src: false
});

module.exports = logger;
