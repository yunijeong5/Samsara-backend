import { Router } from "express";
import { fetchGeoDataFromAPI } from "../modules/geoData.js";
import { getGeoData, cacheGeoData } from "../utils/db.js";

const router = new Router();

// get geographical coordinates (lat, lon) by using name of the location (city name or area name)
// also gets country code of the city.
router.get("/:city/:state?/:country?", async (req, res) => {
	const { city, state, country } = req.params;

	try {
		let geoData = await getGeoData(city, state, country);
		if (!geoData.length) {
			geoData = await fetchGeoDataFromAPI(city, state, country);
			if (geoData.length) {
				await cacheGeoData(geoData);
			}
		}
		res.json(geoData);
	} catch (error) {
		res.status(500).json({ message: "Failed to retrieve geo data" });
	}
});

export default router;
