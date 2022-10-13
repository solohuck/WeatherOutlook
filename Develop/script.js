
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
        
      });
    }
    
    loadRecentCities();
  
