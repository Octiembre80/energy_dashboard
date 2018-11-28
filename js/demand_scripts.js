//
// - reads in the data from data.json
// - checks the keys in the json data against the list of power generator types
// - turns the key value into a string to first and last characters
// - turns the string without brackets back into an integer to round numbers
// - adds this integer to the total
// - assigns this value to the corresponding id on the Dashboard


$(document).ready(function() {
  $.getJSON("./data/1620data.json", function(json){
    // console.log(json);
    list = ['"Biomass"', '"Nuclear"', '"Solar"', '"Fossil Gas"', '"Fossil Hard coal"', '"Hydro Pumped Storage"', '"Wind Offshore"', '"Wind Onshore"'];
    total = 0;
    for (var i in list){
      for (var Key in json) {
        if (Key == list[i]){
          var jsonStr = JSON.stringify(json[Key]).slice(1,-1);
          jsonStr = parseInt(jsonStr,10);
          total += jsonStr
          document.getElementById(Key).innerHTML = jsonStr + ' MW';
        }
      }
    }
    document.getElementById('demand').innerHTML = total + ' MW';
  });
});
