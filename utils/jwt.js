const jwt = require("jsonwebtoken");

class JWT {
  signJWT(data = null) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
          data
        },
        process.env.JWT_SECRET,
        (error, token) => {
          if (error || !token) {
            return reject(error);
          }
          return resolve(token);
        }
      );
    });
  }

  verifyJWT(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err);
        } else {
          return resolve(decodedToken);
        }
      });
    });
  }
}

module.exports = new JWT();
