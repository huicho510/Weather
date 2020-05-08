let savBtn = document.getElementById("save");
let textIn = document.getElementById("newItem");
var APIKey = "166a433c57516f51dfab1f7edaed8413";

// var queryURL =
//   "https://api.openweathermap.org/data/2.5/weather?" + "q=&appid=" + APIKey;

$("#save").on("click", function (event) {
  event.preventDefault();
  var cityName = $('#newItem').val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid="+ APIKey;
  

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#info").text(JSON.stringify(response));

    $("#info").html("<h2> " + response.name + ' ' +  "Weather Details </h2>");

    $("#info").append("<li> Wind Speed: " + response.wind.speed + "</li>");
    $("#info").append("<li> Humidity: " + response.main.humidity + "</li>");

    var tempF = (response.main.temp - 273.15) * 1.8 + 32;

    // $("#info").append("Temperature (K) " + response.main.temp);
    $("#info").append("<li>Temperature: " + tempF.toFixed(2) +  "(F)</li>");


  });
});

function addCity() {
  $("#newItem").keyup(function (e) {
    var code = e.which;
    if (code == 13) {
      e.preventDefault();
      $("ul").append("<li>" + e.target.value + "</li>"); // new hw might be useful
    }
  });
}

function myFunction() {
  savBtn.keyup = $("ul").append("<li>" + textIn.value + "</li>");
  
}
$("#save").on("click", function (event) {
  event.preventDefault();
var cityName = $('#newItem').val();
var weeklyUrl ="api.openweathermap.org/data/2.5/forecast?q="+ cityName +"&appid="+ APIKey


$.ajax({
  url: weeklyUrl,
  method: "GET",
}).then(function (response) {
  $("#week").text(JSON.stringify(response));

  $("#week").html("<h2> " + response.name + ' ' +  "Weather Details </h2>");

  $("#card").append("<li> Humidity: " + response.list.main.humidity + "</li>");

  var tempF = (response.main.temp - 273.15) * 1.8 + 32;

  $("#th").append("<li>Temperature: " + tempF.toFixed(2) + "(F)</li>");


});
});
// $("#save").on("click", function (event) {
//   event.preventDefault();
//   var cityName = $('#newItem').val();
//   var queryURL = "api.openweathermap.org/data/2.5/onecall?uvi?q="+ cityName + "&appid="+ APIKey;

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     $("#info").text(JSON.stringify(response));

//     $("#info").append("<li> " + response.current.uvi + "</li>");

//   });
// });



  


//

addCity();
savBtn.addEventListener("click", myFunction);
