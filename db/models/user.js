"use strict";
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: { type: DataTypes.STRING, allowNull: false },
      avatarUrl: DataTypes.STRING,
      password: DataTypes.STRING,
      bio: DataTypes.TEXT,
      github: DataTypes.STRING,
      linkedIn: DataTypes.STRING,
      twitter: DataTypes.STRING
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: user => {
          user.password =
            user.password && user.password != ""
              ? bcrypt.hashSync(user.password, 10)
              : "";
        },
        beforeUpdate: user => {
          user.password =
            user.password && user.password != ""
              ? bcrypt.hashSync(user.password, 10)
              : "";
        }
      }
    }
  );

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
