# Url-shortener
[![Build Status](https://travis-ci.com/ematan/url-shortener.svg?branch=main)](https://travis-ci.org/ematan/url-shortener)


## Instructions:

1. Create a `.env` file with at least following:
    ```sh
    MONGODB_URI=url (with credentials & db name)
    PORT=port
    ```
    (variables are also expanded)

2.  install dependencies
    ```sh
    ❯ npm install
    ```
3. run the app
    ```sh
    ❯ npm start
    ```


## Testing:
For testing purposes the TTL has been reduced to 60 seconds.

To run all tests (will take several minutes due to forced sleep between tests):

```sh
❯ npm run test
```

To run tests excluding ttl:

```sh
❯ npm run test [testname...]
```

Example:

```sh
❯ npm run test test/unit-tests.test.js test/integration-tests.test.js
```
(or just the path of a single test)