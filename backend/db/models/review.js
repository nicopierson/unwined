'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comments: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    wineId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Wine, { foreignKey: 'wineId' });
  };
  return Review;
};