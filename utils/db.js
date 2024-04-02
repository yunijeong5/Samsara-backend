import validator from "validator";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	query,
	where,
	addDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../config.js";
import axios from "axios";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// helper function to capitalize first letter of each word in a string
const capitalizeWords = (str) => {
	const capitalizedStr = str.split(" ").map((s) => {
		if (s.length > 0) {
			return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
		} else {
			return "";
		}
	});

	return capitalizedStr.join(" ");
};

// Get data from db
async function getGeoData(city, state, country) {
	try {
		const cityName = capitalizeWords(city);
		const geoCollection = collection(db, "geo");
		let q = undefined;

		if (state && country) {
			q = query(
				geoCollection,
				where("name", ">=", cityName),
				where("name", "<=", cityName + "\uf8ff"),
				where("state", "==", capitalizeWords(state)),
				where("country", "==", country.toUpperCase())
			);
		} else if (state && !country) {
			// state is country code
			if (validator.isISO31661Alpha2(state.toUpperCase())) {
				q = query(
					geoCollection,
					where("name", ">=", cityName),
					where("name", "<=", cityName + "\uf8ff"),
					where("country", "==", state.toUpperCase())
				);
			}
			// state is state (as in US states)
			else {
				q = query(
					geoCollection,
					where("name", ">=", cityName),
					where("name", "<=", cityName + "\uf8ff"),
					where("state", "==", capitalizeWords(state))
				);
			}
		} else {
			q = query(
				geoCollection,
				where("name", ">=", cityName),
				where("name", "<=", cityName + "\uf8ff")
			);
		}

		const snapshot = await getDocs(q);
		return snapshot.docs.map((doc) => doc.data());
	} catch (error) {
		console.log(error);
		throw new Error("Failed to retrieve geo data");
	}
}

async function cacheGeoData(geoDataArr) {
	try {
		const geoCollection = collection(db, "geo");
		geoDataArr.map(async (geoDataObject) => {
			await addDoc(geoCollection, geoDataObject);
		});
	} catch (error) {
		console.log(error);
		throw new Error("Failed to cache geo data");
	}
}

async function getWeatherData(city, state, country) {
	try {
		// sent get request to geo Router endpoint
		const q = [city, state, country].filter(Boolean).join("/");
		const url = `http://localhost:5000/geo/${q}`;
		const res = await axios.get(url);
		const geoData = res.data;

		// check weather collection by comparing latitude and longitude
	} catch (error) {
		console.error("Error retrieving weather data:", error);
		throw new Error("Failed to retrieve weather data");
	}
}

export { getGeoData, cacheGeoData };
