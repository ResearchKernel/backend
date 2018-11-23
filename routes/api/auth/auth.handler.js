const Formatter = require("../../../utils/formatter");
const JWT = require("../../../utils/jwt");

class AuthHandler {
  async getUserHandle(req, res, next, db) {
    try {
      const result = await db.User.findByPk(req.query.userId);
      if (!result) {
        res
          .status(404)
          .send(Formatter.parseError({ message: "Username not found." }, 404));
      } else {
        res.status(200).send(Formatter.parseResponse(result, 200));
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
        res.status(409).send({ message: "User Already exists.", status: 409 });
      } else {
        res
          .status(201)
          .send({ message: "User successfully created.", status: 201 });
      }
    } catch (error) {
      next(error);
    }
  }

  async loginUserHandle(req, res, next, db) {
    try {
      const user = await db.User.findOne({ email: req.body.email });
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
      const user = await db.User.findByPk(req.query.userId);
      if (!user) {
        res
          .status(404)
          .send(Formatter.parseError({ message: "User not found." }, 404));
      } else {
        const updated = await user.updateAttributes(req.body);
        if (updated) {
          res
            .status(200)
            .send(Formatter.parseResponse("User updated successfully.", 200));
        } else {
          res
            .status(200)
            .send(Formatter.parseResponse("User not updated.", 200));
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthHandler();
