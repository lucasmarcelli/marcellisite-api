var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  Main = require('./site/models/mainpage'),
  Post = require('./site/models/post'),
  User = require('./site/models/user'),
  Tokens = require('./site/models/tokens'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  schedule = require('node-schedule'),
  heartdataGenerator = require('./site/utils/heartdataGenerator');

mongoose.connect('mongodb://localhost/marcellidb');
mongoose.Promise = global.Promise;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mainpageRoutes = require('./site/routes/mainpage');
mainpageRoutes(app);

var blogRoutes = require('./site/routes/blog');
blogRoutes(app);

var baseRoutes = require('./site/routes/base');
baseRoutes(app);

var authRoutes = require('./site/routes/auth');
authRoutes(app);

var heartrateRoutes = require('./site/routes/heartrate');
heartrateRoutes(app);

app.get('*', function(req, res){
  res.status(404).send('That is not a valid resource');
});


app.listen(port);

heartdataGenerator.generate();

var rule = new schedule.RecurrenceRule();

// rule.minute = 0;
// rule.hour = [6, 18];
// //rule.second =  new schedule.Range(0, 59);
//
// var update = schedule.scheduleJob(rule, function(){
//   heartScraper.request_heart_data();
// });



console.log('marcellisite RESTful API server started on: ' + port);
