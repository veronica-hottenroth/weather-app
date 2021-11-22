function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let element = document.querySelector("#current-city");
  element.innerHTML = `${cityInput.value}`;

  let apiKey = "b0a3ae53d6b8668034340ca91d9b9f65";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let feelsLike = Math.round(response.data.main.feels_like);

  let temp = document.querySelector("#current-temp");
  let element = document.querySelector("#current-city");
  let maxTemp = document.querySelector("#max-today");
  let minTemp = document.querySelector("#min-today");
  let humid = document.querySelector("#humidity-today");
  let feels = document.querySelector("#feels-like");

  temp.innerHTML = `${temperature}°F`;
  element.innerHTML = city;
  maxTemp.innerHTML = `High ${max}°F`;
  minTemp.innerHTML = `Low ${min}°F`;
  humid.innerHTML = `Humidity: ${humidity}%`;
  feels.innerHTML = `Feels like ${feelsLike}°F`;
}

let searchButton = document.querySelector("#button-input");
searchButton.addEventListener("click", showCity);

let searchBar = document.querySelector("#search-input");
searchBar.addEventListener("submit", showCity);

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
let dateSubtitle = document.querySelector("#current-day");

dateSubtitle.innerHTML = formatDate(currentTime);
