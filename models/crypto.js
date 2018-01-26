'use strict';
module.exports = (sequelize, DataTypes) => {
  var crypto = sequelize.define('crypto', {
    title: DataTypes.TEXT,
    boardId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.crypto.belongsTo(models.board);
      }
    }
  });
  return crypto;
};