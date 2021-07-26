'use strict';
module.exports = (sequelize, DataTypes) => {
  const ColorType = sequelize.define('ColorType', {
    color: DataTypes.STRING
  }, {});
  ColorType.associate = function(models) {
    ColorType.hasMany(models.Wine, { foreignKey: 'colorTypeId' });
  };
  return ColorType;
};