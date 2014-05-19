/**
 * @venus-library mocha
 * @venus-code ../../../../static_assets/js/WeatherWidget.js
 * @venus-include ../../../../static_assets/components/jquery/dist/jquery.min.js
 * @venus-include ../../../../static_assets/components/mustache/mustache.js
 * @venus-include ../../../helper/bind.shim.js
 * @venus-fixture ../../../fixture/weather.fixture.html
 */
describe('WeatherWidget', function () {
  var widget, clock;

  before(function () {
    clock  = sinon.useFakeTimers();
    widget = new WeatherWidget({
      template   : document.querySelector('#weather-template').innerHTML,
      viewEl     : document.querySelector('#weather-fixture'),
      frequency  : 1000 * 5,
      weatherUrl : '/w'
    });

    sinon.spy(widget, 'refresh');
  });

  it('should have fetched data 10 times', function () {
    widget.refresh();
    clock.tick(widget.frequency * 9);
    expect(widget.refresh.callCount).to.be(10);
  });
});
