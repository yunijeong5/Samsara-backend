import { Router } from "express";
import { weatherConfig } from "../config.js";

const router = new Router();

router.get("/:city/:state", async (req, res) => {
	// extract query parameters
	const { city, state } = req.params;

	// generate URL to fetch data from
	const geoCodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&limit=5&appid=${config.API_KEY}`;

	const fetchedGeoData = await fetch(geoCodingUrl);
	const geoData = await fetchedGeoData.json();

	// TODO: Error handling for invalid city, state info. geoData is [] for such inputs

	// uses the first element if there are multiple cities with the same name in the same state
	const location = geoData[0];

	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${config.API_KEY}`;

	// parse fetched data into JSON format
	const fetched = await fetch(url);
	const data = await fetched.json();

	// TODO: cache result in DB

	// send weather JSON data with success code 200
	res.status(200).json(data);
});

// TODO: add more endpoints
/**
 * Air Pollution API: https://openweathermap.org/api/air-pollution
 * - Get air quality information for a specified location
 *
 * Search cities by name
 * Get weather by postal code
 * 3-hour forecast 5 days for a (city, state)
 *
 * Wrap getting geoData into a function
 *
 */

export default router;
