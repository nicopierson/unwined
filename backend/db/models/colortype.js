'use strict';
module.exports = (sequelize, DataTypes) => {
  const ColorType = sequelize.define('ColorType', {
    color: DataTypes.STRING
  }, {});
  ColorType.associate = function(models) {
    // associations can be defined here
  };
  return ColorType;
};