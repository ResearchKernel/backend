"use strict";
module.exports = (sequelize, DataTypes) => {
  const Bookmarks = sequelize.define(
    "Bookmarks",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      arxivId: DataTypes.STRING
    },
    {}
  );
  Bookmarks.associate = function(models) {
    // associations can be defined here
  };
  return Bookmarks;
};
