import { Router } from "express";
import {
	fetchWeatherDataFromAPI,
	fetchAirDataFromAPI,
} from "../modules/weatherData.js";

import axios from "axios";

const router = new Router();

async function fetchGeoDataFromEndpoint(city, state, country) {
	// sent get request to geo Router endpoint
	const q = [city, state, country].filter(Boolean).join("/");
	const url = `http://localhost:5000/geo/${q}`; // this endpoint handles fetching and caching geodata
	const res = await axios.get(url);
	return res.data;
}

router.get("/air/:city/:state?/:country?", async (req, res) => {
	// extract query parameters and get associated geo data
	const { city, state, country } = req.params;
	try {
		const geoDataArr = await fetchGeoDataFromEndpoint(city, state, country);
		if (geoDataArr.length) {
			// there may be multiple locations with the same name (e.g., London in UK, London in USA)
			// if so, return the first location's air quality data only
			const airData = await fetchAirDataFromAPI(geoDataArr[0]);
			res.json(airData);
		} else {
			console.log("Invalid city, state, or country");
			res.json([]);
		}
	} catch (error) {
		res.status(500).json({
			message: "Failed to retrieve air quality data",
		});
	}
});

router.get("/:city/:state?/:country?", async (req, res) => {
	// extract query parameters
	const { city, state, country } = req.params;
	try {
		const geoDataArr = await fetchGeoDataFromEndpoint(city, state, country);
		if (geoDataArr.length) {
			const weatherData = await fetchWeatherDataFromAPI(geoDataArr[0]);
			res.json(weatherData);
		} else {
			console.log("Invalid city, state, or country");
			res.json({});
		}
	} catch (error) {
		res.status(500).json({ message: "Failed to retrieve weather data" });
	}
});

export default router;
