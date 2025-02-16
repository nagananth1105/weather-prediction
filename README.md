# Weather Prediction Analysis (Next 8 Days)

## Overview
This project is a weather prediction analysis tool that fetches real-time weather data and forecasts for the next 8 days. It displays weather conditions on an interactive map using HTML, CSS, and JavaScript.

## Features
- Displays current weather and 8-day forecast
- Interactive map integration to visualize weather patterns
- Responsive and user-friendly UI
- Fetches real-time data using an external weather API

## Technologies Used
- HTML
- CSS
- JavaScript
- WeatherAPI.com (or any weather API of choice)
- Leaflet.js (for interactive maps)

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/nagananth1105/weather-prediction.git
   ```
2. Navigate to the project folder:
   ```sh
   cd weather-prediction
   ```
3. Open `index.html` in your browser.
4. (Optional) Deploy on a local server:
   ```sh
   npx http-server
   ```

## API Configuration
1. Sign up for an API key from [WeatherAPI.com](https://api.weatherapi.com/v1/).
2. Add the API key to `script.js`:
   ```js
   const apiKey = '9d44f946b87840e49fe30731251501';
   ```

## Usage
- Enter a city name or use geolocation to fetch weather details.
- View weather parameters such as temperature, humidity, wind speed, and conditions.
- Check the weather forecast for the next 8 days.
- Navigate the interactive map to see weather trends in different regions.

## File Structure
```
/weather-prediction
│── index.html      # Main HTML file
│── style.css       # Stylesheet for UI design
│── script.js       # JavaScript for API calls and map integration
│── assets/         # Images and other assets
```

## Future Enhancements
- Add AI-based weather trend predictions.
- Improve UI with animations and better responsiveness.
- Integrate multiple weather data sources for accuracy.

