'use strict';

const wineTypes = require('../../assets/wine-types-data.json');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('WineTypes', wineTypes, {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WineTypes', null, {});
  }
};