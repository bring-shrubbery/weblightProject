var express = require('express');
var app = express();
var https = require('https');
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const mongoose = require('mongoose');
var databaseUrl = "mongodb://localhost:27017/weblightDatabase";
mongoose.connect(databaseUrl);
console.log(databaseUrl);
mongoose.set('debug', true);

var bodyParser = require('body-parser');

var lightBulbModel = require('./models/mongooseModels.js').lightModel;
var switchModel = require('./models/mongooseModels.js').switchModel;
var plugModel = require('./models/mongooseModels.js').plugModel;

var lightArray;
var switchArray;
var playArray;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected');

  //load everything
  loadLights();
  loadSwitches();
  loadPlugs();
});

function loadLights() {
  lightBulbModel.find().then(function(lightInstances) {
    lightArray = lightInstances;
    console.log(lightArray);
  });
}
function loadSwitches() {
  switchModel.find().then(function(switchInstances) {
    switchArray = switchInstances;
    console.log(switchArray);
  });
}
function loadPlugs() {
  plugModel.find().then(function(plugInstances) {
    plugArray = plugInstances;
    console.log(plugArray);
  });
}


//define public folder of node.js server
app.use(express.static(__dirname + "/public"));
//json thing
app.use(bodyParser.json());

//redirect to index.html when basic addres is entered
app.get('/', function(req, res){
  res.redirect('index.html');
});

//get database stuff
app.get('/getLights', function(req, res) {
  loadLights();

  res.type('application/json');
  res.write(JSON.stringify(lightArray));
  res.end();
});
app.get('/getSwitches', function(req, res) {
  loadSwitches();

  res.type('application/json');
  res.write(JSON.stringify(switchArray));
  res.end();
});
app.get('/getPlugs', function(req, res) {
  loadPlugs();

  res.type('application/json');
  res.write(JSON.stringify(plugArray));
  res.end();
});

app.post('/setLights', function(req, res) {
  lightArray = req.body;
  
  for(light in lightArray) {
    console.log(lightArray[light]);
    lightBulbModel.findByIdAndUpdate(lightArray[light]._id, lightArray[light], function(err, result){
      if(err){
          console.log(err);
      }
      console.log("RESULT: " + result);
    });
  }
});

app.post('/setSwitches', function(req, res) {
  switchArray = req.body;
  
  for(switchElement in switchArray) {
    console.log(switchArray[switchElement]);
    switchModel.findByIdAndUpdate(switchArray[switchElement]._id, switchArray[switchElement], function(err, result){
      if(err){
          console.log(err);
      }
      console.log("RESULT: " + result);
    });
  }
});

app.post('/setPlugs', function(req, res) {
  plugArray = req.body;
  
  for(plug in plugArray) {
    console.log(plugArray[plug]);
    plugModel.findByIdAndUpdate(plugArray[plug]._id, plugArray[plug], function(err, result){
      if(err){
          console.log(err);
      }
      console.log("RESULT: " + result);
    });
  }
});

//host local server
var server = app.listen(3000, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://" + host +":" + port);
})
