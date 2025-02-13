const apiKey = "D46CPVKNFXT99B8TCJRBWXNMD";
const locationInput = document.getElementById("location");
const weatherBtn = document.getElementById("get-weather");
const errorText = document.querySelector(".error");
const tempText = document.querySelector(".temp .num");
const feelsLikeText = document.querySelector(".feels-like");
const windText = document.querySelector(".wind");
const humidityText = document.querySelector(".humidity");
const conditionsText = document.querySelector(".conditions");
const locationText = document.querySelector(".location");

const createWeatherRequest = (location) => {
	return new Request(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
			location
		)}?unitGroup=us&key=${apiKey}&contentType=json`
	);
};

// Initial loading of weather map data
async function getWeather(location) {
	try {
		const request = createWeatherRequest(location);
		const response = await fetch(request, { mode: "cors" });
		const weatherData = await response.json();

		// Display the weather data inside the weather map div.
		const address = weatherData.resolvedAddress;
		const conditions = weatherData.currentConditions.conditions;
		const temp = weatherData.currentConditions.temp;
		const feelsLikeTemp = weatherData.currentConditions.feelslike;
		const humidity = weatherData.currentConditions.humidity;
		const windSpeed = weatherData.currentConditions.windspeed;

		return {
			address,
			conditions,
			temp,
			feelsLikeTemp,
			humidity,
			windSpeed,
		};
	} catch (error) {
		errorText.textContent = "Oops! This location does not exist.";
		console.error("Error fetching the weather data:", error);
		return null;
	}
}

async function displayWeather(location) {
	const data = await getWeather(location);

	if (data) {
		errorText.textContent = "";
		locationText.textContent = data.address;
		conditionsText.textContent = data.conditions;
		updateTemperatureDisplay(data.temp, data.feelsLikeTemp);
		windText.textContent = `Current Wind Speeds: ${data.windSpeed}`;
		humidityText.textContent = `Humidity: ${data.humidity}`;
	}
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const location = locationInput.value;
	displayWeather(location);
	locationInput.value = "";
});

const updateTemperatureDisplay = (temp, feelsLike) => {
	tempText.textContent = `${Math.round(temp)}`;
	feelsLikeText.textContent = `Feels Like: ${Math.round(feelsLike)}°F`;
};

// Display the initial location
displayWeather("New York, United States");
