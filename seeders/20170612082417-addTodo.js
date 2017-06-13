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
      title: 'express restful crud',
      is_complete: false,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'pair project',
      is_complete: false,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Todos', null, {});
  }
};
