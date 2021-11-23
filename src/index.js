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

  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let feelsLike = Math.round(response.data.main.feels_like);

  tempElement.innerHTML = `${temperature}°F`;
  cityElement.innerHTML = `${city};`;
  maxTempElement.innerHTML = `High ${max}°F`;
  minTempElement.innerHTML = `Low ${min}°F`;
  humidElement.innerHTML = `Humidity: ${humidity}%`;
  feelsElement.innerHTML = `Feels like ${feelsLike}°F`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
