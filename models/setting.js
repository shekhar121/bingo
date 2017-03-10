
var mongoose = require('mongoose');


 var Schema = mongoose.Schema;
    //ObjectId = Schema.ObjectId;

//var childSchema = new Schema({ user: 'string', cards_table: 'String', playing_card: 'String', pattern:'String'});


var settingSchema = new Schema({
    //users : [childSchema],
    bingo75_broadcast_msg     : String,
    bingo90_broadcast_msg     : String,

 });



var Setting = mongoose.model('setting', settingSchema);
module.exports = Setting;