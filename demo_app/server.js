var Weather = require('./lib/Weather');
var path    = require('path');
var connect = require('connect');
var express = require('express');
var app     = express();
var server;

// Config
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

// Serve JavaScript and CSS files
app.use(express.static(path.resolve(__dirname, 'static_assets')));

// GET http://localhost:3000
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Home'
  });
});

// GET http://localhost:3000/weather
app.get('/weather/:country/:city', function (req, res) {
  var city    = req.param('city');
  var country = req.param('country');

  var weather = new Weather(city, country);

  weather.temperature().then(function (temp) {
    res.format({
      json: function () {
        res.send({
          title: 'Weather',
          city: city,
          country: country,
          temp: temp,
          last_updated: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
        });
      }
    });
  });
});

server = app.listen(3000, function () {
  console.log('Server is running at %s:%d', server.address().address, server.address().port);
});
