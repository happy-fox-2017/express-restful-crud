'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  });
  
  user.associate = function(models){
    user.hasMany(models.todo,{foreignKey: 'id_user'})
  }
  return user;
};