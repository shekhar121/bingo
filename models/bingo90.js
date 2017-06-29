var User = require('./user');
var Room = require('./room');
var Game = require('./game90');
var Game90archive = require('../models/game90archive');
//var Game = require('./game90');
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
                //update losers here
                /*for(u in data.users){
                    //data.card_name = data.users[usr];
                    var obj_length = Object.keys(data.users[u]).length;
                    if(u != usr){
                        User.findOne({'username':u},  function(err, looser){
                            if(err){
                                res.status(500).send(err);
                                return;
                            }
                            looser.win_amount = (user.win_amount-room_prize);
                            looser.save(function(err, data){
                                if(err){
                                    console.log(err, 'could not update looser credit after win', room_prize, looser.win_amount);
                                    return;
                                }
                                //return res.status(200).json({username:data.username});
                            });
                        });

                    }
                }*/
                // looser updates ends
            }
            User.findOne({'username':usr},  function(err, user){
                if(err){
                    res.status(500).send(err);
                    return;
                }
                user.win_amount = (user.win_amount+room_prize);
                user.save(function(err, data){
                    if(err){
                        console.log(err, 'could not update credit after win', room_prize, user.win_amount);
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
        //console.log(i,usr, line, 'this.getLineWinningCard')
        var table = '';
        table += '<div class=" col-md-12">\
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
                    <span id="card_'+i+'_square12" class="selectedBox matched-cell">'+data.current_game[usr]["card_"+i+"_square12"]+'</span>\
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
                if(data.game_round == 1){
                    if(line == 'L1'){
                        gm.r1winnerLine1 = usr;
                        gm.r1winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r1winnerLine2 = usr;
                        gm.r2winnerLine2Card = table;
                    }
                    if(line == 'L3'){
                        data.winnerLine3 = 1;
                        gm.r1winnerLine3 = usr;
                        gm.r1winnerLine3Card = table;
                    }
                }
                if(data.game_round == 2){
                    if(line == 'L1'){
                        gm.r2winnerLine1 = usr;
                        gm.r2winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r2winnerLine2 = usr;
                        gm.r2winnerLine2Card = table;
                    }
                    if(line == 'L3'){
                        data.winnerLine3 = 1;
                        gm.r2winnerLine3 = usr;
                        gm.r2winnerLine3Card = table;
                    }
                }
                if(data.game_round == 3){
                    if(line == 'L1'){
                        gm.r3winnerLine1 = usr;
                        gm.r3winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r3winnerLine2 = usr;
                        gm.r3winnerLine2Card = table;
                    }
                    if(line == 'L3'){
                        data.winnerLine3 = 1;
                        gm.r3winnerLine3 = usr;
                        gm.r3winnerLine3Card = table;
                    }
                }
                if(data.game_round == 4){
                    if(line == 'L1'){
                        gm.r4winnerLine1 = usr;
                        gm.r4winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r4winnerLine2 = usr;
                        gm.r4winnerLine2Card = table;
                    }
                    if(line == 'L3'){
                        data.winnerLine3 = 1;
                        gm.r4winnerLine3 = usr;
                        gm.r4winnerLine3Card = table;
                    }
                }
                if(data.game_round == 5){
                    if(line == 'L1'){
                        gm.r5winnerLine1 = usr;
                        gm.r5winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r5winnerLine2 = usr;
                        gm.r5winnerLine2Card = table;
                    }
                    if(line == 'L3'){
                        data.winnerLine3 = 1;
                        gm.r5winnerLine3 = usr;
                        gm.r5winnerLine3Card = table;
                    }
                }
                if(data.game_round == 6){
                    if(line == 'L1'){
                        gm.r6winnerLine1 = usr;
                        gm.r6winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r6winnerLine2 = usr;
                        gm.r6winnerLine2Card = table;
                    }
                    if(line == 'L3'){
                        data.winnerLine3 = 1;
                        gm.r6winnerLine3 = usr;
                        gm.r6winnerLine3Card = table;
                    }
                }
                if(data.game_round == 7){
                    if(line == 'L1'){
                        gm.r7winnerLine1 = usr;
                        gm.r7winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r7winnerLine2 = usr;
                        gm.r7winnerLine2Card = table;
                    }
                    if(line == 'L3'){
                        data.winnerLine3 = 1;
                        gm.r7winnerLine3 = usr;
                        gm.r7winnerLine3Card = table;
                    }
                }
                if(data.game_round == 8){
                    if(line == 'L1'){
                        gm.r8winnerLine1 = usr;
                        gm.r8winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r8winnerLine2 = usr;
                        gm.r8winnerLine2Card = table;
                    }
                    if(line == 'L3'){
                        data.winnerLine3 = 1;
                        gm.r8winnerLine3 = usr;
                        gm.r8winnerLine3Card = table;
                    }
                }
                if(data.game_round == 9){
                    if(line == 'L1'){
                        gm.r9winnerLine1 = usr;
                        gm.r9winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r9winnerLine2 = usr;
                        gm.r9winnerLine2Card = table;
                    }
                    if(line == 'L3'){
                        data.winnerLine3 = 1;
                        gm.r9winnerLine3 = usr;
                        gm.r9winnerLine3Card = table;
                    }
                }
                if(data.game_round == 10){
                    if(line == 'L1'){
                        gm.r10winnerLine1 = usr;
                        gm.r10winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r10winnerLine2 = usr;
                        gm.r10winnerLine2Card = table;
                    }
                    if(line == 'L3'){ 
                        data.winnerLine3 = 1;
                        gm.r10winnerLine3 = usr;
                        gm.r10winnerLine3Card = table;
                    }
                }
                if(data.game_round == 11){ 
                    data.r11winnerLine3 = 1;
                    if(line == 'L1'){
                        gm.r11winnerLine1 = usr;
                        gm.r11winnerLine1Card = table;
                    }
                    if(line == 'L2'){
                        gm.r11winnerLine2 = usr;
                        gm.r11winnerLine2Card = table;
                    }
                    if(line == 'L3'){ 
                        data.winnerLine3 = 1;
                        gm.r11winnerLine3 = usr;
                        gm.r11winnerLine3Card = table;
                    }
                }
                gm.round = data.game_round;
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

        table += '<div class=" col-md-6">\
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
                    // new game add
                    /*var g = new Game();
                    g.title = 'New_Game';
                    g.date = new Date();
                    g.started = false;
                    g.completed = false;
                    g.type = 'bingo90';
                    g.save(function(err, ga){
                        if(err){
                            res.status(500).send(err);
                            return;
                        }
                    });*/
                    //new gameadded
                }
            } // for loop
            data.card_name[usr] = data.users[usr];
        }

         
        
        return data;
    }
    this.archive_current_game = function(game_id){
        
        Game.findOne({'_id':game_id},  function(err, gm90){
            if(err){
                console.log('could not update game with winner card:'+ data.current_game[usr]);
                return;
            }
            //archive and remove and insert new
            //gm90._id = null;
            game90archive = new Game90archive(gm90);
            //game90archive.save();
            //game90archive._id = mongoose.Types.ObjectId();
            game90archive.isNew = true;
            game90archive.save(function(err, data){
                        if(err){
                            console.log(err,'could not archive_current_game game after completed - ');
                            return;
                        }
                        return true;
                    });
            /*game90archive.users = gm90.users;
            game90archive.game_id = game_id;
            game90archive.round = gm90.round;
            game90archive.hour = gm90.hour;
            game90archive.r1winnerLine1 = gm90.r1winnerLine1;
            game90archive.r1winnerLine1Card= gm90.r1winnerLine1Card;
            game90archive.r1winnerLine2= gm90.r1winnerLine2;
            game90archive.r1winnerLine2Card= gm90.r1winnerLine2Card;
            game90archive.r1winnerLine3 = gm90.r1winnerLine3;
            game90archive.r1winnerLine3Card = gm90.r1winnerLine3Card;
            game90archive.r2winnerLine1 = gm90.r2winnerLine1;
            game90archive.r2winnerLine1Card = gm90.r2winnerLine1Card;
            game90archive.r2winnerLine2 = gm90.r2winnerLine2;
            game90archive.r2winnerLine2Card = gm90.r2winnerLine2Card;
            game90archive.r2winnerLine3 = gm90.r2winnerLine3;
            game90archive.r2winnerLine3Card = gm90.r2winnerLine3Card;
            game90archive.r3winnerLine1 = gm90.r3winnerLine1;
            game90archive.r3winnerLine1Card = gm90.r3winnerLine1Card;
            game90archive.r3winnerLine2 = gm90.r3winnerLine2;
            game90archive.r3winnerLine2Card = gm90.r3winnerLine2Card;
            game90archive.r3winnerLine3 = gm90.r3winnerLine3;
            game90archive.r3winnerLine3Card = gm90.r3winnerLine3Card;
            game90archive.r4winnerLine1 = gm90.r4winnerLine1;
            game90archive.r4winnerLine1Card = gm90.r4winnerLine1Card;
            game90archive.r4winnerLine2 = gm90.r4winnerLine2;
            game90archive.r4winnerLine2Card = gm90.r4winnerLine2Card;
            game90archive.r4winnerLine3 = gm90.r4winnerLine3;
            game90archive.r4winnerLine3Card = gm90.r4winnerLine3Card;
            game90archive.r5winnerLine1 = gm90.r5winnerLine1;
            game90archive.r5winnerLine1Card = gm90.r5winnerLine1Card;
            game90archive.r5winnerLine2 = gm90.r5winnerLine2;
            game90archive.r5winnerLine2Card = gm90.r5winnerLine2Card;
            game90archive.r5winnerLine3 = gm90.r5winnerLine3;
            game90archive.r5winnerLine3Card = gm90.r5winnerLine3Card;
            game90archive.r6winnerLine1 = gm90.r6winnerLine1;
            game90archive.r6winnerLine1Card = gm90.r6winnerLine1Card;
            game90archive.r6winnerLine2 = gm90.r6winnerLine2;
            game90archive.r6winnerLine2Card = gm90.r6winnerLine2Card;
            game90archive.r6winnerLine3 = gm90.r6winnerLine3;
            game90archive.r6winnerLine3Card = gm90.r6winnerLine3Card;
            game90archive.r7winnerLine1 = gm90.r7winnerLine1;
            game90archive.r7winnerLine1Card = gm90.r7winnerLine1Card;
            game90archive.r7winnerLine2 = gm90.r7winnerLine2;
            game90archive.r7winnerLine2Card = gm90.r7winnerLine2Card;
            game90archive.r7winnerLine3 = gm90.r7winnerLine3;
            game90archive.r7winnerLine3Card = gm90.r7winnerLine3Card;
            game90archive.r8winnerLine1 = gm90.r8winnerLine1;
            game90archive.r8winnerLine1Card = gm90.r8winnerLine1Card;
            game90archive.r8winnerLine2 = gm90.r8winnerLine2;
            game90archive.r8winnerLine2Card = gm90.r8winnerLine2Card;
            game90archive.r8winnerLine3 = gm90.r8winnerLine3;
            game90archive.r8winnerLine3Card = gm90.r8winnerLine3Card;
            game90archive.r9winnerLine1 = gm90.r9winnerLine1;
            game90archive.r9winnerLine1Card = gm90.r9winnerLine1Card;
            game90archive.r9winnerLine2 = gm90.r9winnerLine2;
            game90archive.r9winnerLine2Card = gm90.r9winnerLine2Card;
            game90archive.r9winnerLine3 = gm90.r9winnerLine3;
            game90archive.r9winnerLine3Card = gm90.r9winnerLine3Card;
            game90archive.r10winnerLine1 = gm90.r10winnerLine1;
            game90archive.r10winnerLine1Card = gm90.r10winnerLine1Card;
            game90archive.r10winnerLine2 = gm90.r10winnerLine2;
            game90archive.r10winnerLine2Card = gm90.r10winnerLine2Card;
            game90archive.r10winnerLine3 = gm90.r10winnerLine3;
            game90archive.r10winnerLine3Card = gm90.r10winnerLine3Card; 
            game90archive.r11winnerLine1 = gm90.r11winnerLine1;
            game90archive.r11winnerLine1Card = gm90.r11winnerLine1Card;
            game90archive.r11winnerLine2 = gm90.r11winnerLine2;
            game90archive.r11winnerLine2Card = gm90.r11winnerLine2Card;
            game90archive.r11winnerLine3 = gm90.r11winnerLine3;
            game90archive.r11winnerLine3Card = gm90.r11winnerLine3Card;*/

            
            
         });
    }
    this.update_current_game = function(game_id){
            Game.findOne({'_id':game_id}, function(err,g){
                if(err){
                    console.log('could not update_current_game:'+ game_id);
                    return;
                }
                    g.users = [];
                    g.r1winnerLine1 = '';
                    g.r1winnerLine1Card= '';
                    g.r1winnerLine2= '';
                    g.r1winnerLine2Card= '';
                    g.r1winnerLine3 = '';
                    g.r1winnerLine3Card = '';
                    g.r2winnerLine1 = '';
                    g.r2winnerLine1Card = '';
                    g.r2winnerLine2 = '';
                    g.r2winnerLine2Card = '';
                    g.r2winnerLine3 = '';
                    g.r2winnerLine3Card = '';
                    g.r3winnerLine1 = '';
                    g.r3winnerLine1Card = '';
                    g.r3winnerLine2 = '';
                    g.r3winnerLine2Card = '';
                    g.r3winnerLine3 = '';
                    g.r3winnerLine3Card = '';
                    g.r4winnerLine1 = '';
                    g.r4winnerLine1Card = '';
                    g.r4winnerLine2 = '';
                    g.r4winnerLine2Card = '';
                    g.r4winnerLine3 = '';
                    g.r4winnerLine3Card = '';
                    g.r5winnerLine1 = '';
                    g.r5winnerLine1Card = '';
                    g.r5winnerLine2 = '';
                    g.r5winnerLine2Card = '';
                    g.r5winnerLine3 = '';
                    g.r5winnerLine3Card = '';
                    g.r6winnerLine1 = '';
                    g.r6winnerLine1Card = '';
                    g.r6winnerLine2 = '';
                    g.r6winnerLine2Card = '';
                    g.r6winnerLine3 = '';
                    g.r6winnerLine3Card = '';
                    g.r7winnerLine1 = '';
                    g.r7winnerLine1Card = '';
                    g.r7winnerLine2 = '';
                    g.r7winnerLine2Card = '';
                    g.r7winnerLine3 = '';
                    g.r7winnerLine3Card = '';
                    g.r8winnerLine1 = '';
                    g.r8winnerLine1Card = '';
                    g.r8winnerLine2 = '';
                    g.r8winnerLine2Card = '';
                    g.r8winnerLine3 = '';
                    g.r8winnerLine3Card = '';
                    g.r9winnerLine1 = '';
                    g.r9winnerLine1Card = '';
                    g.r9winnerLine2 = '';
                    g.r9winnerLine2Card = '';
                    g.r9winnerLine3 = '';
                    g.r9winnerLine3Card = '';
                    g.r10winnerLine1 = '';
                    g.r10winnerLine1Card = '';
                    g.r10winnerLine2 = '';
                    g.r10winnerLine2Card = '';
                    g.r10winnerLine3 = '';
                    g.r10winnerLine3Card = '';
                    g.r11winnerLine1 = '';
                    g.r11winnerLine1Card = '';
                    g.r11winnerLine2 = '';
                    g.r11winnerLine2Card = '';
                    g.r11winnerLine3 = '';
                    g.r11winnerLine3Card = '';
                    g.save(function(err, data){
                        if(err){
                            console.log(err,'could not update game after completed - ');
                            return;
                        }
                        return true;
                    });
            });
        }
}

module.exports = Bingo90;