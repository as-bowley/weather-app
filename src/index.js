import _ from "lodash";
import "./style.scss";

const topContainer = document.querySelector(".locationContainer");
const searchInput = document.querySelector(".searchBar");
const searchButton = document.querySelector(".searchButton");
const errorMessage = document.querySelector("small");
const unitButton = document.querySelector(".switch-button");

let city = "bonn";
let unit = "metric";
let currentMeasurementUnit = "°C";
let url = `http://api.openweathermap.org/data/2.5/weather?q=
  ${city}&APPID=bdb070951f0f52ddf9b0afcfbd4c69de&units=${unit}`;

searchButton.addEventListener("click", changeLocation);
unitButton.addEventListener("click", changeUnits);

async function fetchAndAppendWeather() {
  const weatherData = await getWeather();
  if (weatherData.hasOwnProperty("main")) {
    errorMessage.textContent = "";
    searchInput.value = "";
    topContainer.innerHTML = "";
    createDisplay(weatherData, currentMeasurementUnit);
  } else {
    errorMessage.textContent = "City not found. Please try again.";
  }
}
async function getWeather() {
  const response = await fetch(url, { mode: "cors" });
  const weatherData = await response.json();
  return weatherData;
}

function createDisplay(data, unit) {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container");

  const location = document.createElement("div");
  location.classList.add("locationDiv");
  location.textContent = data.name;

  const temp = document.createElement("div");
  temp.classList.add("tempDiv");
  temp.textContent = Math.floor(data.main.temp) + unit;

  const tempFeelsLike = document.createElement("div");
  tempFeelsLike.classList.add("tempFeelsLike");
  tempFeelsLike.textContent = `Feels like: ${Math.floor(
    data.main.feels_like
  )}${unit}`;

  const humidity = document.createElement("div");
  humidity.classList.add("humidity");
  humidity.textContent = `Humidity: ${data.main.humidity}%`;

  topContainer.appendChild(containerDiv);
  containerDiv.appendChild(location);
  containerDiv.appendChild(temp);
  containerDiv.appendChild(tempFeelsLike);
  containerDiv.appendChild(humidity);
}

function changeLocation() {
  city = searchInput.value;
  url = `http://api.openweathermap.org/data/2.5/weather?q=
  ${city}&APPID=bdb070951f0f52ddf9b0afcfbd4c69de&units=${unit}`;
  fetchAndAppendWeather();
}

function changeUnits() {
  if (unit == "metric") {
    unit = "imperial";
    currentMeasurementUnit = "°F";
    url = `http://api.openweathermap.org/data/2.5/weather?q=
  ${city}&APPID=bdb070951f0f52ddf9b0afcfbd4c69de&units=${unit}`;
  } else {
    unit = "metric";
    currentMeasurementUnit = "°C";
    url = `http://api.openweathermap.org/data/2.5/weather?q=
  ${city}&APPID=bdb070951f0f52ddf9b0afcfbd4c69de&units=${unit}`;
  }
  fetchAndAppendWeather();
}

fetchAndAppendWeather();
