'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Todos','UserId',Sequelize.INTEGER)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Todos','UserId')
  }
};
