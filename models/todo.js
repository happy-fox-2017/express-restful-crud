'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    is_complete: DataTypes.STRING,
    Users_id: DataTypes.INTEGER
  })

  // Todo.belongsTo(sequelize.models.User)
  Todo.associate = function(models){
    Todo.belongsTo(models.User,{foreignKey : "Users_id"})
  }
  return Todo;
};