module.exports = ({ logger, db }) => {
  const express = require("express");
  const router = express.Router();
  const AuthHandler = require("./api/auth/auth.handler");
  const Formatter = require("./../utils/formatter");
  /**
   * { GET, POST, UPDATE, DELETE } User
   */
  router
    .route("/user")
    .get((req, res, next) => {
      AuthHandler.getUserHandle(req, res, next, db);
    })
    .post((req, res, next) => {
      AuthHandler.postUserHandle(req, res, next, db);
    })
    .put((req, res, next) => {
      AuthHandler.updateUserHandle(req, res, next, db);
    });

  /**
   * POST Login
   */
  router.route("/login").post((req, res, next) => {
    AuthHandler.loginUserHandle(req, res, next, db);
  });

  return router;
};
