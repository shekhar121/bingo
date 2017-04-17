var User = require('./user');
var Room = require('./room');
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
    console.log(obj.card_name);
}
function update_credit(data, usr, lineprize){
    console.log(data.user_room, 'in update credit', usr);
    //var room_prize = 0;
    
    Room.findOne({'_id':data.user_room}, function(err, room){
        var room_prize = 0;
        
        //var room_prize = room.line;
            if(err){
                res.status(500).send(err);
                return;
            }
            if(lineprize == 1){
                room_prize = room.line1_prize;
            }
            if(lineprize == 2){
                room_prize = room.line2_prize;
            }
            if(lineprize == 3){
                room_prize = room.fullhouse_prize;
            }
            User.findOne({'username':usr},  function(err, user){
                if(err){
                    res.status(500).send(err);
                    return;
                }
                user.total_credits = (user.total_credits+room_prize);
                user.save(function(err, data){
                    if(err){
                        console.log(err, 'could not update credit after win', room_prize, user.total_credits);
                        return;
                    }
                    //return res.status(200).json({username:data.username});
                });
            });
        })
}
var Bingo90 = function(cards, pattern){
	this.cards = cards*6;
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
    this.getLineWinningCard = function(i,usr, data, line){
        console.log(i,usr, line, 'this.getLineWinningCard')
        var table = '';
        table += '<div class="col-md-12">\
                    <div class="cardBoxT ChatCol">\
                    <span id="card_'+i+'_square0" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square0"]+'</span>\
                    <span id="card_'+i+'_square1"></span>\
                    <span id="card_'+i+'_square2" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square2"]+'</span>\
                    <span id="card_'+i+'_square3" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square3"]+'</span>\
                    <span id="card_'+i+'_square4"></span>\
                    <span id="card_'+i+'_square5"></span>\
                    <span id="card_'+i+'_square6"></span>\
                    <span id="card_'+i+'_square7" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square7"]+'</span>\
                    <span id="card_'+i+'_square8" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square8"]+'</span>\
                    \
                    <span id="card_'+i+'_square10"></span>\
                    <span id="card_'+i+'_square11" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square11"]+'</span>\
                    <span id="card_'+i+'_square12" class="selectedBox">'+data.current_game[usr]["card_"+i+"_square12"]+'</span>\
                    <span id="card_'+i+'_square13"></span>\
                    <span id="card_'+i+'_square14" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square14"]+'</span>\
                    <span id="card_'+i+'_square15" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square15"]+'</span>\
                    <span id="card_'+i+'_square16" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square16"]+'</span>\
                    <span id="card_'+i+'_square17"></span>\
                    <span id="card_'+i+'_square18"></span>\
                    \
                    <span id="card_'+i+'_square20" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square20"]+'</span>\
                    <span id="card_'+i+'_square21" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square21"]+'</span>\
                    <span id="card_'+i+'_square22"></span>\
                    <span id="card_'+i+'_square23" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square23"]+'</span>\
                    <span id="card_'+i+'_square24"></span>\
                    <span id="card_'+i+'_square25" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square25"]+'</span>\
                    <span id="card_'+i+'_square26"></span>\
                    <span id="card_'+i+'_square27"></span>\
                    <span id="card_'+i+'_square28" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square28"]+'</span>';
             table +=  '<div class="clearfix"></div><img src="assets/img/bingoBall.png" alt=""></div></div>';
             Game.findOne({'_id':data.game_id},  function(err, gm){
                if(err){
                    console.log('could not update game with winner card:'+ data.current_game[usr]);
                    return;
                }
                if(line == 'L1'){
                    gm.winnerLine1 = usr;
                    gm.winnerLine1Card = table;
                }
                if(line == 'L2'){
                    gm.winnerLine2 = usr;
                    gm.winnerLine2Card = table;
                }
                if(line == 'L3'){
                    gm.winnerLine3 = usr;
                    gm.winnerLine3Card = table;
                }
                gm.save(function(err, data){
                    if(err){
                        console.log(err, 'could not update game after win', data);
                        return;
                    }
                    //return res.status(200).json({username:data.username});
                });
            });
             return table;
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

        table += '<div class="col-md-6">\
                    <div class="cardBoxT ChatCol">\
                    <span id="card_'+i+'_square0" class="selectedBox ">'+num0+'</span>\
                    <span id="card_'+i+'_square1"></span>\
                    <span id="card_'+i+'_square2" class="selectedBox ">'+num2+'</span>\
                    <span id="card_'+i+'_square3" class="selectedBox ">'+num3+'</span>\
                    <span id="card_'+i+'_square4"></span>\
                    <span id="card_'+i+'_square5"></span>\
                    <span id="card_'+i+'_square6"></span>\
                    <span id="card_'+i+'_square7" class="selectedBox ">'+num7+'</span>\
                    <span id="card_'+i+'_square8" class="selectedBox ">'+num8+'</span>\
                    \
                    <span id="card_'+i+'_square10"></span>\
                    <span id="card_'+i+'_square11" class="selectedBox ">'+num11+'</span>\
                    <span id="card_'+i+'_square12" class="selectedBox">'+num12+'</span>\
                    <span id="card_'+i+'_square13"></span>\
                    <span id="card_'+i+'_square14" class="selectedBox ">'+num14+'</span>\
                    <span id="card_'+i+'_square15" class="selectedBox">'+num15+'</span>\
                    <span id="card_'+i+'_square16" class="selectedBox ">'+num16+'</span>\
                    <span id="card_'+i+'_square17"></span>\
                    <span id="card_'+i+'_square18"></span>\
                    \
                    <span id="card_'+i+'_square20" class="selectedBox">'+num20+'</span>\
                    <span id="card_'+i+'_square21" class="selectedBox">'+num21+'</span>\
                    <span id="card_'+i+'_square22"></span>\
                    <span id="card_'+i+'_square23" class="selectedBox">'+num23+'</span>\
                    <span id="card_'+i+'_square24"></span>\
                    <span id="card_'+i+'_square25" class="selectedBox">'+num25+'</span>\
                    <span id="card_'+i+'_square26"></span>\
                    <span id="card_'+i+'_square27"></span>\
                    <span id="card_'+i+'_square28" class="selectedBox">'+num28+'</span>';
             table +=  '<div class="clearfix"></div><img src="assets/img/bingoBall.png" alt=""></div></div>';

		
                }
            }
        return table;
	}
    this.winner90 = function(data){
        //console.log(data, this, 'in bingo 90 winner')

        for(usr in data.users){
            //data.card_name = data.users[usr];
            var obj_length = Object.keys(data.users[usr]).length;
            for(key in data.users[usr]){
                if(data.users[usr][key] == data.counter_ball){
                    data.users[usr][key] = 'matched';
                }
            }
            for(i=0;i<obj_length;i++){
                //line 1 winner
                if(!data.winnerLine1){
                    if(data.users[usr]["card_"+i+"_square0"] == 'matched'  &&
                        data.users[usr]["card_"+i+"_square2"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square3"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square7"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square8"] == 'matched'){
                        //user update credits
                        update_credit(data, usr, 1);
                        
                        data.winnerLine1 = 1;
                        data.winnerLine1User = usr;
                        data.line1WinningCard = this.getLineWinningCard(i, usr, data, 'L1');
                    }
                    if(data.users[usr]["card_"+i+"_square11"]  == 'matched' &&
                        data.users[usr]["card_"+i+"_square12"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square14"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square15"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square16"] == 'matched'){
                        //user update credits
                        update_credit(data, usr, 1);

                        data.winnerLine1 = 1;
                        data.winnerLine1User = usr;
                        data.line1WinningCard = this.getLineWinningCard(i, usr, data,'L1');
                    }
                    if(data.users[usr]["card_"+i+"_square20"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square21"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square23"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square25"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square28"] == 'matched'){
                        //user update credits
                        update_credit(data, usr, 1);
                        data.winnerLine1 = 1;
                        data.winnerLine1User = usr;
                        data.line1WinningCard = this.getLineWinningCard(i, usr, data,'L1');
                    }
                }
                //2 lines winner
                if(!data.winnerLine2){
                    if((data.users[usr]["card_"+i+"_square0"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square2"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square3"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square7"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square8"] == 'matched' && 
                        data.users[usr]["card_"+i+"_square11"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square12"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square14"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square15"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square16"] == 'matched') 
                    ||
                    (   data.users[usr]["card_"+i+"_square11"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square12"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square14"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square15"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square16"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square20"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square21"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square23"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square25"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square28"] == 'matched')
                    ||
                    (   data.users[usr]["card_"+i+"_square0"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square2"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square3"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square7"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square8"] == 'matched' && 
                        data.users[usr]["card_"+i+"_square20"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square21"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square23"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square25"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square28"] == 'matched')){
                        //user update credits
                        update_credit(data, usr, 2);
                        data.winnerLine2 = 1;
                        data.winnerLine2User = usr;
                        data.line2WinningCard = this.getLineWinningCard(i, usr, data, 'L2');
                    }
                }
                //full house win
                if( data.users[usr]["card_"+i+"_square0"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square2"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square3"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square7"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square8"] == 'matched' && 
                    data.users[usr]["card_"+i+"_square11"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square12"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square14"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square15"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square16"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square20"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square21"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square23"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square25"] == 'matched' &&
                    data.users[usr]["card_"+i+"_square28"] == 'matched'){
                    //user update credits
                        update_credit(data, usr, 3);
                    data.winnerLine3 = 1;
                    data.winnerLine3User = usr;
                    data.line3WinningCard = this.getLineWinningCard(i, usr, data, 'L3');
                }
            } // for loop
            data.card_name[usr] = data.users[usr];
        }

         
        
        return data;
    }
}

module.exports = Bingo90;