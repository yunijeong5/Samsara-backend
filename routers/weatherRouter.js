import { Router } from "express";
import {
	fetchWeatherDataFromAPI,
	fetchAirDataFromAPI,
} from "../modules/weatherData.js";

const router = new Router();

async function fetchGeoDataFromEndpoint(city, state, country) {
	// sent get request to geo Router endpoint
	const q = [city, state, country].filter(Boolean).join("/");
	const url = `http://localhost:5000/geo/${q}`; // this endpoint handles fetching and caching geodata
	try {
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

router.get("/", async (req, res) => {
	res.status(400).json({ message: "City name is required!" });
});

router.get("/air-quality/:city/:state?/:country?", async (req, res) => {
	// extract query parameters and get associated geo data
	const { city, state, country } = req.params;
	try {
		const geoDataArr = await fetchGeoDataFromEndpoint(city, state, country);
		if (geoDataArr.length) {
			// there may be multiple locations with the same name (e.g., London in UK, London in USA)
			// if so, return the first location's air quality data only
			const airData = await fetchAirDataFromAPI(geoDataArr[0]);
			res.status(200).json(airData);
		} else {
			res.status(404).json({
				message: "Invalid city, state, or country",
			});
		}
	} catch (error) {
		console.log(error);
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
			res.status(200).json(weatherData);
		} else {
			res.status(404).json({
				message: "Invalid city, state, or country",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to retrieve weather data" });
	}
});

export default router;
