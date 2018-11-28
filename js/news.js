//
// - reads in the data from data.json
// - checks the keys in the json data against the list of power generator types
// - turns the key value into a string to first and last characters
// - turns the string without brackets back into an integer to round numbers
// - adds this integer to the total
// - assigns this value to the corresponding id on the Dashboard


$(document).ready(function() {
  $.getJSON("./data/newsfeed.json", function(json){
    // console.log(json);
    var html = "<div class = 'clear'></div>"
    for (var Key in json) {
      var jsonTitle = JSON.stringify(json[Key][0]);
      var jsonURL = JSON.stringify(json[Key][1]);
      if (jsonTitle == '""') {
        jsonTitle = '"No heading"'
      }
      html += "<a href=" + jsonURL + ">"
      html += "<ul>"+jsonTitle+"</ul>";
      html += "</a>"
    }
    document.getElementById("news_feed_container").innerHTML = html;
  });
});
