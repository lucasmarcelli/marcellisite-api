var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  Task = require('./api/models/mainpageModel'),
  bodyParser = require('body-parser'),
  cors = require('cors');

mongoose.connect('mongodb://localhost/marcellidb');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mainpageRoutes = require('./api/routes/mainpageRoutes');
mainpageRoutes(app);

var baseRoutes = require('./api/routes/baseRoutes');
baseRoutes(app);


app.listen(port);


console.log('marcellisite RESTful API server started on: ' + port);
