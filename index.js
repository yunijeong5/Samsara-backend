import express from "express";

// middlewares
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// router for code organization
import weatherRouter from "./routers/weatherRouter.js";

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
// app.use(limiter);

// add routes
app.get("/", (req, res) => {
	res.status(200).send(
		// TODO: add a more meaningful message. TODO for each endpoint, perhaps.
		"Specify the latitude and longitude you'd like to know the weather of in this format: '/weather/:city/:state'"
	);
});
app.use("/weather", weatherRouter);

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Weather server is running on port ${port}...`);
});
