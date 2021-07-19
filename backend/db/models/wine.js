'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wine = sequelize.define('Wine', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    price: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    designation: DataTypes.STRING,
    region_1: DataTypes.STRING,
    region_2: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    wineryId: DataTypes.INTEGER,
    colorTypeId: DataTypes.INTEGER,
    wineTypeId: DataTypes.INTEGER
  }, {});
  Wine.associate = function(models) {
    // associations can be defined here
  };
  return Wine;
};