function formatDate(date) {
  let currentHour = currentTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = currentTime.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let currentDay = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDay];
  return `Last updated: ${day} ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class = "row mt-5">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class = "col">
              <div class = "weather-forecast-date mx-auto"> ${formatDay(
                forecastDay.dt
              )} </div>
              <img class = "forecast-icon" src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt=""> </img> 
              <div class = "weather-forecast-temperatures"> 
                <span class = "weather-forecast-max"> ${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class = "weather-forecast-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=b0a3ae53d6b8668034340ca91d9b9f65&units=imperial`;
  axios.get(apiUrl).then(showForecast);
  console.log(apiUrl);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b0a3ae53d6b8668034340ca91d9b9f65&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let tempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#current-city");
  let maxTempElement = document.querySelector("#max-today");
  let minTempElement = document.querySelector("#min-today");
  let humidElement = document.querySelector("#humidity-today");
  let feelsElement = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");

  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let feelsLike = Math.round(response.data.main.feels_like);
  let description = response.data.weather[0].description;

  tempElement.innerHTML = `${temperature}°F`;
  cityElement.innerHTML = `${city}`;
  maxTempElement.innerHTML = `High ${max}°F`;
  minTempElement.innerHTML = `Low ${min}°F`;
  humidElement.innerHTML = `Humidity: ${humidity}%`;
  feelsElement.innerHTML = `Feels like ${feelsLike}°F`;
  descriptionElement.innerHTML = `${description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data);
  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

let lastUpdated = document.querySelector("#current-day");
let currentTime = new Date();
lastUpdated.innerHTML = formatDate(currentTime);

let searchButton = document.querySelector("#button-input");
searchButton.addEventListener("click", handleSubmit);

let searchBar = document.querySelector("#search-input");
searchBar.addEventListener("submit", handleSubmit);

search("Austin");
