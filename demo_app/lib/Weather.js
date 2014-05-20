var querystring = require('querystring');
var q           = require('q');
var request     = require('request');

module.exports = Weather;

/**
 * @constructor
 * @param {string} city - the name of the city to get weather data for
 * @param {string} country - the name of the country to get weather data for
 */
function Weather(city, country) {
  this.apiUrl = this.buildApiUrl(city, country);
}

/**
 * @property baseApiUrl - the root API URL for searching weather data
 */
Weather.prototype.baseApiUrl = 'http://api.openweathermap.org/data/2.5/weather?';

/**
 * @method buildApiUrl
 * @param {string} city - the name of the city to get weather data for
 * @param {string} country - the name of the country to get weather data for
 * @return {string} weather API JSON url
 */
Weather.prototype.buildApiUrl = function (city, country) {
  var location = [city, country].join(',');

  return [this.baseApiUrl, querystring.stringify({ q: location })].join('');
};

/**
 * 
 * @method temperature
 * @return {promise} a promise which resolves with the current temperature
 */
Weather.prototype.temperature = function () {
  var def = q.defer();

  request(this.apiUrl, function (err, response, body) {
    if (err) {
      def.reject(err);
    } else {
      body = JSON.parse(body);

      def.resolve({
        k: body.main.temp,
        f: this.kelvinToFahrenheit(body.main.temp),
        c: this.kelvinToCelsius(body.main.temp)
      });
    }
  }.bind(this));

  return def.promise;
};

/**
 * @method kelvinToFahrenheit
 * @param {number} kelvin - temperature in kelvin
 * @return {number} temperature in fahrenheit
 */
Weather.prototype.kelvinToFahrenheit = function (kelvin) {
  return ((kelvin - 273.15) * 1.8 + 32).toFixed(2);
};

/**
 * @method kelvinToCelsius
 * @param {number} kelvin - temperature in kelvin
 * @return {number} temperature in celsius
 */
Weather.prototype.kelvinToCelsius = function (kelvin) {
  return (kelvin - 273.15).toFixed(2);
};
