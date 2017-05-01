var Bingo90 = require('../models/bingo90'); 
var bingo90 = new Bingo90();
var Game = require('../models/game'); 
var Room = require('../models/room');
var moment = require('moment-timezone');
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();
//Europe/Amsterdam
var b90 = {};
var hr = null;
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

	// automate bingo 90
		//console.log(checkInterval, 'checkInterval');
		//console.log(stopCounter, 'stopCounter');
		//clearInterval(checkInterval);
		checkInterval = setInterval(function(){
			hr = moment(new Date()).tz("Europe/Amsterdam").format("mmss");
	    	//console.log(hr, 'current hour');
	    	//if(hr == "20" || hr == "20:05" || hr == "20:10" || hr == "20:15" || hr == "20:20" || hr == "20:25" || hr == "20:30" || hr == "20:35" || hr == "20:40" || hr == "20:45" || hr == "20:50" || hr == "20:55"){
	    	if(hr == "0001" || hr == "0601" || hr == "1001" || hr == '1601' || hr == "2001" || hr == "2601" || hr == "3001" || hr == "3601" || hr == "4001" || hr == "4601" || hr == "5001"){
	    		// get the game and call 'game counter', that starts bingo 90
		    	//if(!b90.round_started){
		    		
		    		//b90.round_started = true;
		    		Game.findOne({type:'bingo90', started:false, completed:false}, function(err, game){
		    			b90.game_id = game._id;
		    			b90.game = game;
		    			
		    			//if(!game.started){
		    				
			    			ee.emit('game counter', b90);
			    			// update room and games status
				    		Game.gameStatusStarted(true, b90.game_id);
							Room.roomStatus(true, b90.user_room);
							
						//}
		    		})
		    		
		    	//}
	    	}
	    	
	    }, 1000);
// bingo 90 ---------------------------------------------- Start
		
		
	    /*socket.on('stop counter', function(data){
	    	console.log('stop counter called');
	    	clearInterval(stopCounter);
	        return;
	    });*/ 
		ee.on('game counter', function(b90){
			var data = {};
			data = b90;
			data.current_game = {};  //  to create a winning card
			var array90 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
	                       21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
	                       41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
	                       61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
	                       81,82,83,84,85,86,87,88,89,90];

	     	var stopCounter = null;
			console.log(data.user_room,  'room - game counter g-id', data.game_id);
			data.users = {};
			data.card_name = {};
			console.log('game counter called - ',data)

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
					//game completes here - update db
					if(array90.length == 0 || data.winnerLine3 == 1){
		                data.game_completed = true;
		                //b90.round_started = false;
		                //console.log(data)
		                // new game add
	                    var g = new Game();
	                    g.title = 'New_Game_from_Chat90';
	                    g.date = new Date();
	                    g.started = false;
	                    g.completed = false;
	                    g.type = 'bingo90';
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
						//update credits

						// update other details when gane is completdd

						//end all updates after game completeds
		                console.log(data.counter_ball, array90.length, 'LAST - data.counter_ball1',data.user_room);
		                io90.to(data.user_room).emit('show counter ball', data);
		                  data.counter_ball= null;
			              data.winnerLine1= null;
			              data.winnerLine1User= null;
			              data.winnerLine2= null;
			              data.winnerLine2User= null;
			              data.winnerLine3= null;
			              data.winnerLine3User= null;
			              data.game_completed= null;
		                data = null;
		                //data = bingo90.winner90(data, 'none');
		                console.log('before clearInterval - ',data)
		                clearInterval(stopCounter);
		                return;
	            	}
	            	//data.user_bought_card = true;
					//console.log(data, 'data from client');
					data = bingo90.winner90(data, 'none');
					console.log(data.counter_ball, data.users, 'data.counter_ball2', data.user_room);
		
					io90.to(data.user_room).emit('show counter ball', data);
				}, 3000);

			
		});
		// bingo 90 ----------------------------------------------End
	io90.on('connection', function(socket){

		connections.push(socket);
		console.log('conncted : %s user(s) connected..!', connections.length);
		socket.on('send message', function(data){
			console.log(data); 
			socket.join(data.user_room);

			io90.to(data.user_room).emit('show message', data);
			//io.emit('show message', data);
		});
		socket.on('get user list', function(data){
			//callback(true);
			socket.join(data.user_room);
			console.log(data, 'get user list CALLED')
			socket.user_room = data.user_room;
			socket.username = data.user;
			if(users.indexOf(data.user) == -1 ){
				users.push(socket.username);
			}
			update_user_list(data.user_room);
	
		});
		function update_user_list(user_room){
			io90.to(user_room).emit('show user list', users);
			console.log(users, user_room,'users: show user list CALLED');
		}
		

		

		//private chat
		socket.on('pchat', function(data, callback) {
			console.log(data, 'in private char')
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



}

