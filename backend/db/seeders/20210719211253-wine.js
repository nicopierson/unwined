'use strict';

const wines = require('../../assets/wines-data.json');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Wines', wines, {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wines', null, {});
  }
};