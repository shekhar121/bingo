
var mongoose = require('mongoose');


 var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var childSchema = new Schema({ user: 'string', cards_table: 'String', playing_card: 'String', pattern:'String'});


var game90Schema = new Schema({
    room_id    : ObjectId,
    //users : [{ name: String,  winning_card_line1:ObjectId, winning_card_line2:ObjectId, winning_card_line3:ObjectId}],
    users : [childSchema],
    title     : String,
    text      : String,
    started   : Boolean,
    completed : Boolean,
    date      : Date,
    type       : String,
    r1winnerLine1:String,
    r1winnerLine1Card:String,
    r1winnerLine2:String,
    r1winnerLine2Card:String,
    r1winnerLine3:String,
    r1winnerLine3Card:String,
    r2winnerLine1:String,
    r2winnerLine1Card:String,
    r2winnerLine2:String,
    r2winnerLine2Card:String,
    r2winnerLine3:String,
    r2winnerLine3Card:String,
    r3winnerLine1:String,
    r3winnerLine1Card:String,
    r3winnerLine2:String,
    r3winnerLine2Card:String,
    r3winnerLine3:String,
    r3winnerLine3Card:String,
    r4winnerLine1:String,
    r4winnerLine1Card:String,
    r4winnerLine2:String,
    r4winnerLine2Card:String,
    r4winnerLine3:String,
    r4winnerLine3Card:String,
    r5winnerLine1:String,
    r5winnerLine1Card:String,
    r5winnerLine2:String,
    r5winnerLine2Card:String,
    r5winnerLine3:String,
    r5winnerLine3Card:String,
    r6winnerLine1:String,
    r6winnerLine1Card:String,
    r6winnerLine2:String,
    r6winnerLine2Card:String,
    r6winnerLine3:String,
    r6winnerLine3Card:String,
    r7winnerLine1:String,
    r7winnerLine1Card:String,
    r7winnerLine2:String,
    r7winnerLine2Card:String,
    r7winnerLine3:String,
    r7winnerLine3Card:String,
    r8winnerLine1:String,
    r8winnerLine1Card:String,
    r8winnerLine2:String,
    r8winnerLine2Card:String,
    r8winnerLine3:String,
    r8winnerLine3Card:String,
    r9winnerLine1:String,
    r9winnerLine1Card:String,
    r9winnerLine2:String,
    r9winnerLine2Card:String,
    r9winnerLine3:String,
    r9winnerLine3Card:String,
    r10winnerLine1:String,
    r10winnerLine1Card:String,
    r10winnerLine2:String,
    r10winnerLine2Card:String,
    r10winnerLine3:String,
    r10winnerLine3Card:String,
    r11winnerLine1:String,
    r11winnerLine1Card:String,
    r11winnerLine2:String,
    r11winnerLine2Card:String,
    r11winnerLine3:String,
    r11winnerLine3Card:String,
    round:Number,
    hour:Number
    //users :   Schema.Types.Mixed
});
game90Schema.statics.gameStatusStarted = function(boolean, game_id) {
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
game90Schema.statics.gameStatusCompleted = function(boolean, game_id) {
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


var Game90 = mongoose.model('game90', game90Schema);
module.exports = Game90;