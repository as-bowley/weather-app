import _ from "lodash";
import "./style.scss";

const topContainer = document.querySelector(".topContainer");
const url =
  "http://api.openweathermap.org/data/2.5/weather?q=Bonn&APPID=bdb070951f0f52ddf9b0afcfbd4c69de&units=metric";

async function fetchAndAppendWeather() {
  const weatherData = await getWeather();
  const dataDisplay = createDisplay(weatherData);
}

async function getWeather() {
  const response = await fetch(url, { mode: "cors" });
  const weatherData = await response.json();
  return weatherData;
}

function createDisplay(data) {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container");

  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = data.name;

  const temp = document.createElement("div");
  temp.classList.add("tempDiv");
  temp.textContent = data.main.temp;

  topContainer.appendChild(containerDiv);
  containerDiv.appendChild(title);
  containerDiv.appendChild(temp);
}

fetchAndAppendWeather();
