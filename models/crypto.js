'use strict';
module.exports = (sequelize, DataTypes) => {
  var crypto = sequelize.define('crypto', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return crypto;
};