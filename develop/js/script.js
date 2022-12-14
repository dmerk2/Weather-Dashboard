var apiKey = "b1434cc4b4c38161215a67768fa4f514";
var cityInput = document.querySelector("#cityInputBtn");
var clear = document.querySelector("#clear");
var listCities = document.querySelector("#listCities");
// var currentWeather = document.querySelector("#currentWeather");
var ulEl = document.querySelector("#listCities");
// Image IDs
var img = document.querySelector("#img");
var fImg0 = document.querySelector("#fImg0");
var fImg1 = document.querySelector("#fImg1");
var fImg2 = document.querySelector("#fImg2");
var fImg3 = document.querySelector("#fImg3");
var fImg4 = document.querySelector("#fImg4");
// Use Moment to determine the current and future data
var currentDate = document.querySelector("#currentDate");
currentDate.textContent = moment().format("l");
var fDate0 = document.querySelector("#fDate0");
fDate0.textContent = moment().add(1, "days").format("l");
var fDate1 = document.querySelector("#fDate1");
fDate1.textContent = moment().add(2, "days").format("l");
var fDate2 = document.querySelector("#fDate2");
fDate2.textContent = moment().add(3, "days").format("l");
var fDate3 = document.querySelector("#fDate3");
fDate3.textContent = moment().add(4, "days").format("l");
var fDate4 = document.querySelector("#fDate4");
fDate4.textContent = moment().add(5, "days").format("l");

var currentIcon;
var iconImg = document.querySelector("#fImg0");

