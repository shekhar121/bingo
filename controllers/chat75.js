var Bingo75 = require('../models/bingo75'); 
var Game = require('../models/game'); 
var Room = require('../models/room');
var moment = require('moment-timezone');
var bingo75 = new Bingo75();
//var EventEmitter = require("events").EventEmitter;
//var ee = new EventEmitter();
//Europe/Amsterdam
//var b90 = {};
//var hr = null;
//b90.round_started = false;
//console.log(hr, 'current hour');
module.exports = function(http){
	console.log('in chat 75');
	var users = [];
	var connections = [];
	var io = require('socket.io')(http);
	// 90 room id - 587a8ca380859cf4acf73a61
	//b90.user_room = '587a8ca380859cf4acf73a61';
    //b90.game_id = '<%= Bingo.game_id %>';
	// automate bingo 90
		

	io.on('connection', function(socket){
		/*ee.on('start90', function (b90) {
			console.log(b90._id, 'start emit ee 90');
		    // this message will be sent to all connected users
		    socket.emit('game counter', b90);
		 });*/
		connections.push(socket);
		console.log('conncted : %s user(s) connected..!', connections.length);
		socket.on('send message', function(data){
			console.log(data); 
			socket.join(data.user_room);
			
			//data.users_in_room = users;
			//update_user_list(data.user_room);
			io.to(data.user_room).emit('show message', data);
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
			//data.users_in_room = users;
			
			
			//io.emit('show message', data);
		});
		function update_user_list(user_room){
			io.to(user_room).emit('show user list', users);
			console.log(users, user_room,'users: show user list CALLED');
		}
		

		


		// bingo 75 ---------------------------------------------- Start
		var array75 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
	                       21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
	                       41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
	                       61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];
	    var stopCounter75 = null;
	    socket.on('stop counter75', function(data){
	    	console.log('stop counter75 called');
	    	clearInterval(stopCounter75);
	        return;
	    });
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
		                console.log(data.counter_ball, data.pattern, array75.length, 'LAST - data.counter_ball');
		                io.to(data.user_room).emit('show counter ball75', data);
		                data = null;
		                clearInterval(stopCounter75);
		                return;
	            	}
	            	//data.user_bought_card = true;
					//console.log(data, 'data from client');
					data = bingo75.winner75(data);
					console.log(data.counter_ball, data.pattern, array75.length, 'data.counter_ball');


					io.to(data.user_room).emit('show counter ball75', data);
				}, 3000);
			//bingo90 = new Bingo90();
			});	//game find ends
			
		});
		// bingo 75 ---------------------------------------------- End

		//private chat
		socket.on('pchat', function(data, callback) {
			console.log(data, 'in private char')
			//socket.join(data.to);
			//socket.join(data.from);
			io.sockets.to(data.room).emit('new message', data);
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

