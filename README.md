# Url-shortener
[![Build Status](https://travis-ci.com/ematan/url-shortener.svg?branch=main)](https://travis-ci.org/ematan/url-shortener)


## Instructions:

1. Create a `.env` file with at least following:

	> MONGODB_URI=url( with credentials & db name)
	> PORT=port

	(variables are also expanded)

2.  install dependencies
	> npm install
3. run the app
	> npm start



## Testing:
For testing purposes the TTL has been reduced to 60 seconds (instead of 7 days)

To run all tests (will take several minutes due to forced sleep between tests):
> npm testTTL

To run tests excluding ttl:
> npm test -- test/unit-tests.test.js test/integration-tests.test.js

(or just the path of a single test)