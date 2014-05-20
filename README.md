# Testing Web Applications

Slide deck: http://www.slideshare.net/sethmcl/testing-web-applications-34887514

## Demo Resources

`demo_app` contains the sample weather app project

### First step
Ensure you have [node.js](http://www.nodejs.org) installed, and then run `npm install` from the `demo_app` directory.

### Demo Server
To start the demo server, simply run `npm start`

### End to End tests
The end to end tests are written with the Nightwatch.js library. The code for the tests can be found in
`test/end_to_end/boston.js`.

You can run the tests with the command:

```bash
npm run-script e2e
```
_Note: You must have Firefox installed_


### Unit Tests (server side code)
The unit tests for server side code are written using the Mocha library. Test source code is located in `test/unit/lib/Weather.spec.js`.

You can run the tests with the command:

```bash
npm test
```

### Unit Tests (client side code)
The unit tests for client side code are written using the Venus.js framework, and utilize the Mocha library. Test source code is located in `test/unit/static_assets/js/WeatherWidget.spec.js`.

You can run the tests with the command:

```bash
npm run-script test-browser
```
