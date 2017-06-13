'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Todos',[{
      title : 'Koding always',
      is_complete : "Completed",
      Users_id : 2,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {} )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
