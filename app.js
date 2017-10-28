var http=require('http');
var express=require('express');

var port = 3000;

var lat = null;
var lon = null;

var app = express();

app.get('/location', function(req, res) { 
  res.status(200).send('location: lat ' + lat + '; lon ' + lon); 
});

app.post('/location', function(req, res) { 
  lat = req.query.lat;
  lon = req.query.lon;

  res.status(200).send('new location: lat ' + lat + '; lon ' + lon);
});

app.get('*', function(req, res) { res.status(404).send('Not found'); });

app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Internal server error');
  } else {
    next(err);
  }
});

app.listen(port);

console.log('Service running at port ' + port);
