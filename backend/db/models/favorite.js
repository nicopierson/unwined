'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsToMany(models.User, {
        through: 'FavoriteJoins',
        foreignKey: 'favoriteId',
        otherKey: 'userId'
    })
  };
  return Favorite;
};