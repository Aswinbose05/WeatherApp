const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; 

function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherInfo");
  const temp = (data.main.temp - 273.15).toFixed(1);
  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ Temperature: ${temp} °C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(err => alert("City not found"));
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => displayWeather(data))
        .catch(err => alert("Failed to fetch weather data"));
    });
  } else {
    alert("Geolocation not supported");
  }
}
