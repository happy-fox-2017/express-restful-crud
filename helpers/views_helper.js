helpers = {
  displayTanggal : function(Tanggal){
    
    var d = new Date(Tanggal);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var m_names = new Array("Jan", "Feb", "Mar", 
    "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
    "Oct", "Nov", "Dec");
    
    var day = weekday[d.getDay()];
    var date = d.getDate();
    var month = m_names[d.getMonth()];
    var year = d.getFullYear();
    var time = d.toTimeString().slice(0,5);
    
    return `${day}, ${date} ${month} ${year}, ${time}`;
  }
  
}

module.exports = helpers
