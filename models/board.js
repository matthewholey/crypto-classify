'use strict';
module.exports = (sequelize, DataTypes) => {
  var board = sequelize.define('board', {
    title: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.board.belongsTo(models.user);
        models.board.hasMany(models.crypto);
      }
    }
  });
  return board;
};