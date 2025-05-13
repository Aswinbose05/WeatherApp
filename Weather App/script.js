const apiKey = "2dccee941580a6fc20765cfa2007d26a"; 

function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherInfo");
  const temp = data.main.temp.toFixed(1); // Already in Celsius
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
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        alert("City not found: " + data.message);
      }
    })
    .catch(err => alert("Error fetching weather data"));
}


function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          if (data.cod === 200) {
            displayWeather(data);
          } else {
            alert("Error: " + data.message);
          }
        })
        .catch(err => alert("Failed to fetch weather data"));
    });
  } else {
    alert("Geolocation not supported");
  }
}
