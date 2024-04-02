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
    -   `/weather/air/:city/:state?/:country?`
    -   `/weather/:city/:state?/:country?`
-   Testing:

### Is it really "caching" the results?

No. Once saved, the data stays in the database until it is manually deleted. For a time-sensitive data like weather information, this arguably is a bad approach. The reason is that although Firebase supports TTL (Time To Live) polices for its documents, it is a paid feature at the moment. Hence, for the scope of this assignment, I decided not to implement the true caching functionalities. However, it can easily be done by upgrading the project's billing plan on Firebase Console and creating a TTL policy on Google Cloud Console. Once that setting has been changed, nothing in the source code needs to be updated.

## Bonus Challenges

-   Access Rate Limiter: Used `express-rate-limit` middleware. It allows us to define the maximum number of requests per IP address in a specific time window.
-   (Maybe authentication)

## How to install & run

```
insert command to start the server
```

## How to run tests

```
insert command to run tests
```
