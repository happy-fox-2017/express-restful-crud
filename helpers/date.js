
function convertDate(date) {

  return new Date(date).toString() + `aaaaaaaa`
}

var date = new Date()
console.log(convertDate(date));


module.exports = {convertDate}
