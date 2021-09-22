'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // Create randomly generated likes for wines
    const favorites = [];
    const NUM_FAVORITES = 100;
    const NUM_USERS = 4;
    const NUM_WINES = 5000;
    for (let i = 0; i <= NUM_FAVORITES; i++) {
      let obj = {
        userId: Math.ceil(NUM_USERS * Math.random()),
        wineId: Math.ceil(NUM_WINES * Math.random()),
      };
      favorites.push(obj);
    }

    return queryInterface.bulkInsert('Favorites', favorites, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Favorites', null, {});
  }
};
