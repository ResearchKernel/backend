const Formatter = require("../../../utils/formatter");

class UserHandler {
  async handleUpload(req, res, next, db) {
    try {
      if (!(req.files || req.files[0])) {
        next({
          message: "Error uploading image",
          status: 400
        });
      }
      const FILE = req.files[0];
      const user = await db.User.findOne({ where: { id: req.query.userId } });
      if (!user) {
        res
          .status(404)
          .send(Formatter.parseError({ message: "User not found." }, 404));
      } else {
        const updated = await user.update(
          { avatarUrl: FILE.location },
          {
            where: { id: user.id }
          }
        );
        if (updated) {
          res.status(201).send(
            Formatter.parseResponse(
              {
                message: "Upload success",
                url: FILE.location,
                filename: FILE.originalname,
                size: FILE.size
              },
              201
            )
          );
        } else {
          res
            .status(500)
            .send(Formatter.parseResponse("User avatar not updated.", 500));
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserHandler();
