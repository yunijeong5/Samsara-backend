import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

// add middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// add routes

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Weather server is running on port ${port}...`);
});
