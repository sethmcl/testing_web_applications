/**
 * @venus-library mocha
 * @venus-code WeatherWidget.js
 * @venus-include lib/jquery.js
 * @venus-fixture weather.html
 */
describe('WeatherWidget', function () {
  it('should have fetched data 10 times', function () {
    var widget = new WeatherWidget();

    widget.refresh();
    expect(widget.data.status).to.be('success');
  });
});
