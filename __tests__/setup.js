import { app, server } from "../index.js";

let serverInstance;

beforeAll(() => {
	// Check if the server is already running
	if (!server.listening) {
		serverInstance = app.listen(5000, () => {
			console.log("Weather server is running on port 5000...");
		});
	}
});

afterAll((done) => {
	if (serverInstance) {
		serverInstance.close(done);
	} else {
		server.close(done);
	}
});

const a = {
	base: "stations",
	clouds: { all: 25 },
	cod: 200,
	coord: { lat: 39.6853, lon: -93.9269 },
	dt: 1713994852,
	id: 4389309,
	main: {
		feels_like: 19.6,
		grnd_level: 988,
		humidity: 42,
		pressure: 1020,
		sea_level: 1020,
		temp: 20.41,
		temp_max: 22.15,
		temp_min: 18.88,
	},
	name: "Hamilton",
	sys: {
		country: "US",
		id: 4042,
		sunrise: 1713957873,
		sunset: 1714006956,
		type: 1,
	},
	timezone: -18000,
	visibility: 10000,
	weather: [
		{
			description: "scattered clouds",
			icon: "03d",
			id: 802,
			main: "Clouds",
		},
	],
	wind: { deg: 110, gust: 1.72, speed: 2.01 },
};
