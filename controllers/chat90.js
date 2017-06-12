var Bingo90 = require('../models/bingo90'); 
var Bingo75 = require('../models/bingo75'); 
var bingo90 = new Bingo90();
var bingo75 = new Bingo75();
var Game75 = require('../models/game75'); 
var Game90 = require('../models/game90');

var Room = require('../models/room');
var moment = require('moment-timezone');
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();
//Europe/Amsterdam
var b90 = {};
var b75 = {};
var hr = null;
var hrhh = null;
var hr75 = null;
var hrhh75 = null;
//b90.round_started = false;
//var checkInterval = null;
//var stopCounter = null;
module.exports = function(http){
	console.log('in chat 90');
	var users = [];
	var connections = [];
	var io90 = require('socket.io')(http);

	// 90 room id - 587a8ca380859cf4acf73a61
	b90.user_room = '587a8ca380859cf4acf73a61';
	b75.user_room = '587a693080859cf4acf73a5d';

	// automate bingo 90
	checkInterval = setInterval(function(){
		hr = moment(new Date()).tz("Europe/Amsterdam").format("mmss");
		hrhh = moment(new Date()).tz("Europe/Amsterdam").format("hh");
		hr75 = moment(new Date()).tz("Europe/Amsterdam").format("mmss");
		hrhh75 = moment(new Date()).tz("Europe/Amsterdam").format("hh");
    	//console.log(hr, 'current hour', hrhh);
    	if(hrhh % 2 == 0){
	    	if(hr == "0001" || hr == "0601" || hr == "1001" || hr == '1601' || hr == "2001" || hr == "2601" || hr == "3001" || hr == "3601" || hr == "4001" || hr == "4601" || hr == "5001"){
	    		if(hr == "0001"){ b90.game_round = 1; }
	    		if(hr == "0601"){ b90.game_round = 2; }
	    		if(hr == "1001"){ b90.game_round = 3; }
	    		if(hr == "1601"){ b90.game_round = 4; }
	    		if(hr == "2001"){ b90.game_round = 5; }
	    		if(hr == "2601"){ b90.game_round = 6; }
	    		if(hr == "3001"){ b90.game_round = 7; }
	    		if(hr == "3601"){ b90.game_round = 8; }
	    		if(hr == "4001"){ b90.game_round = 9; }
	    		if(hr == "4601"){ b90.game_round = 10; }
	    		if(hr == "5001"){ b90.game_round = 11; }
	    		// get the game and call 'game counter', that starts bingo 90
		    	//if(!b90.round_started){
		    		
		    		//b90.round_started = true;
		    		Game90.findOne({hour:hrhh}, function(err, game){
		    			b90.game_id = game._id;
		    			b90.game = game;
		    			
		    			//if(!game.started){
		    				
			    			ee.emit('game counter', b90);
			    			// update room and games status
				    		Game90.gameStatusStarted(true, b90.game_id);
							Room.roomStatus(true, b90.user_room);
							
						//}
		    		})
		    		
		    	//}
	    	}
    	}
    	//console.log(hr75, 'current hour75');
    	//check for game 75
    	if(hrhh75 % 2 != 0){
	    	if(hr75 == "0601" || hr75 == "1001" || hr75 == '1601' || hr75 == "2001" || hr75 == "2601" || hr75 == "3601" || hr75 == "4001" || hr75 == "4601" || hr75 == "5001"){		
		    	//if(!b90.round_started){
		    		//b90.round_started = true;
		    		Game75.findOne({hour:hrhh}, function(err, game){
		    			b75.game_id = game._id;
		    			b75.game = game;
		    			//if(!game.started){
			    			ee.emit('game counter75', b75);
			    			// update room and games status
				    		Game75.gameStatusStarted(true, b75.game_id);
							Room.roomStatus(true, b75.user_room);
							
						//}
		    		})
		    	//}
	    	} // check75 ends
	    	// for golden room
	    	if(hr75 == "0001" || hr75 == "3001"){		
		    	//if(!b90.round_started){
		    		//b90.round_started = true;
		    		Game75.findOne({hour:hrhh, 'type':'gold'}, function(err, game){
		    			b75.game_id = game._id;
		    			b75.game = game;
		    			//if(!game.started){
			    			ee.emit('game counter75', b75);
			    			// update room and games status
				    		Game75.gameStatusStarted(true, b75.game_id);
							Room.roomStatus(true, b75.user_room);
							
						//}
		    		})
		    	//}
	    	} // check75 ends
    	}
    }, 1000);

    	// bingo 75 ---------------------------------------------- Start
	ee.on('game counter75', function(b75){
		var data75 = {};
		data75 = b75;
		data75.current_game = {};
		data75.game_completed = false;
		var array75 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
                       21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
                       41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
                       61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];
        var stopCounter75 = null;
        data75.users = {};
		data75.card_name75 = {};
		//data75.pattern = 'T';
		console.log('game counter75 called - ',data75);
		if(data75.game.users){
			//data.users = game.users;
			for(var i=0;i<data75.game.users.length;i++){
				//game.users[i].user 
				data75.users[data75.game.users[i].user] = JSON.parse(data75.game.users[i].playing_card);
				data75.current_game[data75.game.users[i].user] = JSON.parse(data75.game.users[i].playing_card);
				data75.users[data75.game.users[i].user].pattern = 'T';
			}
		}
		stopCounter75 = setInterval(function(){
			data75.game_completed = false;
				var ball75 = array75[Math.floor(Math.random()*array75.length)];
				var index75 = array75.indexOf(ball75);
				if (index75 > -1) {
					array75.splice(index75, 1);
				}
				data75.counter_ball75 = ball75;
				
				if(array75.length == 0 || data75.winner75 == 1){
	                data75.game_completed = true;
	                // new game add
                    /*var g = new Game();
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
                    });*/
                //new gameadded
	                //update room status to false so it show open in rooms
	                Room.roomStatus(false, data75.user_room);
					//update games stayus to completed
					Game75.gameStatusCompleted(true, data75.game_id);

	                console.log(data75.counter_ball75, data75.user_room, data75.game_id, 'LAST - data.counter_ball75');
	                //io90.to(data75.user_room).emit('show counter ball75', data75);
	                io90.sockets.emit('show counter ball75', data75);
	                bingo75.update_current_game(data75.game_id);
	                data75.counter_ball= null;
	                data75.game_completed = false;
		            data75.winner75= null;
	                data75 = null;
	                clearInterval(stopCounter75);
	                return;
            	}
            	//data.user_bought_card = true;
				//console.log(data, 'data from client');
				data75 = bingo75.winner75(data75);
				console.log(data75, 'data.counter_ball75');


				//io90.to(data75.user_room).emit('show counter ball75', data75);
				io90.sockets.emit('show counter ball75', data75);
			}, 3000);

	});
	// bingo 75 ----------------------------------------------End

	// bingo 90 ---------------------------------------------- Start
	ee.on('game counter', function(b90){
		var data = {};
		data = b90;
		data.current_game = {};  //  to create a winning card
		data.ball_number = 1;

		var array90 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
                       21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
                       41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
                       61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
                       81,82,83,84,85,86,87,88,89,90];

     	var stopCounter = null;
		//console.log(data.user_room,  'room - game counter g-id', data.game_id);
		data.users = {};
		data.card_name = {};
		//console.log('game counter called - ',data)

			if(data.game.users){
				//data.users = game.users;
				for(var i=0;i<data.game.users.length;i++){
					//game.users[i].user 
					data.users[data.game.users[i].user] = JSON.parse(data.game.users[i].playing_card);
					data.current_game[data.game.users[i].user] = JSON.parse(data.game.users[i].playing_card);
				}
			}
			//clearInterval(stopCounter);
			stopCounter = setInterval(function(){
				

				var ball= array90[Math.floor(Math.random()*array90.length)];
				var index = array90.indexOf(ball);
				if (index > -1) {
					array90.splice(index, 1);
				}
				data.counter_ball = ball;
				data.ball_number++;
				//game completes here - update db
				if(array90.length == 0 || data.winnerLine3 == 1){
					data.round_completed = true;
				//if(data.winnerLine3 == 1){
	                
	                
	                
	                //update room status to false so it show open in rooms
	                Room.roomStatus(false, data.user_room);
					//update games stayus to completed
					Game90.gameStatusCompleted(true, data.game_id);
					//update credits

	                //console.log(data.counter_ball, array90.length, 'LAST - data.counter_ball1',data.user_room);
	                io90.to(data.user_room).emit('show counter ball', data);
	                
	                data.ball_number = 0;
	                data.winnerLine1 = 0;
	                data.winnerLine2 = 0;
	                data.winnerLine3 = 0;
	                data.winnerLine1User = null;
	                data.winnerLine2User = null;
	                data.winnerLine3User = null;
	                data.line1WinningCard = null;
	                data.line2WinningCard = null;
	                data.line3WinningCard = null;
	                data.round_completed = false;
	                //insert new before removing - todo
	                // put return here
	                //
	                if(data.r11winnerLine3 == 1){
	                	bingo90.archive_current_game(data.game_id);
	                	bingo90.update_current_game(data.game_id);
	                	data.game_completed = true;
	                	data = null;
	                	
	            	}
            		console.log('before clearInterval - ')
	                clearInterval(stopCounter);
	                return;
	                
            	}
            	//data.user_bought_card = true;
				//console.log(data, 'data from client');
				data = bingo90.winner90(data, 'none');
				//console.log(data.counter_ball, data.users, 'data.counter_ball2', data.user_room);
	
				io90.to(data.user_room).emit('show counter ball', data);
			}, 3000);

		
	});
	// bingo 90 ----------------------------------------------End



	//chat bingo 90 and now bingo 75 also
	io90.on('connection', function(socket){

		connections.push(socket);
		console.log('conncted 90 : %s user(s) connected..!', connections.length);
		socket.on('send message', function(data){
			//console.log(data); 
			socket.join(data.user_room);

			io90.to(data.user_room).emit('show message', data);
			//io.emit('show message', data);
		});
		socket.on('get user list', function(data){
			//callback(true);
			socket.join(data.user_room);
			//console.log(data, 'get user list CALLED')
			socket.user_room = data.user_room;
			socket.username = data.user;
			if(users.indexOf(data.user) == -1 ){
				users.push(socket.username);
			}
			update_user_list(data.user_room);
	
		});
		function update_user_list(user_room){
			io90.to(user_room).emit('show user list', users);
			//console.log(users, user_room,'users: show user list CALLED');
		}
		
		

		//private chat
		socket.on('pchat', function(data, callback) {
			//console.log(data, 'in private char')
			//socket.join(data.to);
			//socket.join(data.from);
			io90.sockets.to(data.room).emit('new message', data);
		});
		//pchat end
		socket.on('disconnect', function(data){
			//users.splice(users.indexOf(socket.username), 1);
			//update_user_list(socket.user_room);
			connections.splice(connections.indexOf(socket), 1);
			console.log('disconncted : %s user(s) connected..!', connections.length);
		});

	}); 
	// chat ends both 75/90


}

