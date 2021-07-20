'use strict';
module.exports = (sequelize, DataTypes) => {
  const WineType = sequelize.define('WineType', {
    type: DataTypes.STRING
  }, {});
  WineType.associate = function(models) {
    WineType.hasMany(models.Wine, { foreignKey: 'wineTypeId' });
  };
  return WineType;
};