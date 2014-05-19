/**
 * @constructor
 * @param {object} config
 * @param config.template - Template source used to render widget (HTML string)
 * @param config.viewEl - The widget's container
 * @param config.frequency - How frequently (in milliseconds) to refresh data from server
 * @param config.weatherUrl - URL to retrieve weather data from
 */
function WeatherWidget(config) {
  this.template   = config.template;
  this.frequency  = config.frequency || 1000 * 10;
  this.weatherUrl = config.weatherUrl;
  this.timeout    = null;

  this.viewEl     = config.viewEl;
  this.formEl     = null;
}

/**
 * @method render
 * @param {object} data
 */
WeatherWidget.prototype.render = function (data) {
  this.viewEl.innerHTML = Mustache.render(this.template, data);
  this.formEl           = this.viewEl.querySelector('[data-role="settings"]')

  if (this.formEl) {
    this.formEl.querySelector('#city').focus();
    this.formEl.addEventListener('submit', this.onFormSubmit.bind(this));
  }
};

/**
 * @method onFormSubmit
 * @param {DOMEvent} e
 */
WeatherWidget.prototype.onFormSubmit = function (e) {
  var city    = this.formEl.querySelector('#city').value;
  var country = this.formEl.querySelector('#country').value;

  this.setLocation(city, country);
  e.preventDefault();
};

/**
 * @method refresh
 */
WeatherWidget.prototype.refresh = function () {
  var url = [this.weatherUrl, this.country, this.city].join('/');

  this.timeout = setTimeout(this.refresh.bind(this), this.frequency);

  return $.getJSON(url)
          .then(function (data) {
            this.render(data);
          }.bind(this));
};

/**
 * @method setLocation
 * @param {string} city
 * @param {string} country
 */
WeatherWidget.prototype.setLocation = function (city, country) {
  this.city    = city;
  this.country = country;

  clearTimeout(this.timeout);
  return this.refresh();
};
