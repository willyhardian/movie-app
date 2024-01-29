"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const movies = require("./movies.json")
    await queryInterface.bulkInsert(
      "Movies",
      movies.map((movie) => {
        movie.createdAt = movie.updatedAt = new Date();
        return movie;
      }, {})
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  },
};
