'use strict';
module.exports = (sequelize, DataTypes) => {
  const WineType = sequelize.define('WineType', {
    variety: DataTypes.STRING
  }, {});
  WineType.associate = function(models) {
    WineType.hasMany(models.Wine, { foreignKey: 'wineTypeId' });
  };
  return WineType;
};