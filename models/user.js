'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Todo);
      }
    }
  });

  sequelize.models.Todo.belongsTo(User);

  return User;
};
