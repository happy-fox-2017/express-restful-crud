'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',[
      {
        email:"fajarkarim@gmail.com",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email:"hanah@gmail.com",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email:"rosa@gmail.com",
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        email:"luco@gmail.com",
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users',null,{})
  }
};
