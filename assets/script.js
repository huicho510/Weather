let savBtn = document.getElementById("save");
let textIn = document.getElementById("newItem");
let APIKey = "166a433c57516f51dfab1f7edaed8413";


$("body").on("click", ".touch", (event) => {
  event.preventDefault();
  let cityName = $(this).text();
  
  let queryURL =
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

    let tempF = (response.main.temp - 273.15) * 1.8 + 32;

    $("#info").append("<li>Temperature: " + tempF.toFixed(2) + "(F)</li>");
    const img =
      "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    const imgEl = $("<img>").attr("src", img);
    $("#info").append(imgEl);
    console.log(img);

    localStorage.setItem(cityName, JSON.stringify(queryURL));
    let lon = response.coord.lon;
    let lat = response.coord.lat;

    // SEND OVER TO uvIndex()
    uvIndex(lon, lat);
    getForecast(cityName);
  });
});

function search() {
  $("#save").on("click", function (event) {
    event.preventDefault();
    let cityName = $("#newItem").val();
    let queryURL =
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

      let tempF = (response.main.temp - 273.15) * 1.8 + 32;

      $("#info").append("<li>Temperature: " + tempF.toFixed(2) + "(F)</li>");
      const img =
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      const imgEl = $("<img>").attr("src", img);
      $("#info").append(imgEl);
      console.log(img);

      localStorage.setItem(cityName, JSON.stringify(queryURL));

      let lon = response.coord.lon;
      let lat = response.coord.lat;

      // SEND OVER TO uvIndex()
      uvIndex(lon, lat);
      getForecast(cityName);
    });
    $('#newItem').val('');
  });
}

// function addCity() {
//   $("#newItem").keyup(function (e) {
//     // let code = e.which;
//     // if (code == 13) {
//     //   e.preventDefault();
//     //   $("ul").append("<li>" + e.target.value + "</li>"); // no longer needed but Will leave for reference
//     // }
//   });
// }

function myFunction() {
  savBtn.keyup = $("ul").append("<li class= touch>" + textIn.value + "</li>");
}

function getForecast(cityName) {
  let weeklyUrl =
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

    for (let i = 0; i < response.list.length; i += 8) {
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
  let indexURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=8c9bb7e0eeb10862d148cd62de471c05&lat=";

  let indexSearch = indexURL + lat + "&lon=" + lon;
  console.log(indexSearch);

  $.ajax({
    url: indexSearch,
    method: "GET",
  }).then(function (response) {
    let uv = response.value;

    $("#info").append("UV Index: ");
    let uvBtn = $("<button>").text(uv);
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

savBtn.addEventListener("click", myFunction);
search();
