'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Wineries', [

    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wineries', null, {});
  }
};
