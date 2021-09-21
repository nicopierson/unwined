'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteJoin = sequelize.define('FavoriteJoin', {
    favoriteId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Favorites'}
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users'}
      },
  }, {});
  FavoriteJoin.associate = function(models) {
    // not needed because at the end of the line only use if deleting favorite as well
    // FavoriteJoin.belongsTo(models.Favorite, { foreignKey: 'favoriteId' })
    FavoriteJoin.belongsTo(models.User, { foreignKey: 'userId' })

  };
  return FavoriteJoin;
};