'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('ColorTypes', [
      { color: 'white' },
      { color: 'red' },
      { color: 'rosé' }, 
      { color: 'green' },
      { color: 'yellow' },
      { color: 'gray' },
      { color: 'tawny' },
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ColorTypes', null, {});
  }
};