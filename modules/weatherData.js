import { weatherConfig } from "../config.js";
import { fetchGeoDataFromAPI } from "../modules/geoData.js";

async function fetchWeatherDataFromAPI(geoData) {
	// const geoData = await fetchGeoDataFromAPI(city, state, country);
	const weatherReports = [];
	// there may be multiple locations with the same name (e.g., London in UK, London in USA)
	// if so, return all location's weather information
	for (let location of geoData) {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${weatherConfig.API_KEY}`;

		// parse fetched data into JSON format
		const fetched = await fetch(url);
		const data = await fetched.json();
		weatherReports.push(data);
	}
	return weatherReports;
}

async function fetchAirDataFromAPI(geoData) {
	// const geoData = await fetchGeoDataFromAPI(city, state, country);
	console.log(geoData);
	const airReports = [];
	for (let location of geoData) {
		const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${weatherConfig.API_KEY}`;

		// parse fetched data into JSON format
		const fetched = await fetch(url);
		const data = await fetched.json();
		airReports.push(data);
	}
	return airReports;
}

export { fetchWeatherDataFromAPI, fetchAirDataFromAPI };
