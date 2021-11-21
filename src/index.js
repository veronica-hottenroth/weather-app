function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let element = document.querySelector("#current-city");
  element.innerHTML = `${cityInput.value}`;

  let apiKey = "b0a3ae53d6b8668034340ca91d9b9f65";
  let units = "metric";
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

  temp.innerHTML = `${temperature}°C`;
  element.innerHTML = city;
  maxTemp.innerHTML = `${max}°C`;
  minTemp.innerHTML = `${min}°C`;
  humid.innerHTML = `Humidity ${humidity}%`;
  feels.innerHTML = `<small> Feels like ${feelsLike}°C</small>`;
}

let searchButton = document.querySelector("#button-input");
searchButton.addEventListener("click", showCity);

let searchBar = document.querySelector("#search-input");
searchBar.addEventListener("submit", showCity);

// Show the current time ///

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
  return `${day} ${currentHour}:${currentMinute}`;
}
let dateSubtitle = document.querySelector("#current-day");

dateSubtitle.innerHTML = formatDate(currentTime);

// Week 3 Homework
/* 
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};

let city = prompt("Enter city");
city = city.toLowerCase().trim();
if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let cTemp = Math.round(temperature);
  let fTemp = Math.round((temperature * 9) / 5 + 32);
  let humidity = weather[city].humidity;
  alert(
    `It is currently  ${cTemp}°C (${fTemp}°F) in ${city[0].toUpperCase()}${city.slice(
      1
    )} with a humidity of ${humidity} %`
  );
} else {
  alert(
    `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
*/
