// jest.config.js
module.exports = {
	verbose: true,
	transform: {
		"^.+\\.js$": "babel-jest",
	},
	moduleFileExtensions: ["js"],
	testMatch: ["**/__tests__/**/test.js", "**/?(*.)+(spec|test).js"],
};
