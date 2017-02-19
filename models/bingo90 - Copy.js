var Game = require('./game');
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createCards(obj){  
    for (var i=0; i<obj.cards; i++) {
        obj.card_name['card_'+i+'_square0'] = 0;
        obj.card_name['card_'+i+'_square2'] = 0;
        obj.card_name['card_'+i+'_square3'] = 0;
        obj.card_name['card_'+i+'_square7'] = 0;
        obj.card_name['card_'+i+'_square8'] = 0;

        obj.card_name['card_'+i+'_square11'] = 0;
        obj.card_name['card_'+i+'_square12'] = 0;
        obj.card_name['card_'+i+'_square14'] = 0;
        obj.card_name['card_'+i+'_square15'] = 0;
        obj.card_name['card_'+i+'_square16'] = 0;

        obj.card_name['card_'+i+'_square20'] = 0;
        obj.card_name['card_'+i+'_square21'] = 0;
        obj.card_name['card_'+i+'_square23'] = 0;
        obj.card_name['card_'+i+'_square25'] = 0;
        obj.card_name['card_'+i+'_square28'] = 0;
    }
    //console.log(obj.card_name);
}

var Bingo90 = function(cards, pattern){
	this.cards = cards;
	this.pattern = pattern;
	this.card_name = {};

	this.sayHello = function(){
		return 'Hello' + this.cards;
	}
    this.getRandomInt = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this.getCard_name = function () {
      return this.card_name;
    }
	this.newCards = function(){
        createCards(this);
		var table = '';
        var nm = 0;
		if(this.cards > 0){
            for(var i=0; i < this.cards; i++) {
                
                var num0 = this.getRandomInt(1, 10);
                this.card_name['card_'+i+'_square0'] = num0;
                var num2 = this.getRandomInt(21, 30);
                this.card_name['card_'+i+'_square2'] = num2;
                var num3 = this.getRandomInt(31, 40);
                this.card_name['card_'+i+'_square3'] = num3;
                var num7 = this.getRandomInt(71, 80);
                this.card_name['card_'+i+'_square7'] = num7;
                var num8 = this.getRandomInt(81, 90);
                this.card_name['card_'+i+'_square8'] = num8;

                var num11 = this.getRandomInt(11, 20);
                this.card_name['card_'+i+'_square11'] = num11;
                var num12 = this.getRandomInt(21, 30);
                this.card_name['card_'+i+'_square12'] = num12;
                var num14 = this.getRandomInt(41, 50);
                this.card_name['card_'+i+'_square14'] = num14;
                var num15 = this.getRandomInt(51, 60);
                this.card_name['card_'+i+'_square15'] = num15;
                var num16 = this.getRandomInt(61, 70);
                this.card_name['card_'+i+'_square16'] = num16;

                var num20 = this.getRandomInt(1, 10);
                this.card_name['card_'+i+'_square20'] = num20;
                var num21 = this.getRandomInt(11, 20);
                this.card_name['card_'+i+'_square21'] = num21;
                var num23 = this.getRandomInt(31, 40);
                this.card_name['card_'+i+'_square23'] = num23;
                var num25 = this.getRandomInt(51, 60);
                this.card_name['card_'+i+'_square25'] = num25;
                var num28 = this.getRandomInt(81, 90);
                this.card_name['card_'+i+'_square28'] = num28;

		table += '<div class="col-md-6 card-nm'+nm+'>">\
                    <div class="card90"><table class="table90 pattern" id="card_'+i+'">\
                        <tr>\
                        <td id="card_'+i+'_square0">'+num0+'</td>\
                        <td id="card_'+i+'_square1">&nbsp;</td>\
                        <td id="card_'+i+'_square2">'+num2+'</td>\
                        <td id="card_'+i+'_square3">'+num3+'</td>\
                        <td id="card_'+i+'_square4">&nbsp;</td>\
                        <td id="card_'+i+'_square5">&nbsp;</td>\
                        <td id="card_'+i+'_square6">&nbsp;</td>\
                        <td id="card_'+i+'_square7">'+num7+'</td>\
                        <td id="card_'+i+'_square8">'+num8+'</td>\
                        </tr>\
                        <tr>\
                            <td id="card_'+i+'_square10">&nbsp;</td>\
                            <td id="card_'+i+'_square11">'+num11+'</td>\
                            <td id="card_'+i+'_square12">'+num12+'</td>\
                            <td id="card_'+i+'_square13">&nbsp;</td>\
                            <td id="card_'+i+'_square14">'+num14+'</td>\
                            <td id="card_'+i+'_square15">'+num15+'</td>\
                            <td id="card_'+i+'_square16">'+num16+'</td>\
                            <td id="card_'+i+'_square17">&nbsp;</td>\
                            <td id="card_'+i+'_square18">&nbsp;</td>\
                        </tr>\
                        <tr>\
                            <td id="card_'+i+'_square20">'+num20+'</td>\
                            <td id="card_'+i+'_square21">'+num21+'</td>\
                            <td id="card_'+i+'_square22">&nbsp;</td>\
                            <td id="card_'+i+'_square23">'+num23+'</td>\
                            <td id="card_'+i+'_square24">&nbsp;</td>\
                            <td id="card_'+i+'_square25">'+num25+'</td>\
                            <td id="card_'+i+'_square26">&nbsp;</td>\
                            <td id="card_'+i+'_square27">&nbsp;</td>\
                            <td id="card_'+i+'_square28">'+num28+'</td>\
                        </tr>\
                    </table></div></div>';
                }
            }
        return table;
	}
    this.winner90 = function(data){ 
        // data has only counter ball number
        // get all the user card name of the users in the current gameInPlay
        //{type:'bingo90', started:false, completed:false}
        //Game.findOne({'_id':gameID},  function(err, game){
            console.log(data, 'this.winner90');
        Game.findOne({type:'bingo90', started:false, completed:false},  function(err, game){
            if(err){
                res.status(500).send(err);
                return;
            }
            console.log(game, 'Game data - this.winner90');
            data.user_room = game.room_id;
            if(game.users){ //playing_card
                for(var i=0;i<game.users.length;i++){
                    data.card_name = JSON.parse(game.users[i].playing_card);

                    var obj_length = Object.keys(data.card_name).length;
                    for(key in data.card_name){
                        if(data.card_name[key] == data.counter_ball){
                            data.card_name[key] = 'matched';
                        }
                    }
                console.log(data, 'this.winner90 222');
                    for(i=0;i<obj_length;i++){
                        //line 1 winner
                        if(!data.winnerLine1){
                            if(data.card_name["card_"+i+"_square0"] == 'matched'  &&
                                data.card_name["card_"+i+"_square2"] == 'matched' &&
                                data.card_name["card_"+i+"_square3"] == 'matched' &&
                                data.card_name["card_"+i+"_square7"] == 'matched' &&
                                data.card_name["card_"+i+"_square8"] == 'matched'){
                                data.winnerLine1 = 1;
                                data.winnerLine1_user = game.users[i].user;
                                //data.winnerLine1Shown = 1;
                            }
                            if(data.card_name["card_"+i+"_square11"]  == 'matched' &&
                                data.card_name["card_"+i+"_square12"] == 'matched' &&
                                data.card_name["card_"+i+"_square14"] == 'matched' &&
                                data.card_name["card_"+i+"_square15"] == 'matched' &&
                                data.card_name["card_"+i+"_square16"] == 'matched'){
                                data.winnerLine1 = 1;
                                data.winnerLine1_user = game.users[i].user;
                                //data.winnerLine1Shown = 1;
                            }
                            if(data.card_name["card_"+i+"_square20"] == 'matched' &&
                                data.card_name["card_"+i+"_square21"] == 'matched' &&
                                data.card_name["card_"+i+"_square23"] == 'matched' &&
                                data.card_name["card_"+i+"_square25"] == 'matched' &&
                                data.card_name["card_"+i+"_square28"] == 'matched'){
                                data.winnerLine1 = 1;
                                data.winnerLine1_user = game.users[i].user;
                                //data.winnerLine1Shown = 1;
                            }
                        }
                        //2 lines winner
                        if(!data.winnerLine2){
                            if((data.card_name["card_"+i+"_square0"] == 'matched' &&
                                data.card_name["card_"+i+"_square2"] == 'matched' &&
                                data.card_name["card_"+i+"_square3"] == 'matched' &&
                                data.card_name["card_"+i+"_square7"] == 'matched' &&
                                data.card_name["card_"+i+"_square8"] == 'matched' && 
                                data.card_name["card_"+i+"_square11"] == 'matched' &&
                                data.card_name["card_"+i+"_square12"] == 'matched' &&
                                data.card_name["card_"+i+"_square14"] == 'matched' &&
                                data.card_name["card_"+i+"_square15"] == 'matched' &&
                                data.card_name["card_"+i+"_square16"] == 'matched') 
                            ||
                            (   data.card_name["card_"+i+"_square11"] == 'matched' &&
                                data.card_name["card_"+i+"_square12"] == 'matched' &&
                                data.card_name["card_"+i+"_square14"] == 'matched' &&
                                data.card_name["card_"+i+"_square15"] == 'matched' &&
                                data.card_name["card_"+i+"_square16"] == 'matched' &&
                                data.card_name["card_"+i+"_square20"] == 'matched' &&
                                data.card_name["card_"+i+"_square21"] == 'matched' &&
                                data.card_name["card_"+i+"_square23"] == 'matched' &&
                                data.card_name["card_"+i+"_square25"] == 'matched' &&
                                data.card_name["card_"+i+"_square28"] == 'matched')
                            ||
                            (   data.card_name["card_"+i+"_square0"] == 'matched' &&
                                data.card_name["card_"+i+"_square2"] == 'matched' &&
                                data.card_name["card_"+i+"_square3"] == 'matched' &&
                                data.card_name["card_"+i+"_square7"] == 'matched' &&
                                data.card_name["card_"+i+"_square8"] == 'matched' && 
                                data.card_name["card_"+i+"_square20"] == 'matched' &&
                                data.card_name["card_"+i+"_square21"] == 'matched' &&
                                data.card_name["card_"+i+"_square23"] == 'matched' &&
                                data.card_name["card_"+i+"_square25"] == 'matched' &&
                                data.card_name["card_"+i+"_square28"] == 'matched')){
                                data.winnerLine2 = 1;
                                data.winnerLine2_user = game.users[i].user;
                                //data.winnerLine2Shown = 1;
                            }
                        }
                        //full house win
                        if( data.card_name["card_"+i+"_square0"] == 'matched' &&
                            data.card_name["card_"+i+"_square2"] == 'matched' &&
                            data.card_name["card_"+i+"_square3"] == 'matched' &&
                            data.card_name["card_"+i+"_square7"] == 'matched' &&
                            data.card_name["card_"+i+"_square8"] == 'matched' && 
                            data.card_name["card_"+i+"_square11"] == 'matched' &&
                            data.card_name["card_"+i+"_square12"] == 'matched' &&
                            data.card_name["card_"+i+"_square14"] == 'matched' &&
                            data.card_name["card_"+i+"_square15"] == 'matched' &&
                            data.card_name["card_"+i+"_square16"] == 'matched' &&
                            data.card_name["card_"+i+"_square20"] == 'matched' &&
                            data.card_name["card_"+i+"_square21"] == 'matched' &&
                            data.card_name["card_"+i+"_square23"] == 'matched' &&
                            data.card_name["card_"+i+"_square25"] == 'matched' &&
                            data.card_name["card_"+i+"_square28"] == 'matched'){
                            data.winnerLine3 = 1;
                            data.winnerLine3_user = game.users[i].user;
                            //data.winnerLine3Shown = 1;
                        }
                    } // for loop

                    /*if(game.users[i].user == req.session.user){
                        user_exit = true;
                        game_user_id = game.users[i]._id;
                    }*/ 
                } //games users for loop
                console.log(data, 'this.winner90 - before return');
            //return data;
            } // if users

        }) // game in play Find query end

        return data;
         
        
        //return data;
    }
}

module.exports = Bingo90;