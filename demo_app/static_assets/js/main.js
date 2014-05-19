var widget = new WeatherWidget({
  template   : document.querySelector('[data-template="weather"]').innerHTML,
  viewEl     : document.querySelector('#widget'),
  frequency  : 1000 * 5,
  weatherUrl : '/weather'
});

widget.render();
