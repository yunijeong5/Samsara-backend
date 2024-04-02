import { weatherConfig } from "../config.js";

export async function fetchGeoDataFromAPI(city, state, country) {
	// generate the URL to fetch data from
	const q = [city, state, country].filter((e) => e !== undefined).join(",");
	const geoCodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${weatherConfig.API_KEY}`;
	try {
		const fetchedGeoData = await fetch(geoCodingUrl);
		const geoData = await fetchedGeoData.json();
		return geoData;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to retrieve geo data");
	}
}
