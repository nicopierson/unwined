'use strict';

const wineries = require('../../assets/winery-data.json');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Wineries', wineries, {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wineries', null, {});
  }
};
