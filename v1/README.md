# Testing Web Applications

## Demo Resources

There are two versions of the demo code base:

- `demo_app` contains the original project
- `demo_app_refactored` contains the refactored version with testable JavaScript.

### First step
Ensure you have [node.js](http://www.nodejs.org) installed, and then run `npm install` from the repository root directory.

### Demo Server
To start the demo http server, simply run `npm run-script server`.

### End to End tests
To start the **end to end** tests, run either:

- `npm run-script e2e_demo_app` or
- `npm run-script e2e_demo_app_refactored`

### Unit Tests
To execute the unit tests for the `demo_app_refactored` project, run `npm test`.
