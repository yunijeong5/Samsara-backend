import { weatherConfig } from "../config.js";

async function fetchAirDataFromAPI(location) {
	const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${weatherConfig.API_KEY}`;
	const fetched = await fetch(url);
	const data = await fetched.json();
	return data;
}

async function fetchWeatherDataFromAPI(location) {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${weatherConfig.API_KEY}`;
	const fetched = await fetch(url);
	const data = await fetched.json();
	return data;
}

export { fetchAirDataFromAPI, fetchWeatherDataFromAPI };
