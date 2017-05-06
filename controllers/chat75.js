var Bingo75 = require('../models/bingo75'); 
var Game = require('../models/game'); 
var Room = require('../models/room');
var moment = require('moment-timezone');
var bingo75 = new Bingo75();
var EventEmitter75 = require("events").EventEmitter;
var ee75 = new EventEmitter75();
//Europe/Amsterdam
var b75 = {};
var hr75 = null;
//b90.round_started = false;
//console.log(hr, 'current hour');
module.exports = function(http){
	console.log('in chat 75');
	var users = [];
	var connections = [];
	b75.user_room = '587a693080859cf4acf73a5d';
	// automate bingo 90
	checkInterval75 = setInterval(function(){
		hr75 = moment(new Date()).tz("Europe/Amsterdam").format("mmss");
    	//console.log(hr, 'current hour');
    	//if(hr == "0001" || hr == "0601" || hr == "1001" || hr == '1601' || hr == "2001" || hr == "2601" || hr == "3001" || hr == "3601" || hr == "4001" || hr == "4601" || hr == "5001"){
    	if(hr75 == "0001"){		
	    	//if(!b90.round_started){
	    		//b90.round_started = true;
	    		Game.findOne({type:'bingo75', started:false, completed:false}, function(err, game){
	    			b75.game_id = game._id;
	    			b75.game = game;
	    			
	    			//if(!game.started){
	    				
		    			ee75.emit('game counter75', b75);
		    			// update room and games status
			    		Game.gameStatusStarted(true, b75.game_id);
						Room.roomStatus(true, b75.user_room);
						
					//}
	    		})
	    	//}
    	}
    	
    }, 1000);

	// bingo 90 ---------------------------------------------- Start
	ee75.on('game counter75', function(b90){
		var data = {};
		data = b75;
		data.current_game = {};
		var array75 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
                       21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
                       41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
                       61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];
        var stopCounter75 = null;
        data.users = {};
		data.card_name = {};
		console.log('game counter75 called - ',data);
		if(data.game.users){
			//data.users = game.users;
			for(var i=0;i<data.game.users.length;i++){
				//game.users[i].user 
				data.users[data.game.users[i].user] = JSON.parse(data.game.users[i].playing_card);
				data.current_game[data.game.users[i].user] = JSON.parse(data.game.users[i].playing_card);
			}
		}


	});

	// bingo 75 ---------------------------------------------- Start
	
    
    
	socket.on('game counter75', function(data){
		console.log(data.user_room,  'game counter');
		data.users = {};
		data.card_name = {};
		Game.findOne({'_id':data.game_id},  function(err, game){
        	if(err){
				res.status(500).send(err);
				return;
			}
			if(game.users){
				//data.users = game.users;
				for(var i=0;i<game.users.length;i++){
					//game.users[i].user 
					data.users[game.users[i].user] = JSON.parse(game.users[i].playing_card);
					data.users[game.users[i].user].pattern = game.users[i].pattern;
				}
			}
		
			stopCounter75 = setInterval(function(){
				var ball= array75[Math.floor(Math.random()*array75.length)];
				var index = array75.indexOf(ball);
				if (index > -1) {
					array75.splice(index, 1);
				}
				data.counter_ball = ball;
				
				if(array75.length == 0 || data.winner75 == 1){
	                data.game_completed = true;
	                // new game add
                    var g = new Game();
                    g.title = 'New_Game_from_Chat75';
                    g.date = new Date();
                    g.started = false;
                    g.completed = false;
                    g.type = 'bingo75';
                    g.save(function(err, ga){
                        if(err){
                            res.status(500).send(err);
                            return;
                        }
                    });
                //new gameadded
	                //update room status to false so it show open in rooms
	                Room.roomStatus(false, data.user_room);
					//update games stayus to completed
					Game.gameStatusCompleted(true, data.game_id);

	                console.log(data.counter_ball, data.pattern, array75.length, 'LAST - data.counter_ball75');
	                io.to(data.user_room).emit('show counter ball75', data);
	                data.counter_ball= null;
		            data.winner75= null;
	                data = null;
	                clearInterval(stopCounter75);
	                return;
            	}
            	//data.user_bought_card = true;
				//console.log(data, 'data from client');
				data = bingo75.winner75(data);
				console.log(data.counter_ball, data.pattern, array75.length, 'data.counter_ball75');


				io.to(data.user_room).emit('show counter ball75', data);
			}, 3000);
		//bingo90 = new Bingo90();
		});	//game find ends
		
	});
	// bingo 75 ---------------------------------------------- End


}

