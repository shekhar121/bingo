var Bingo90 = require('../models/bingo90'); 
var bingo90 = new Bingo90();
module.exports = function(http){
	console.log('in chat');
	var users = [];
	var connections = [];
	var io = require('socket.io')(http);


	io.on('connection', function(socket){
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
		var array90 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
	                       21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
	                       41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
	                       61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
	                       81,82,83,84,85,86,87,88,89,90];
	     var stopCounter = null;
	    socket.on('stop counter', function(data){
	    	console.log('stop counter called');
	    	clearInterval(stopCounter);
	        return;
	    });
		socket.on('game counter', function(data){
			console.log(data.user_room,  'game counter');
			
			stopCounter = setInterval(function(){
				var ball= array90[Math.floor(Math.random()*array90.length)];
				var index = array90.indexOf(ball);
				if (index > -1) {
					array90.splice(index, 1);
				}
				data.counter_ball = ball;
				
				if(array90.length == 0 || data.winnerLine3 == 1){
	                data.game_completed = true;
	                console.log(data.counter_ball, array90.length, 'LAST - data.counter_ball');
	                io.to(data.user_room).emit('show counter ball', data);
	                data = null;
	                clearInterval(stopCounter);
	                return;
            	}
            	//data.user_bought_card = true;
				//console.log(data, 'data from client');
				data = bingo90.winner90(data);
				console.log(data.counter_ball, array90.length, 'data.counter_ball');


				io.to(data.user_room).emit('show counter ball', data);
			}, 2500);
			//bingo90 = new Bingo90();
			
		});

		socket.on('disconnect', function(data){
			//users.splice(users.indexOf(socket.username), 1);
			//update_user_list(socket.user_room);
			connections.splice(connections.indexOf(socket), 1);
			console.log('disconncted : %s user(s) connected..!', connections.length);
		});

	}); 



}

