const API_KEY = '9d44f946b87840e49fe30731251501'; // Replace with your actual API key
const BASE_URL = 'https://api.weatherapi.com/v1/'; // Use a reliable weather API endpoint

// Fetch city coordinates (if needed for map later)
async function getCityCoordinates(city) {
  const url = `${BASE_URL}current.json?key=${API_KEY}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (response.status !== 200) {
    throw new Error(data.error.message || 'City not found');
  }
  
  return { lat: data.location.lat, lon: data.location.lon, name: data.location.name };
}

// Fetch weather data for the specified city
async function fetchWeatherData(city) {
  const url = `${BASE_URL}forecast.json?key=${API_KEY}&q=${city}&days=9&hour=1`; // 'days=9' for 8-day forecast, 'hour=1' for hourly data
  const response = await fetch(url);
  const data = await response.json();
  
  if (response.status !== 200) {
    throw new Error(data.error.message || 'Failed to fetch weather data');
  }
  
  return data;
}

// Display current weather data
function displayCurrentWeather(data) {
  const currentWeather = document.getElementById('currentWeather');
  currentWeather.innerHTML = `
    <p><strong>City:</strong> ${data.location.name}</p>
    <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
    <p><strong>Condition:</strong> ${data.current.condition.text}</p>
    <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
  `;
}

// Display hourly forecast data (next 12 hours)
function displayHourlyForecast(hourly) {
  const hourlyForecast = document.getElementById('hourlyForecast');
  hourlyForecast.innerHTML = '<h2>Hourly Forecast</h2>';
  hourly.slice(0, 12).forEach(hour => {
    const time = new Date(hour.time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    hourlyForecast.innerHTML += `
      <div>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Temperature:</strong> ${hour.temp_c}°C</p>
        <p><strong>Condition:</strong> ${hour.condition.text}</p>
      </div>
    `;
  });
}

// Display 8-day forecast data
function displayDailyForecast(daily) {
  const dailyForecast = document.getElementById('dailyForecast');
  dailyForecast.innerHTML = '<h2>8-Day Forecast</h2>';
  daily.forEach(day => {
    const date = new Date(day.date).toLocaleDateString();
    dailyForecast.innerHTML += `
      <div>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Temp:</strong> ${day.day.avgtemp_c}°C (High: ${day.day.maxtemp_c}°C, Low: ${day.day.mintemp_c}°C)</p>
        <p><strong>Condition:</strong> ${day.day.condition.text}</p>
      </div>
    `;
  });
}

// Display the map with the city's location
function displayMap(lat, lon) {
  const map = L.map('leaflet-map').setView([lat, lon], 10);

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add a marker for the city
  L.marker([lat, lon]).addTo(map)
    .bindPopup('<b>' + document.getElementById('cityInput').value + '</b>') // Set city name from input field
    .openPopup();
}

// Handle search button click event
document.getElementById('searchButton').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;
  
  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  try {
    // Fetch weather data for the city
    const weatherData = await fetchWeatherData(city);
    
    // Display current weather data
    displayCurrentWeather(weatherData);

    // Display hourly forecast data
    displayHourlyForecast(weatherData.forecast.forecastday[0].hour); // Hourly forecast for the first day

    // Display 8-day forecast data
    displayDailyForecast(weatherData.forecast.forecastday);

    // Fetch city coordinates for the map
    const { lat, lon, name } = await getCityCoordinates(city);
    
    // Display the map with the city's location
    displayMap(lat, lon);
  } catch (error) {
    console.error('Error fetching the weather data:', error);
    alert('Could not fetch data. Please try again.');
  }
});
