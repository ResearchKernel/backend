module.exports = async (req, res, next, db) => {
  const Formatter = require("./../utils/formatter");
  if (!req.query.userId) {
    next({ message: "userId is required in request query.", status: 409 });
  }
  const user = await db.User.findOne({ where: { id: req.query.userId } });
  if (!user) {
    res
      .status(404)
      .send(Formatter.parseError({ message: "userId not found" }, 404));
  } else {
    next();
  }
};
