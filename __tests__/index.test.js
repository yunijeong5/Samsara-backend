import "./setup.js";
import request from "supertest";
import { app } from "../index.js";

describe("GET /", () => {
	it("should return instructions for using the API", async () => {
		const response = await request(app).get("/");
		expect(response.status).toBe(200);
		expect(response.text).toContain("Air Quality endpoint");
		expect(response.text).toContain("Weather endpoint");
		expect(response.text).toContain("Geocoding endpoint");
	});
});

describe("404 Error Handling", () => {
	it("should return 404 for non-existing routes", async () => {
		const response = await request(app).get("/nonexistingroute");
		expect(response.status).toBe(404);
	});
});
