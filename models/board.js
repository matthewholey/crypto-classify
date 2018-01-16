'use strict';
module.exports = (sequelize, DataTypes) => {
  var board = sequelize.define('board', {
    title: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return board;
};