// $(document).ready(function() {
    // convert temperatures from degrees Kelvin to degress Fahrenheit
    function tempConv(x) {
      return Math.round((x - 273.15) * 1.8 + 32);
    } // end fnc tempConv
    // get user's location from ip address
window.getWeather = function() {

    var getIP = 'http://ip-api.com/json/';
    $.getJSON(getIP).done(function(location) {
      var wxKey = '97096dd9f52a61051e6abc4495f2d176';
      // wxKey = process.env.WX_KEY;
      var wxUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + location.lat + '&lon=' + location.lon + '&appid=' + wxKey;
      // get uset's weather forecast
      $.getJSON(wxUrl, function(data) {
        // show current conditions
        $('#currentTemp').text('Current conditions in  ' + location.city + ', ' + location.region + ': ' + Math.round(tempConv(data.list[0].main.temp)) + 'F and ' + data.list[0].weather[0].description);
        // show conditions for next two forecast periods
        $('#forecast1').text('Forecast: ' + data.list[1].weather[0].description + ' followed by ' + data.list[2].weather[0].description);
        // find lowest temp in forecast
        var minTemp = [ data.list[0].main.temp_min, data.list[1].main.temp_min, data.list[2].main.temp_min ];
        minTemp.sort(function(a, b){return a-b});
        minTemp = tempConv(minTemp[0]);
        // find highest temp in forecast
        var maxTemp = [ data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max ] ;
        maxTemp.sort(function(a, b){return b-a});
        maxTemp = tempConv(maxTemp[0]);
        // find highest avg wind speed in forecast
        var avgWind = [ data.list[0].wind.speed, data.list[1].wind.speed, data.list[2].wind.speed ] ;
        avgWind.sort(function(a, b){return b-a});
        avgWind = Math.round(avgWind[0] * 2.23694); // convert from m/s to mph
        $('#minTemp').text('Min Temp: ' + minTemp + 'F and Max Temp: ' + maxTemp + 'F');
        $('#avgWind').text('Avg Wind Speed: ' + avgWind + ' mph');
      }); // end weather JSON
    }); // end location JSON
  }
// });
