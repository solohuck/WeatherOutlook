 
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
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly &units=imperial&appid=42d98d76405f5b8038f2ad71187af430`,
    method: "GET",
  }).then(function (response) {
  
  var uvIndex = response.current.uvi;
    $("#uv-index").text(`UV Index: ${uvIndex}`);
    if (uvIndex >= 8) {
    $("#uv-index").css("color", "red");
    } else if (uvIndex > 4 && uvIndex < 8) {
    $("#uv-index").css("color", "yellow");
    } else {
    $("#uv-index").css("color", "green");
      
      var cityHigh = response.daily[0].temp.max;
      $("#high").text(`Expected high (F):${cityHigh}`);
    $("#temp1").text(`Temp(F): ${response.daily[1].temp.max.toFixed(1)}`);
    $("#hum1").text(`Hum: ${response.daily[1].humidity}%`);
    var icon1 = response.daily[1].weather[0].icon;
    $("#temp2").text(`Temp(F): ${response.daily[2].temp.max.toFixed(1)}`);
    $("#hum2").text(`Hum: ${response.daily[2].humidity}%`);
    var icon2 = response.daily[2].weather[0].icon;
    $("#temp3").text(`Temp(F): ${response.daily[3].temp.max.toFixed(1)}`);
    $("#hum3").text(`Hum: ${response.daily[3].humidity}%`);
    var icon3 = response.daily[3].weather[0].icon;
    $("#temp4").text(`Temp(F): ${response.daily[4].temp.max.toFixed(1)}`);
    $("#hum4").text(`Hum: ${response.daily[4].humidity}%`);
    var icon4 = response.daily[4].weather[0].icon;
    $("#temp5").text(`Temp(F): ${response.daily[5].temp.max.toFixed(1)}`);
    $("#hum5").text(`Hum: ${response.daily[5].humidity}%`);
    var icon5 = response.daily[5].weather[0].icon;
    
    $("#icon1").html(`<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`);
    $("#icon2").html(`<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`);
    $("#icon3").html(`<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`);
    $("#icon4").html(`<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`);
    $("#icon5").html(`<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`);
    }}
)}