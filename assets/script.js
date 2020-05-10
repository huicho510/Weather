let savBtn = document.getElementById("save");
let textIn = document.getElementById("newItem");
var APIKey = "166a433c57516f51dfab1f7edaed8413";
const cities = ["Sacramento", "New York"];



$("#save").on("click", function (event) {
  event.preventDefault();
  var cityName = $("#newItem").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#info").text(JSON.stringify(response));

    $("#info").html("<h2> " + response.name + " " + "Weather Details </h2>");

    $("#info").append("<li> Wind Speed: " + response.wind.speed + "</li>");
    $("#info").append("<li> Humidity: " + response.main.humidity + "</li>");

    var tempF = (response.main.temp - 273.15) * 1.8 + 32;

    
    $("#info").append("<li>Temperature: " + tempF.toFixed(2) + "(F)</li>");
    const img =
      "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    const imgEl = $("<img>").attr("src", img);
    $("#info").append(imgEl);
    console.log(img);

    localStorage.setItem(cityName, JSON.stringify(queryURL));

    var lon = response.coord.lon;
    var lat = response.coord.lat;

    // SEND OVER TO uvIndex()
    uvIndex(lon, lat);
    getForecast(cityName);
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

function getForecast(cityName) {
  var weeklyUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIKey;

  $.ajax({
    url: weeklyUrl,
    method: "GET",
  }).then(function (response) {
    $("#week")
      .html('<h4 "mt-3">5-Day Forecast: </h4>')
      .append('<div class="row ">');

    for (var i = 0; i < response.list.length; i += 8) {
      const colEl = $("<div>").addClass("col-md-2");

      const cardEl = $("<div>").addClass("card bg-primary text-white");

      const cardBodyEl = $("<div>").addClass("card-body p-2");

      const titleEl = $("<h5>")
        .addClass("card-title")
        .text(new Date(response.list[i].dt_txt).toLocaleDateString());
      const imgEll = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          response.list[i].weather[0].icon +
          ".png"
      );
      const tempEl = $("<p>")
        .addClass("card-text")
        .text(`Temp: ${response.list[i].main.temp_max}`);
      const humidityEl = $("<p>")
        .addClass("card-text")
        .text(`Humidity: ${response.list[i].main.humidity}`);

      cardBodyEl.append(titleEl, imgEll, tempEl, humidityEl);
      cardEl.append(cardBodyEl);

      colEl.append(cardEl);

      $("#week .row").append(colEl);
    }
  });
}

function uvIndex(lon, lat) {
  
  var indexURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=8c9bb7e0eeb10862d148cd62de471c05&lat=";

  var indexSearch = indexURL + lat + "&lon=" + lon;
  console.log(indexSearch);

  $.ajax({
    url: indexSearch,
    method: "GET",
  }).then(function (response) {
    var uv = response.value;

    $("#info").append("UV Index: ");
    var uvBtn = $("<button>").text(uv);
    $("#info").append(uvBtn);

    if (uv < 3) {
      uvBtn.attr("class", "green");
    } else if (uv < 6) {
      uvBtn.attr("class", "yellow");
    } else if (uv < 8) {
      uvBtn.attr("class", "orange");
    } else if (uv < 11) {
      uvBtn.attr("class", "red");
    }
  });
}

addCity();
savBtn.addEventListener("click", myFunction);
