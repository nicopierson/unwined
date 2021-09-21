'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      favoriteId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, { foreignKey: 'userId' });
    Favorite.belongsTo(models.Wine, { foreignKey: 'wineId' });
  };
  return Favorite;
};