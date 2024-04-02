// tests/index.test.js
import request from "supertest";
import { app, server } from "../index.js";

describe("GET /", () => {
	afterEach((done) => {
		server.close(done);
	});
	it("should return instructions for using the API", async () => {
		const response = await request(app).get("/");
		expect(response.status).toBe(200);
		expect(response.text).toContain("Air Quality endpoint");
		expect(response.text).toContain("Weather endpoint");
		expect(response.text).toContain("Geocoding endpoint");
	});
});
