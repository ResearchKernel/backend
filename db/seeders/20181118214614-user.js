"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Tushar",
          lastName: "Mudgal",
          email: "tusharmudgal3@gmail.com",
          password:
            "$2a$10$/jltggGJxSbh.3TbCjY2.ufh2ZCoCMzhNB/93Hc4bM4Ubtvoqy1j6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Prakritidev",
          lastName: "Verma",
          email: "pd@gmail.com",
          password:
            "$2a$10$/jltggGJxSbh.3TbCjY2.ufh2ZCoCMzhNB/93Hc4bM4Ubtvoqy1j6",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
