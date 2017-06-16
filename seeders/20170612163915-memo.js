'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Todos', [{
      title       : 'Makan',
      is_complete : false,
      createdAt   : new Date(),
      updatedAt   : new Date(),
      user_id     : 2
    }, {
      title       : 'Tidur',
      is_complete : false,
      createdAt   : new Date(),
      updatedAt   : new Date(),
      user_id     : 2
    }])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
