import "./setup.js";
import request from "supertest";
import { app } from "../index.js";

describe("GET /weather/:city/:state?/:country?", () => {
	it("should return 400 for invalid parameters", async () => {
		const response = await request(app).get("/weather/");
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toContain("City name is required!");
	});

	it("should return weather data for valid city", async () => {
		const response = await request(app).get("/weather/New York");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("coord");
		expect(response.body).toHaveProperty("main");
		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("weather");
		// Add assertions for the structure and content of the weather data
	});

	it("should return 404 for invalid city", async () => {
		const response = await request(app).get("/weather/InvalidCity");
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toContain(
			"Invalid city, state, or country"
		);
	});
});

describe("GET /weather/air-quality/:city/:state?/:country?", () => {
	it("should return air quality data for valid city", async () => {
		const response = await request(app).get("/weather/air-quality/boston");
		expect(response.status).toBe(200);
		// Add assertions for the structure and content of the air quality data
	});

	it("should return 204 for invalid city", async () => {
		const response = await request(app).get(
			"/weather/air-quality/InvalidCityName"
		);
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toContain(
			"Invalid city, state, or country"
		);
	});
});
