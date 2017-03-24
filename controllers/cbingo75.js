var async = require('async');
var Room = require('../models/room');
var User = require('../models/user');
var Game = require('../models/game');
var Bingo75 = require('../models/bingo75');
var Bingo = Bingo || {}; 
//get user details

module.exports = function(app){
	
	app.get('/bingo75/rooms', function(req, res){ 
		//console.log(app.get('settings'), 'session3');
		//req.session.user_bought_card = false;
		if(!req.session.user){
			res.redirect('/');
			return;
		}
		// update after game is completed
		if(req.query.game_c == 'yes' && req.query.game_c_id){
			//null completed game sessions, to get new one
			req.session.game_id = null;
			// add new game 
			// starts remove later - just to insert some testing games
		  	var g = new Game();
		  	g.title = 'This is new game..';
		  	g.date = new Date();
		  	g.started = false;
		  	g.completed = false;
		  	g.type = 'bingo75';
		  	g.save(function(err, g){
		  		if(err){
		  			res.status(500).send(err);
		  			return;
		  		}
		  	});
		  	// ends remove later - just to insert some testing games
		}
		Bingo = {
			user : req.session.user.username,
			user_details : req.session.user,
			user_bingo_credits: (req.session.user_bingo_credits)?req.session.user_bingo_credits:0 ,
			//cards : req.query.cards,
			//user_room : req.query.room,
			//game_id : req.query.game,
			//card_name : {},
			url : 'bingo75/rooms' //req.url
		}
		/*Room.find({type:'bingo75'}, function(err, rooms){
			if(err){
				res.status(500).send(err);
				return;
			}
			console.log(rooms);
			Bingo.rooms = rooms;
			Game.findOne({type:'bingo75', started:false, completed:false}, function(err, gameinplay){
		        	if(err){
						console.log(err);
						return;
					}
				Bingo.gameinplay = gameinplay;
				res.render('bingo75/rooms', {Bingo:Bingo});
			})
			
		});*/

		//try with async
		async.parallel([
		    function(callback) { 
		    	/*Room.find({type:'bingo75'}, function(err, data){
					if (err) {
			            throw callback(err);
			        }
			        callback(null, data);
		    	});*/
		    	Room.find({type:'bingo75'}, callback);
		    },
		    function(callback) {
		    	Game.findOne({type:'bingo75', started:false, completed:false}, callback);
		    }
		], function(err, results) {
		    // optional callback
	    	if (err) {
	            throw callback(err);
	            return;
	        }
		    Bingo.rooms  = results[0]; //rooms
		    Bingo.gameinplay  = results[1]; //gameinplay
		    res.render('bingo75/rooms', {Bingo:Bingo});
		});
		//asyncs ends
	});

	app.get('/bingo75', function(req, res){
		if(!req.session.user || !req.session.user_bingo_credits){
			res.redirect('/bingo75/rooms');
			return;
		}
		Bingo = {
			user : req.session.user.username,
			user_bingo_credits:req.session.user_bingo_credits,
			user_details : req.session.user,
			cards : req.session.cards,
			user_room : req.session.room_id,
			game_id : req.session.game_id,
			card_name : {},
			url : 'bingo75' //req.url
		}
	  	// starts remove later - just to insert some testing games
	  	/*var g = new Game();
	  	g.title = 'This is new game..';
	  	g.date = new Date();
	  	g.started = false;
	  	g.completed = false;
	  	g.type = 'bingo75';
	  	g.save(function(err, g){
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  	});*/
	  	var gameID = req.session.game_id;
			//try with async
			async.parallel([
			    function(callback) { 
			    	Room.findOne({_id:req.session.room_id}, callback);
			    },
			    function(callback) {
			    	Game.findOne({'_id':gameID,'users.user':req.session.user.username},{'users.user.$': 1}, callback);
			    }
			], function(err, results) {
		    	if (err) {
		            throw callback(err);
		            return;
		        }
			    Bingo.room  = results[0]; //rooms
			    //Bingo.gameinplay  = results[1]; //gameinplay

			    Bingo.table = results[1].users[0].cards_table;
				Bingo.card_name = results[1].users[0].playing_card;
				Bingo.room_id = req.session.room_id;
				Bingo.pattern = results[1].users[0].pattern;
			    
			    res.render('bingo75/bingo75', {Bingo:Bingo});
			});
			//asyncs ends
						

	}) //app.get close 
	//app get
	
	
}

