 
var todayDate = moment().format("MMM DD, YYYY");
var city;
var cities;

function loadRecentCities() {
  var recentCities = JSON.parse(localStorage.getItem("cities"));
  if (recentCities) {
  cities = recentCities;
  } else {
  cities = [];
  }
}
loadRecentCities();

$("#submit").on("click", (event) => {
  event.preventDefault();
  getCity();
  search();
  $("#city-input").val("");
  listCities();
});
    
function getCity() {
  city = $("#city-input").val();
  if (city && cities.includes(city) === false) {
    saveToLocalStorage();
    return city;
  } else if (!city) {
    alert("Try again");
    }
}
    
function search() {
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q= ${city} &units=imperial&appid=42d98d76405f5b8038f2ad71187af430`;
var longLat = [];
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    longLat.push(response.coord.lat);
    longLat.push(response.coord.lon);
    $("#city-name").html(`${response.name} ${todayDate}`);
    $("#city-cond").text(`Current Conditions: ${response.weather[0].description.toUpperCase()}`);
    $("#temp").text(`Current Temp (F): ${response.main.temp.toFixed(1)}`);
    $("#humidity").text(`Humidity: ${response.main.humidity}%`);
    $("#wind-speed").text(`Wind Speed: ${response.wind.speed} mph`); 
    $("#date1").text(day1);
    $("#date2").text(day2);
    $("#date3").text(day3);
    $("#date4").text(day4);
    $("#date5").text(day5);
    getUV(response.coord.lat, response.coord.lon);
  });
}
    
function loadMostRecent() {
  var lastSearch = localStorage.getItem("mostRecent");
if (lastSearch) {
  city = lastSearch;
  search();
  } else {
  city = " ";
  search();
  }
}
loadMostRecent();

function saveToLocalStorage() {
  localStorage.setItem("mostRecent", city);
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
}

var day1 = moment().add(1, "days").format("MMM DD, YYYY");
var day2 = moment().add(2, "days").format("MMM DD, YYYY");
var day3 = moment().add(3, "days").format("MMM DD, YYYY");
var day4 = moment().add(4, "days").format("MMM DD, YYYY");
var day5 = moment().add(5, "days").format("MMM DD, YYYY");

function getUV(lat, lon) {
       
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430",
    method: "GET",
  }).then(function (response) {
  
    var uvIndex = response.current.uvi;
    $("#uv-index").text("UV Index:" + " " + uvIndex);
      if (uvIndex >= 8) {
      $("#uv-index").css("color", "red");
      } else if (uvIndex > 4 && uvIndex < 8) {
      $("#uv-index").css("color", "yellow");
      } else {
      $("#uv-index").css("color", "green");
    }}
)}