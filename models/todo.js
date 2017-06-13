'use strict';
module.exports = function(sequelize, DataTypes) {
  var todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    is_complete: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  });
  
  todo.associate = function(models){
    todo.belongsTo(models.user,{foreignKey:'id_user'})
  }
  return todo;
};