
var mongoose = require('mongoose');


 var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var childSchema = new Schema({ user: 'string', cards_table: 'String', playing_card: 'String', pattern:'String'});


var game75Schema = new Schema({
    room_id    : ObjectId,
    //users : [{ name: String,  winning_card_line1:ObjectId, winning_card_line2:ObjectId, winning_card_line3:ObjectId}],
    users : [childSchema],
    title     : String,
    text      : String,
    started   : Boolean,
    completed : Boolean,
    date      : Date,
    type       : String,
    winner:String,
    hour:Number
    //users :   Schema.Types.Mixed
});
game75Schema.statics.gameStatusStarted = function(boolean, game_id) {
    if(boolean){
        this.findOne({'_id':game_id},  function(err, game){
            if(err){
                console.log(err,'error in updating game started status to - '+boolean+'');
                return;
            }
            game.started = boolean;
            game.save(function(err, data){
                if(err){
                    console.log(err,'could not update game started status to - '+boolean+'');
                    return;
                }
                return true;
            });
        });
    } 
};
game75Schema.statics.gameStatusCompleted = function(boolean, game_id) {
    if(boolean){
        this.findOne({'_id':game_id},  function(err, game){
            if(err){
                console.log(err,'error in updating game status completed to - '+boolean+'');
                return;
            }
            game.completed = boolean;
            game.save(function(err, data){
                if(err){
                    console.log(err,'could not update game status completed  to - '+boolean+'');
                    return;
                }
                return true;
            });
        });
    } 
};


var Game75 = mongoose.model('game75', game75Schema);
module.exports = Game75;