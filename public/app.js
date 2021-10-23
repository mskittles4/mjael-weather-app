const weatherDisplay = document.querySelector('.weather');
const cityInput = document.querySelector('#city-input');
const weatherForm = document.querySelector('#weather-form');
const iconSpot = document.querySelector('.logo');
const infoContainer = document.querySelector('.info');

//fetch weather data from API
const fetchWeather = async (city) => {
  const url = `/api?q=${city}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '404') {
    alert('City not found');
    return;
  }

  if (data.cod === '401') {
    alert('Invalid API Key');
    return;
  }

  const displayData = {
    city: data.name,
    temp: kelvinToCelsius(data.main.temp),
    desc: data.weather[0].description,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    visibility: visibilityToKm(data.visibility),
    icon: data.weather[0].icon,
  };

  addWeatherToDOM(displayData);
};

//add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
  <h2>Weather in ${data.city}</h2>
  <h3>${data.temp} &deg;C</h3>`;

  iconSpot.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="icon for weather">
  <p>${data.desc}</p>`;

  infoContainer.innerHTML = `<div><p>Pressure</p> <p>${data.pressure} mb</p></div>
  <div><p>Humidity</p> <p>${data.humidity} %</p></div>
  <div><p>Wind</p> <p>${data.wind} km/h</p></div>
  <div><p>Visibility</p> <p>${data.visibility} km</p></div>`;

  cityInput.value = '';
};

//conversion from kelvin to celsius
const kelvinToCelsius = (temp) => {
  return Math.floor(temp - 273.15);
};

//visibility in km
const visibilityToKm = (unit) => {
  return Math.floor(unit / 1000);
};

//event listener for form
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (cityInput.value === '') {
    alert('Please enter a city name');
  } else {
    fetchWeather(cityInput.value);
  }
});

// initial fetch
fetchWeather('Galati');
