# Samsara-backend

Backend developer internship assignment for Samsara

## Objective

RESTful API that fetches data from OpenWeatherMap

## Technical requirements

-   Node.js Framework: Express
-   Data Source: OpenWeatherMap
-   Database: Firebase for "caching" geo data from Geocoding API (more on it below)
-   Endpoints: 3 GET request endpoints
    -   `/geo/:city/:state?/:country?`
        -   Returns Geocoding API results for the specified city, state, and country. User can utilize the outputs to formulate their queries for the next two endpoints. Return value is an array of geodata objects.
        -   The result of geo data are cached in Firebase.
    -   `/weather/air/:city/:state?/:country?`
        -   Returns Air Pollution API result for the specified city, state, and country. When the query is too broad (e.g. Just saying "/weather/boston/" is too broad as there are multiple cities with that name), it uses the first latitude and longitude of a location with that name retrieved either from the cached database or (if not cached) the Geocoding API.
    -   `/weather/:city/:state?/:country?`
        -   Returns the current weather data for the specified city, state, and country. When the query is too broad, similar to the air quality endpoint above, it uses cache or Geocoding result to select one location.
    -   Note that for all queries, state and country are optional.
-   Testing:

### Is it really "caching" the results?

No. Once saved, the data stays in the database until it is manually deleted. For a time-sensitive data like weather information, this arguably is a bad approach. The reason is that although Firebase supports TTL (Time To Live) polices for its documents, it is a paid feature at the moment. Hence, for the scope of this assignment, I decided not to implement the true caching functionalities. However, it can easily be done by upgrading the project's billing plan on Firebase Console and creating a TTL policy on Google Cloud Console. Once that setting has been changed, nothing in the source code needs to be updated.

## Bonus Challenges

-   Access Rate Limiter: Used `express-rate-limit` middleware. It allows us to define the maximum number of requests per IP address in a specific time window.

## How to install & run

1. Download this repo (zip or clone)
2. At the root level, run `npm start` in terminal. This starts the server locally at port `5000`.
3. In your browser, type `http://localhost:5000`.
4. According to the endpoint specification, start querying with the three endpoints above. You'll see the query results displayed on your browser.

## How to run tests

1. Download this repo (zip or clone)
2. At the root level, run `npm test` in terminal. This runs Jest tests and prints test result in the console.
