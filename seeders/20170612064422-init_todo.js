'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Todos',[
      {
        title: "Makan Ayam",
        is_complete : false,
        UserId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        title: "lari Pagi",
        is_complete : false,
        UserId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        title: "Senam Jantung Sehat",
        is_complete : false,
        UserId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        title: "mahatma",
        is_complete : false,
        UserId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        title: "Ke pertemuan JS",
        is_complete : false,
        UserId : 3,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        title: "Belajar AJAX",
        is_complete : false,
        UserId : 3,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Person', null, {});
  }
};
