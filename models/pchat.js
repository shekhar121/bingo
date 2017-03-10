
var mongoose = require('mongoose');


 var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var childSchema = new Schema({ user: 'string', cards_table: 'String', playing_card: 'String', pattern:'String'});


var pchatSchema = new Schema({
    //room_id    : ObjectId,
    //users : [{ name: String,  winning_card_line1:ObjectId, winning_card_line2:ObjectId, winning_card_line3:ObjectId}],
    //users : [childSchema],
    sender     : String,
    receiver    : String,
    msg     : String,
    read    : Boolean,
    date      : Date,
    //type       : String
    //users :   Schema.Types.Mixed
});



var Pchat = mongoose.model('pchat', pchatSchema);
module.exports = Pchat;