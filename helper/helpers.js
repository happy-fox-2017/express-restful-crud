'use strict'

module.exports = {
  formatDate: function(date){
    var dateFormat = require('dateformat');
    return dateFormat(date, "dddd, d mmm yyyy, H:MM")
  }
}
