// GET AND DISPLAY LOCAL TIME IN YOUR BROWSER

let currentTime = new Date();

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

let lastUpdated = document.querySelector("#current-day");
lastUpdated.innerHTML = formatDate(currentTime);

function showCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-input");
  let element = document.querySelector("#current-city");
  element.innerHTML = `${cityInput.value}`;

  let apiKey = "b0a3ae53d6b8668034340ca91d9b9f65";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let feelsLike = Math.round(response.data.main.feels_like);

  let tempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#current-city");
  let maxTempElement = document.querySelector("#max-today");
  let minTempElement = document.querySelector("#min-today");
  let humidElement = document.querySelector("#humidity-today");
  let feelsElement = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#icon");

  tempElement.innerHTML = `${temperature}°F`;
  cityElement.innerHTML = city;
  maxTempElement.innerHTML = `High ${max}°F`;
  minTempElement.innerHTML = `Low ${min}°F`;
  humidElement.innerHTML = `Humidity: ${humidity}%`;
  feelsElement.innerHTML = `Feels like ${feelsLike}°F`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let searchButton = document.querySelector("#button-input");
searchButton.addEventListener("click", showCity);

let searchBar = document.querySelector("#search-input");
searchBar.addEventListener("submit", showCity);
