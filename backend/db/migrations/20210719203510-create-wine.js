'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      imageUrl: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      description: {
        type: Sequelize.TEXT,
      },
      province: {
        type: Sequelize.STRING(100),
      },
      country: {
        type: Sequelize.STRING(100),
      },
      price: {
        type: Sequelize.INTEGER,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      designation: {
        type: Sequelize.STRING(100),
      },
      region_1: {
        type: Sequelize.STRING(60),
      },
      region_2: {
        type: Sequelize.STRING(60),
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
      },
      wineryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Wineries' },
      },
      colorTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'ColorTypes' },
      },
      wineTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'WineTypes' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Wines');
  }
};