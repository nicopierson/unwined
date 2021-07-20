'use strict';
module.exports = (sequelize, DataTypes) => {
  const WineType = sequelize.define('WineType', {
    type: DataTypes.STRING
  }, {});
  WineType.associate = function(models) {
    // associations can be defined here
  };
  return WineType;
};