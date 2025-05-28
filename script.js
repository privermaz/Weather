const apiKey = "be81c6c588cf4f9e80e84651252805";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.current) {
      weatherInfo.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>🌡️ Temp: ${data.current.temp_c}°C</p>
        <p>☁️ Condition: ${data.current.condition.text}</p>
        <img src="https:${data.current.condition.icon}" alt="weather icon">
        <p>💨 Wind: ${data.current.wind_kph} km/h</p>
        <p>🕒 Last Updated: ${data.current.last_updated}</p>
      `;
    } else {
      weatherInfo.innerHTML = `<p>City not found!</p>`;
    }
  } catch (error) {
    weatherInfo.innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
  }
}
