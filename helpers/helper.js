var moment = require('moment');

module.exports = {
  dateFormat: function(date) {
    return moment(date).format('dddd, DD MMM YYYY, h:mm');
  }
}
