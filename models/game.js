
var mongoose = require('mongoose');


 var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var childSchema = new Schema({ user: 'string', cards_table: 'String', playing_card: 'String'});


var gameSchema = new Schema({
    room_id    : ObjectId,
    //users : [{ name: String,  winning_card_line1:ObjectId, winning_card_line2:ObjectId, winning_card_line3:ObjectId}],
    users : [childSchema],
    title     : String,
    text      : String,
    started   : Boolean,
    completed : Boolean,
    date      : Date,
    //users :   Schema.Types.Mixed
});



var Game = mongoose.model('game', gameSchema);
module.exports = Game;