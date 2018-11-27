const jwt = require("jsonwebtoken");

class JWT {
  async signJWT(data = null) {
    try {
      return await jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365, data },
        process.env.JWT_SECRET
      );
    } catch (error) {
      throw Error(error.message);
    }
  }

  async verifyJWT(token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw Error(error.message);
    }
  }

  async checkAuth(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).send({ message: "Unauthorized request", status: 401 });
      }
      await new JWT().verifyJWT(req.headers.authorization);
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new JWT();
