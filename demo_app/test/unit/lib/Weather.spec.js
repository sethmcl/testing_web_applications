var proxyquire = require('proxyquire');
var mock       = require('../../mock/mockRequest');
var Weather    = proxyquire('../../../lib/Weather', { request: mock.request });
var assert     = require('assert');

describe('Weather module', function () {
  var weather;

  before(function () {
    weather = new Weather('San Francisco', 'US');
    weather.baseApiUrl = 'http://w.com/?';
  });

  describe('buildApiUrl', function () {
    it('should build correct url', function () {
      var url = weather.buildApiUrl('San Francisco', 'US');

      assert.equal(url, 'http://w.com/?q=San%20Francisco%2CUS');
    });

  });

  describe('kelvinToFahrenheit', function () {
    it('should calculate fahrenheit', function () {
      var f = weather.kelvinToFahrenheit(300);

      assert.equal(f, 80.33);
    });
  });

  describe('kelvinToCelsius', function () {
    it('should calculate celsius', function () {
      var c = weather.kelvinToCelsius(300);

      assert.equal(c, 26.85);
    });
  });

  describe('get temperature', function () {
    var result;

    before(function (done) {
      // @see http://api.openweathermap.org/data/2.5/weather?q=Mountain%20View,us
      var responseBody = JSON.stringify({
        main: {
          temp: 300
        }
      });

      result = weather.temperature();
      mock.requests[0].respond(200, {}, responseBody);
      result.then(function () {
        done();
      });
    });

    it('should only make one request', function () {
      assert.equal(mock.requests.length, 1);
    });

    it('should get the temperature in Kelvin', function (done) {
      result
        .then(function (temp) {
          assert.equal(temp.k, 300);
          done();
        })
        .then(null, done);
    });

    it('should get the temperature in Celsius', function (done) {
      result
        .then(function (temp) {
          assert.equal(temp.c, 26.85);
          done();
        })
        .then(null, done);

    });

    it('should get the temperature in Fahrenheit', function (done) {
      result
        .then(function (temp) {
          assert.equal(temp.f, 80.33);
          done();
        })
        .then(null, done);
    });
  });

});
