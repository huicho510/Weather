var APIKey = "166a433c57516f51dfab1f7edaed8413";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Bujumbura,Burundi&appid=" +
  APIKey;

$.ajax({
  url: queryURL,
  method: "GET",
})
.then(function (response) {
  console.log(queryURL);

  console.log(response);

  $("#info").html("<h1>" + response.name + " Weather Details</h1>");

  $("#info").append("<li> Wind Speed: " + response.wind.speed + "</li>");
  $("#info").append("<li> Humidity: " + response.main.humidity + "</li>");

  var tempF = (response.main.temp - 273.15) * 1.8 + 32;

  $("#info").append("Temperature (K) " + response.main.temp);
  $("#info").append("Temperature (F) " + tempF.toFixed(2));
});

$("#newItem").keyup(function (e) {
  var code = e.which;
  if (code == 13) {
    e.preventDefault();
    $("ul").append("<li>" + e.target.value + "</li>"); // new hw might be useful
  }
});
