var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  Main = require('./api/models/mainpageModel'),
  Post = require('./api/models/postModel'),
  bodyParser = require('body-parser'),
  cors = require('cors');

mongoose.connect('mongodb://localhost/marcellidb');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mainpageRoutes = require('./api/routes/mainpageRoutes');
mainpageRoutes(app);

var blogRoutes = require('./api/routes/blogRoutes');
blogRoutes(app);

var baseRoutes = require('./api/routes/baseRoutes');
baseRoutes(app);

app.get('*', function(req, res){
  res.status(404).send('That is not a valid resource');
});


app.listen(port);


console.log('marcellisite RESTful API server started on: ' + port);
