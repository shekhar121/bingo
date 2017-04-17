
var mongoose = require('mongoose');


 var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var childSchema = new Schema({ user: 'string', cards_table: 'String', playing_card: 'String', pattern:'String'});


var gameSchema = new Schema({
    room_id    : ObjectId,
    //users : [{ name: String,  winning_card_line1:ObjectId, winning_card_line2:ObjectId, winning_card_line3:ObjectId}],
    users : [childSchema],
    title     : String,
    text      : String,
    started   : Boolean,
    completed : Boolean,
    date      : Date,
    type       : String,
    winnerLine1:String,
    winnerLine1Card:String,
    winnerLine2:String,
    winnerLine2Card:String,
    winnerLine3:String,
    winnerLine3Card:String,
    //users :   Schema.Types.Mixed
});
gameSchema.statics.gameStatusStarted = function(boolean, game_id) {
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
gameSchema.statics.gameStatusCompleted = function(boolean, game_id) {
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


var Game = mongoose.model('game', gameSchema);
module.exports = Game;