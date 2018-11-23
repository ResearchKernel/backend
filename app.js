const dotenv = require("dotenv");
dotenv.config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("./utils/logger");
const Formatter = require("./utils/formatter.js");
const indexRouter = require("./routes/index");
const app = express();
const initializeDb = require("./db/index");

const initAWS = logger => {
  const aws = require("./config/aws.config")(logger);
  return aws;
};

const initElasticSearch = logger => {
  const es = require("./config/es.config")(logger);
  return es;
};

initializeDb(db => {
  // init aws
  const AWS = initAWS(logger);
  // init elasticsearch
  const ES = initElasticSearch(logger);
  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use((req, res, next) => {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    });
    next();
  });

  app.get("/", ({ res }) => res.json({ msg: "Status OK" }));
  app.use("/api", require("./routes/index")({ logger, ES, AWS, db }));

  // error handler
  app.use(function(error, req, res, next) {
    logger.error(error);
    // res.render("error");
    res
      .status(error.status || 500)
      .send(Formatter.parseError(error, error.status));
  });
});

module.exports = app;
