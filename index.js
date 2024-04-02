import express from "express";

// middlewares
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// router for code organization
import weatherRouter from "./routers/weatherRouter.js";
import geoRouter from "./routers/geoRouter.js";

const app = express();

// rate limiter setup
// FYI: OpenWeather's free API supports 60 calls/minute
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // upper limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP. Please try again later.",
});

// add middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(limiter);

// add routes
app.get("/", (req, res) => {
	res.status(200).send(
		"<p>Air Quality endpoint: '/weather/air/:city/:state?/:country?'</p><p>Weather endpoint: '/weather/:city/:state?/:country?'</p><p>Geocoding endpoint: '/geo/:city/:state?/:country?'</p><p>For all endpoints, state and country are optional but they help you get more precise information</p>"
	);
});
app.use("/weather", weatherRouter);
app.use("/geo", geoRouter);

// start server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
	console.log(`Weather server is running on port ${port}...`);
});

export { app, server };
