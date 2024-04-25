import "./setup.js";
import request from "supertest";
import { app } from "../index.js";

describe("GET /geo/:city/:state?/:country?", () => {
	it("should return geo data for valid city", async () => {
		const response = await request(app).get("/geo/New York");
		expect(response.status).toBe(200);
		expect(response.body[0]).toHaveProperty("lat");
		expect(response.body[0]).toHaveProperty("lon");
	});

	it("should return 204 and empty object for invalid city", async () => {
		const response = await request(app).get("/geo/InvalidCity");
		expect(response.status).toBe(404);
		expect(response.body).toEqual([]);
	});

	it("should return 400 for invalid parameters", async () => {
		const response = await request(app).get("/geo/");
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toContain("City name is required!");
	});
});
