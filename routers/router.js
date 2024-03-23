import { Router } from "express";
import { config } from "../config.js";

const router = new Router();

router.get("/", (req, res) => {
	res.status(200).send(
		// TODO: add a more meaningful message. TODO for each endpoint, perhaps.
		"Specify the latitude and longitude you'd like to know the weather of in this format: '/weather/:city/:state'"
	);
});

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

export default router;
