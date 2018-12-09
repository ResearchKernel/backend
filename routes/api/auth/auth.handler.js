const Formatter = require("../../../utils/formatter");
const JWT = require("../../../utils/jwt");

class AuthHandler {
  async getUserHandle(req, res, next, db) {
    try {
      const user = await db.User.findOne({ where: { id: req.query.userId } });
      if (!user) {
        res
          .status(404)
          .send(Formatter.parseError({ message: "Username not found." }, 404));
      } else {
        res.status(200).send(
          Formatter.parseResponse(
            {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              bio: user.bio,
              github: user.github,
              linkedIn: user.linkedIn,
              twitter: user.twitter
            },
            200
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }

  async postUserHandle(req, res, next, db) {
    try {
      const [instance, wasCreated] = await db.User.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          ...req.body
        }
      });
      if (!wasCreated) {
        res
          .status(409)
          .send(Formatter.parseError({ message: "User Already exists." }, 409));
      } else {
        res
          .status(201)
          .send(Formatter.parseResponse("User successfully created.", 201));
      }
    } catch (error) {
      next(error);
    }
  }

  async loginUserHandle(req, res, next, db) {
    try {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      if (!user) {
        res
          .status(404)
          .send(Formatter.parseError({ message: "User not found." }, 404));
      } else {
        const isSame = await require("bcryptjs").compare(
          req.body.password,
          user.password
        );
        if (isSame) {
          const token = await JWT.signJWT({ userId: user.id });
          res.status(200).send(
            Formatter.parseResponse(
              {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                bio: user.bio,
                github: user.github,
                linkedIn: user.linkedIn,
                twitter: user.twitter,
                google: user.google,
                token
              },
              200
            )
          );
        } else {
          res
            .status(200)
            .send(
              Formatter.parseError(
                { message: "Invalid email or password." },
                409
              )
            );
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async updateUserHandle(req, res, next, db) {
    try {
      const user = await db.User.findOne({ where: { id: req.query.userId } });
      if (!user) {
        res
          .status(404)
          .send(Formatter.parseError({ message: "User not found." }, 404));
      } else {
        const updated = await user.update(req.body, {
          where: { id: user.id }
        });
        if (updated) {
          res
            .status(200)
            .send(Formatter.parseResponse("User updated successfully.", 200));
        } else {
          res
            .status(409)
            .send(Formatter.parseResponse("User not updated.", 409));
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async googleAuth(req, res, next, db) {
    const payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    try {
      let [user, wasCreated] = await db.User.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          ...payload
        }
      });
      if (!wasCreated) {
        // user already exists
        // update user
        user = await user.update(payload, {
          where: { id: user.id }
        });
      }
      const token = await JWT.signJWT({ userId: user.id });
      res.status(200).send(
        Formatter.parseResponse(
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            bio: user.bio,
            github: user.github,
            linkedIn: user.linkedIn,
            twitter: user.twitter,
            google: user.google,
            // isAuthenticated: user.isAuthenticated,
            token
          },
          200
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthHandler();
