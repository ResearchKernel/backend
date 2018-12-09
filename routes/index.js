module.exports = ({ logger, db, AWS }) => {
  const express = require("express");
  const router = express.Router();
  const AuthHandler = require("./api/auth/auth.handler");
  const UserHandler = require("./api/user/user.handler");
  const UserMiddleware = require("./../middlewares/user.middleware");
  const { checkAuth } = require("./../utils/jwt");

  const upload = require("./../config/multer.config")({ AWS, logger });

  /**
   * { GET, POST, UPDATE, DELETE } User
   */
  router
    .route("/user")
    .get(checkAuth, (req, res, next) => {
      AuthHandler.getUserHandle(req, res, next, db);
    })
    .post((req, res, next) => {
      AuthHandler.postUserHandle(req, res, next, db);
    })
    .put(checkAuth, (req, res, next) => {
      AuthHandler.updateUserHandle(req, res, next, db);
    });

  router
    .route("/user/upload")
    .post(
      (req, res, next) => UserMiddleware(req, res, next, db),
      upload.array("file"),
      (req, res, next) => {
        UserHandler.handleUpload(req, res, next, db);
      }
    );

  /**
   * POST Login
   */
  router.route("/login").post((req, res, next) => {
    AuthHandler.loginUserHandle(req, res, next, db);
  });

  router.route("/auth/google").post((req, res, next) => {
    AuthHandler.googleAuth(req, res, next, db);
  });

  return router;
};
