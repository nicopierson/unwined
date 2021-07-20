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
    wineryId: {
      type: DataTypes.INTEGER,
    },
    colorTypeId: DataTypes.INTEGER,
    wineTypeId: DataTypes.INTEGER
  }, {});
  Wine.associate = function(models) {
    Wine.belongsTo(models.User, { foreignKey: 'userId' });
    Wine.belongsTo(models.Winery, { 
      foreignKey: 'wineryId',
      // constraints: false,
    });
    Wine.belongsTo(models.ColorType, { foreignKey: 'colorTypeId' });
    Wine.belongsTo(models.WineType, { foreignKey: 'wineTypeId' });
    Wine.hasMany(models.Review, { foreignKey: 'wineId' });
  };
  return Wine;
};