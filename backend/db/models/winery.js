'use strict';
module.exports = (sequelize, DataTypes) => {
  const Winery = sequelize.define('Winery', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {});
  Winery.associate = function(models) {
    // associations can be defined here
  };
  return Winery;
};