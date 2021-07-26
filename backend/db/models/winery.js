'use strict';
module.exports = (sequelize, DataTypes) => {
  const Winery = sequelize.define('Winery', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {});
  Winery.associate = function(models) {
    Winery.belongsTo(models.User, { foreignKey: 'ownerId' });
    Winery.hasMany(models.Wine, { 
      foreignKey: 'wineryId',
      onDelete: 'CASCADE',
      hooks: true,
      // constraints: false, // cant delete winery and make wineryId null in Wines Table
    });
  };
  return Winery;
};