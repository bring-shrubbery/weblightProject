//

//import mongoose and create Chema and ObjectID objects
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//light bulb schema
var lightBulbSchema = new Schema({
  _id: ObjectId,
  //name
  ident: String,
  name: String,
   //current rgb values
  r: Number,
  g: Number,
  b: Number,
  //light presets storage
  lightPresets: [{r: Number, g:Number, b:Number}],
  onTimes: [],
  offTimes: []
}, {
  //specify what collection we want to get light bulb from
  collection: 'lightBulb'
});

//switch schema
var switchSchema1 = new Schema({
  _id: ObjectId,
  //name
  ident: String,
  name: String,
  //state of the switch
  state: Number,
  //name of the device that is being controlled by the switch
  slaveid: String,
  onTimes: [],
  offTimes: []
}, {
  //specify what collection we want to get switch from
  collection: 'switch'
});

//plug schema
var plugSchema1= new Schema({
  _id: ObjectId,
  //name
  ident: String,
  name: String,
  //state of the plug
  state: Number,
  onTimes: [],
  offTimes: []
}, {
  collection: 'plug'
});

//light bulb, switch and plug models for mongoose
var lightBulbModel = mongoose.model('lightBulb', lightBulbSchema);
var switchModel1 = mongoose.model('switch', switchSchema1);
var plugModel1 = mongoose.model('plug', plugSchema1);

module.exports.lightModel = lightBulbModel;
module.exports.switchModel = switchModel1;
module.exports.plugModel = plugModel1;