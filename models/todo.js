'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Todo.belongsTo(models.User);
      }
    }
  });

  // Todo.belongsTo(sequelize.models.User);
  // sequelize.sync({
  //   force: true
  // });

  return Todo;
};