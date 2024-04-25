import { Router } from "express";
import { fetchGeoDataFromAPI } from "../modules/geoData.js";
import { getGeoData, cacheGeoData } from "../utils/db.js";

const router = new Router();

router.get("/", async (req, res) => {
	res.status(400).json({ message: "City name is required!" });
});

// get geographical coordinates (lat, lon) by using name of the location (city name or area name)
// also gets country code of the city.
router.get("/:city/:state?/:country?", async (req, res) => {
	const { city, state, country } = req.params;

	try {
		// get geoDa from DB cache
		let geoDataArr = await getGeoData(city, state, country);

		// if not in cache, get from open weather api
		if (!geoDataArr.length) {
			geoDataArr = await fetchGeoDataFromAPI(city, state, country);
		}
		if (geoDataArr.length) {
			await cacheGeoData(geoDataArr);
			res.status(200).json(geoDataArr);
		} else {
			// no location that fits the query
			res.status(404).json(geoDataArr);
		}
	} catch (error) {
		res.status(500).json({ message: "Failed to retrieve geo data" });
	}
});

export default router;
