module.exports = {
  dateing: function (input) {
    let date = input.toString().split(' ')
    // console.log(date[4].slice(0,5),date[4]);
    return `${date[0]}, ${date[2]} ${date[1]} ${date[3]} ${date[4].slice(0,5)}`
  }
};