// Grab user's input
cityInput.addEventListener("click", function (event) {
  event.preventDefault();
  var userInput = document.getElementById("city").value;
  // Saves city to local memory
  addCityName(userInput);
  // Fetches data from API
  getWeather(userInput);
});
// Function to get 5-Day forecast
function getWeather(city) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&APPID=" +
    apiKey;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      currentIcon = data.weather[0].icon;

      var requestUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`;
      return fetch(requestUrl2);
    })
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //Keith -- Image in HTML needs have an IMG tag couldn't figure it out
      // var iconEl = getElementById('icon');
      // iconEl.textContent = data.list[0].weather[0].icon;
      // imageUrl = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
      // iconEl.setAttribute("src", imageUrl);
      // console.log(imageUrl);
      //Keith -- Added IDs to fetch so that they can be seen
      // Humidity IDs
      var humidity = document.querySelector("#humidity");
      var fHumidity0 = document.querySelector("#fHumidity0");
      var fHumidity1 = document.querySelector("#fHumidity1");
      var fHumidity2 = document.querySelector("#fHumidity2");
      var fHumidity3 = document.querySelector("#fHumidity3");
      var fHumidity4 = document.querySelector("#fHumidity4");
      // Temperature IDs
      var temp = document.querySelector("#temp");
      var fTemp0 = document.querySelector("#fTemp0");
      var fTemp1 = document.querySelector("#fTemp1");
      var fTemp2 = document.querySelector("#fTemp2");
      var fTemp3 = document.querySelector("#fTemp3");
      var fTemp4 = document.querySelector("#fTemp4");
      // Windspeed IDs
      var windSpeed = document.querySelector("#wind-speed");
      var fWindSpeed0 = document.querySelector("#fWindSpeed0");
      var fWindSpeed1 = document.querySelector("#fWindSpeed1");
      var fWindSpeed2 = document.querySelector("#fWindSpeed2");
      var fWindSpeed3 = document.querySelector("#fWindSpeed3");
      var fWindSpeed4 = document.querySelector("#fWindSpeed4");

      humidity.textContent = data.list[0].main.humidity + " %";
      temp.textContent = data.list[0].main.temp + " F";
      windSpeed.textContent = data.list[0].wind.speed + " MPH";

      // Retrieve weather icon
      var iconUrl =
        "https://openweathermap.org/img/wn/" +
        data.list[0].weather[0].icon +
        "@2x.png";
      iconImg.setAttribute("src", iconUrl);
      document.querySelector("#img").setAttribute("src", iconUrl);
      document.querySelector("#fImg0").setAttribute("src", iconUrl);
      document.querySelector("#fImg1").setAttribute("src", iconUrl);
      document.querySelector("#fImg2").setAttribute("src", iconUrl);
      document.querySelector("#fImg3").setAttribute("src", iconUrl);
      document.querySelector("#fImg4").setAttribute("src", iconUrl);
      // Future Temp
      fTemp0.textContent = data.list[0].main.temp + " F";
      fTemp1.textContent = data.list[9].main.temp + " F";
      fTemp2.textContent = data.list[18].main.temp + " F";
      fTemp3.textContent = data.list[27].main.temp + " F";
      fTemp4.textContent = data.list[36].main.temp + " F";
      // Future wind speed
      fWindSpeed0.textContent = data.list[0].wind.speed + " MPH";
      fWindSpeed1.textContent = data.list[9].wind.speed + " MPH";
      fWindSpeed2.textContent = data.list[18].wind.speed + " MPH";
      fWindSpeed3.textContent = data.list[27].wind.speed + " MPH";
      fWindSpeed4.textContent = data.list[36].wind.speed + " MPH";
      // Future humidity
      fHumidity0.textContent = data.list[0].main.humidity + " %";
      fHumidity1.textContent = data.list[9].main.humidity + " %";
      fHumidity2.textContent = data.list[18].main.humidity + " %";
      fHumidity3.textContent = data.list[27].main.humidity + " %";
      fHumidity4.textContent = data.list[36].main.humidity + " %";

      // uvIndex = data.value;
      // var uvColorEl = document.querySelector("#uv-index");

      // uvColorEl.textContent.uvIndex;

      // if (uvIndex > 11) {
      //   uvColorEl.setAttribute("class", "bg-light");
      // } else if (uvIndex > 8 && uvIndex < 11) {
      //   uvColorEl.setAttribute("class", "bg-danger");
      // } else if (uvIndex > 6 && uvIndex < 8 + uvIndex) {
      //   uvColorEl.setAttribute("class", "bg-warning");
      // } else if (uvIndex > 3 && uv < 6 + uvIndex) {
      //   uvColorEl.setAttribute("class", "bg-success");
      // }

      getUV(lat, lon);
      return data;
    })
    .catch(function (error) {
      // console.log(error);
    });
}

// Function to get the uv index for the current city
// function getUvIndex(cityName) {
//   if (uvIndex >= 8) {
//     document.querySelector("#uvIndex").style("color", "red");
//   } else if (uvIndex > 4 && uvIndex < 8) {
//     document.querySelector("#uvIndex").style("color", "yellow");
//   } else {
//     document.querySelector("#uvIndex").style("color", "green");
//   }
// }

getWeather(city);
function getUV(lat, lon) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly" +
    "&units=imperial&appid" +
    apiKey;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      uvIndex = document.querySelector("#uv-index");
      // uvIndex = response.current.uvi;
      // uvIndex.textContent = uvIndex;
      return data;
    })
    .catch(function (error) {
      alert("No UV connection");
    });
}

function addCityName(cityName) {
  var tempArr = JSON.parse(localStorage.getItem("allCities"));
  if (tempArr === null) tempArr = [];
  var stored = {
    search: cityName,
  };
  if (!cityName) {
    alert("You must search a city!");
  }
  // Add new data
  tempArr.push(stored);
  // Update the data in localStorage
  localStorage.setItem("allCities", JSON.stringify(tempArr));
}

//Clear the search history and local storage from the page
function clearHistory(event) {
  event.preventDefault();
  stored = [];
  localStorage.clear();
  document.location.reload();
}

clear.addEventListener("click", clearHistory);

function renderSaved() {
  var cities = localStorage.getItem("allCities");
  var printCity = JSON.parse(cities);
  // Creates li for user's city input
  for (var i = 0; printCity.length; i++) {
    var cities = printCity[i].search;
    var liEl = document.createElement("li");
    liEl.textContent = cities;
    ulEl.appendChild(liEl);
  }
}
renderSaved();