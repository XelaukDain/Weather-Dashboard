























//function to get the city
// function getCity(city) {
//     const apiUrl = "http://api.openweathermap.org/geo/1.0/direct";
//     const apiKey = "2a2f858c09f81c75ff38f1e1844655a1";
  
//     // Construct the API URL with the city name and API key
//     const url = `${apiUrl}?q=${city}&limit=1&appid=${apiKey}`;

//     fetch(url)
//         .then((response) => response.json())
//         .then((result) => {
//             console.log(result);
//             const lat = result[0].lat;
//             const lon = result[0].lon;
//             const latHun = Math.round(result[0].lat * 100) / 100;
//             const lonHun = Math.round(result[0].lon * 100) / 100;
//             getWeather(latHun, lonHun);

//         })
//         .catch((error) => console.log("error", error));
// }    


// // Function to fetch weather data from OpenWeather API
// function getWeather(lat, lon) {
//   // API endpoint and API key
//   const apiUrl = "http://api.openweathermap.org/data/2.5/forecast";
//   const apiKey = "2a2f858c09f81c75ff38f1e1844655a1";

//   // Construct the API URL with the city name and API key
//   const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=5&units=imperial`;

//   // Fetch the weather data
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       // Process the weather data and update the UI
//       console.log(data);
//       updateCurrentWeather(data);
//     })
//     .catch((error) => {
//       console.log("Error fetching weather data:", error);
//     });
// }

// // Function to update the current weather UI
// function updateCurrentWeather(data) {
//   // Extract the required data from the API response
//   const cityName = data.city.name;
//   const temperature = data.list[0].main.temp;
//   const humidity = data.list[0].main.humidity;
//   const windSpeed = data.list[0].wind.speed;
//   const uvIndex = data.uvi;

//   // Update the UI with the weather data
//   document.getElementById("current-weather-info").innerHTML = `
//         <h3>${cityName}</h3>
//         <p>Temperature: ${temperature}&deg;F</p>
//         <p>Humidity: ${humidity}%</p>
//         <p>Wind Speed: ${windSpeed} mph</p>
//         <p>UV Index: ${uvIndex}</p>
//     `;
// }

// // Function to handle form submission
// function handleFormSubmit(event) {
//   event.preventDefault();

//   // Get the city input value
//   const city = document.getElementById("city-input").value;

//   // Save the city to local storage
//   localStorage.setItem("lastCity", city);

//   // Call the getWeather function to fetch weather data
//   getCity(city);
// }

// // Function to initialize the Weather Dashboard
// function initWeatherDashboard() {
//   // Get the last searched city from local storage
//   const lastCity = localStorage.getItem("lastCity");

//   // If a last searched city exists, fetch its weather data
// //   if (lastCity) {
// //     getWeather(lastCity);
// //   }

//   // Add event listener to the search form
//   document
//     .getElementById("search-form")
//     .addEventListener("submit", handleFormSubmit);
// }

// // Call the initWeatherDashboard function to initialize the Weather Dashboard
// initWeatherDashboard();
