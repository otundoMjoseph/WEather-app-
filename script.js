// Function to fetch weather data from OpenWeatherMap API
function getWeather() {
    const apiKey = 'b3d8ccc8f642d321d288366928f84066'; 
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch current weather data
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    // Fetch hourly forecast data
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

// Function to display current weather information
function displayWeather(data) {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const tempDiv = document.getElementById('tempDiv');
    const weatherInfoDiv = document.getElementById('weatherInfoDiv');
    const weatherIcon = document.getElementById('weatherIcon');

    tempDiv.innerHTML = `<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'block';
}

// Function to display hourly forecast
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourlyForecastDiv');
    const next24hours = hourlyData.slice(0, 8); // Display the first 8 hours

    hourlyForecastDiv.innerHTML = ''; // Clear previous content

    next24hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

// Theme toggle function
const themeSwitch = document.getElementById('themeSwitch');
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});
