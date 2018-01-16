'use strict';
module.exports = (sequelize, DataTypes) => {
  var crypto = sequelize.define('crypto', {
    title: DataTypes.TEXT,
    boardId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return crypto;
};