//VERSI 4.0++
// 'use strict';
// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define('User', {
//     email: DataTypes.STRING
//   })
//     User.associate = function(models){
//       User.hasMany(models.Todo)
//     }
//   return User;
// };

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Todo)
      }
    }
  });
  return User;
};
