// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { firebaseConfig } from "../config.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testDB(db) {
	const citiesCol = collection(db, "city-state");
	const citySnapshot = await getDocs(citiesCol);
	const cityList = citySnapshot.docs.map((doc) => doc.data());
	console.log(cityList);
}

testDB(db);
