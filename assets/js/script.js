function initWeatherDashboard() {
  // Get the last searched city from local storage
  const lastCity = localStorage.getItem("lastCity");

  // If a last searched city exists, fetch its weather data
  if (lastCity) {
    getCity(lastCity);
  }

  // Add event listener to the search form
  document
    .getElementById("search-form")
    .addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault();

  // Get the city input value
  const city = document.getElementById("city-input").value;

  // Save the city to local storage
  localStorage.setItem("lastCity", city);

  // Get the recent searches array from local storage
  const recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  

  // Add the current city to the recent searches array
  recentSearches.push(city);

  // Limit the recent searches array to the last 5 cities
  const limitedRecentSearches = recentSearches.slice(-5);

  // Save the updated recent searches array back to local storage
  localStorage.setItem("recentSearches", JSON.stringify(limitedRecentSearches));

  // Call the getWeather function to fetch weather data
  getCity(city);
}

function getCity(city) {
  const apiUrl = "http://api.openweathermap.org/geo/1.0/direct";
  const apiKey = "2a2f858c09f81c75ff38f1e1844655a1";

  // Construct the API URL with the city name and API key
  const url = `${apiUrl}?q=${city}&limit=1&appid=${apiKey}`;

  fetch(url)
      .then((response) => response.json())
      .then((result) => {
          console.log(result);
          const lat = result[0].lat;
          const lon = result[0].lon;
          const latHun = Math.round(result[0].lat * 100) / 100;
          const lonHun = Math.round(result[0].lon * 100) / 100;
          getWeather(latHun, lonHun);

      })
      .catch((error) => console.log("error", error));
}

// Function to fetch weather data from OpenWeather API
function getWeather(lat, lon) {
  // API endpoint and API key
  const apiUrl = "http://api.openweathermap.org/data/2.5/forecast";
  const apiKey = "2a2f858c09f81c75ff38f1e1844655a1";

  // Construct the API URL with the city name and API key
  const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  // Fetch the weather data
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Process the weather data and update the UI
      console.log(data);
      updateCurrentWeather(data);
      updateForecast(data);
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
    });
}

// Function to update the current weather UI
function updateCurrentWeather(data) {
  // Extract the required data from the API response
  const cityName = data.city.name;
  const temperature = data.list[0].main.temp;
  const humidity = data.list[0].main.humidity;
  const windSpeed = data.list[0].wind.speed;

  // Update the UI with the weather data
  document.getElementById("current-weather-info").innerHTML = `
        <h3>${cityName}</h3>
        <p>Temperature: ${temperature}&deg;F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} mph</p>
    `;
}

// Function to update the forecast UI
function updateForecast(data) {


    // Create a card for each forecast data
    const forecastContainer = document.getElementById("five-day-weather-info");
    forecastContainer.innerHTML = "";

    for (let i = 0; i < 40; i += 8) {
      const forecastDate = data.list[i].dt_txt;
      const forecastMaxTemp = data.list[i].main.temp_max;
      const forecastMinTemp = data.list[i].main.temp_min;
      const forecastHumidity = data.list[i].main.humidity;
      const forecastIcon = data.list[i].weather[0].icon;
      const forecastDescription = data.list[i].weather[0].description;
      const forecastWind = data.list[i].wind.speed;

      const forecastIconUrl = `http://openweathermap.org/img/w/${forecastIcon}.png`;

      const card = document.createElement("div");
      card.classList.add("day");

      const cardContent = `
        <h5>${forecastDate}</h5>
        <img src="${forecastIconUrl}" alt="${forecastDescription}">
        <h4>Temperature:</h4>
        <h6>High: ${forecastMaxTemp}&deg;F</h6>
        <h6>Low: ${forecastMinTemp}&deg;F</h6>
        <h4>Humidity:</h4>
        <h5>${forecastHumidity}%</h5>
        <h4>Wind Speed:</h4>
        <h5>${forecastWind} Mph</h5
      `;

      card.innerHTML = cardContent;
      forecastContainer.appendChild(card);
    }
  }

  function recentSearches() {
    // Get the recent searches array from local storage
    const Searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    const recentSearches = Searches.slice(-5);

    // Get the recent searches container
    const recentSearchesContainer = document.getElementById("popular-searches");

    for (let i = 0; i < recentSearches.length; i++) {
      const city = recentSearches[i];
      const button = document.createElement("button");
      button.textContent = city;
      button.addEventListener("click", () => getCity(city));
      recentSearchesContainer.appendChild(button);
    }
  }




// Call the initWeatherDashboard function to initialize the Weather Dashboard
initWeatherDashboard();
recentSearches();