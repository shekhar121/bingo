
var async = require('async');
var Room = require('../models/room');
var User = require('../models/user');
var Game = require('../models/game');
var Bingo90 = require('../models/bingo90');
var Bingo = Bingo || {}; 


//console.log(app.get('settings'), 'session');
module.exports = function(app){
//console.log(app.get('settings'), 'session2');
	app.get('/bingo90/rooms', function(req, res){ 
		if(!req.session.user){
			res.redirect('/');
			return;
		}
		// update after game is completed
		if(req.query.game_c == 'yes' && req.query.game_c_id){
			Game.findOne({'_id':req.query.game_c_id},  function(err, game){
	        	if(err){
					res.status(500).send(err);
					return;
				}
				game.started = true;
				game.completed = true;
				game.save(function(err){
			  		if(err){
			  			console.log(err);
			  			return;
			  		}
		  		});
			});

			// add new game 
			// starts remove later - just to insert some testing games
		  	var g = new Game();
		  	g.title = 'This is new game..';
		  	g.date = new Date();
		  	g.started = false;
		  	g.completed = false;
		  	g.type = 'bingo90';
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
			user_bingo_credits: (req.session.user_bingo_credits)?req.session.user_bingo_credits:0 ,
			//cards : req.query.cards,
			//user_room : req.query.room,
			//game_id : req.query.game,
			//card_name : {},
			url : 'bingo90/rooms' //req.url
		}

		//try with async
		async.parallel([
		    function(callback) { 
		    	Room.find({type:'bingo90'}, callback);
		    },
		    function(callback) {
		    	Game.findOne({type:'bingo90', started:false, completed:false}, callback);
		    }
		], function(err, results) {
	    	if (err) {
	            throw callback(err);
	            return;
	        }
		    Bingo.rooms  = results[0]; //rooms
		    Bingo.gameinplay  = results[1]; //gameinplay
		    Bingo.user_details = req.session.user;
		    res.render('bingo90/rooms', {Bingo:Bingo});
		});
		//asyncs ends
	});
	
	app.get('/bingo90', function(req, res){ 
		//console.log(app.get('settings'), 'session3');
		//req.session.user_bought_card = false;
		if(!req.session.user || !req.session.user_bingo_credits){
			res.redirect('/bingo90/rooms');
			return;
		}
		var cards_type = (req.query.cards_type)? true:false;
		Bingo = {
			user : req.session.user.username,
			user_bingo_credits:req.session.user_bingo_credits,
			user_details : req.session.user,
			cards : req.session.cards,
			user_room : req.session.room_id,
			game_id : req.session.game_id,
			card_name : {},
			body_bg: req.session.body_bg,
			pin_bg: req.session.pin_bg,
			cards_type : cards_type,
			url : 'bingo90' //req.url
		}
	
			var gameID = req.session.game_id;
			req.session.user_bought_card = false;
			
			
			if(Bingo.cards > 0 && !req.session.user_bought_card){
			req.session.user_bought_card = true;
			bingo90 = new Bingo90(Bingo.cards, 'none');
    		Bingo.table = bingo90.newCards();
    		//Bingo.user_bought_card = req.session.user_bought_card;
    		Bingo.card_name = JSON.stringify(bingo90.getCard_name());
				Game.findOne({'_id':gameID},  function(err, game){
		        	if(err){
						res.status(500).send(err);
						return;
					}
					
					var user_exit = false;
					var game_user_id = '';
					if(game.users){
						for(var i=0;i<game.users.length;i++){
							if(game.users[i].user == req.session.user.username){
								user_exit = true;
								game_user_id = game.users[i]._id;
							} 
						}
					}
					var get_cards = [];
					var user_playing_cards = [];
					if(!user_exit){
						game.users.push({user: req.session.user.username, cards_table:Bingo.table, playing_card:Bingo.card_name, pattern:'none'});
						game.room_id = req.session.room_id;
						game.save(function(err){
					  		if(err){
					  			console.log(err);
					  			return;
					  		}
				  		});
					}
				});
			} 
			/*if(!Bingo.cards) {
				res.render('bingo90/bingo90', {Bingo:Bingo});
			}*/
			//console.log(req.session.user_bought_card,'111');
			if(req.session.user_bought_card) {
				Game.findOne({'_id':gameID,'users.user':req.session.user.username},{'users.user.$': 1} , function(err, game3){
		        	if(err){
						console.log(err);
						return;
					}
				//console.log('3333');	
				if(game3){
					Bingo.table = game3.users[0].cards_table;
					Bingo.card_name = game3.users[0].playing_card;
					Bingo.room_id = 'game3.room_id';
					//Bingo.user_bought_card = req.session.user_bought_card;
					
				}
				res.render('bingo90/bingo90', {Bingo:Bingo});
			  	//return;
				});
				//console.log(req.session.user_bought_card,'3344433');
			}

	}) //app get
	
	app.get('/bingo90-old', function(req, res){ 
		//console.log(app.get('settings'), 'session3');
		//req.session.user_bought_card = false;
		if(!req.session.user || !req.session.user_bingo_credits){
			res.redirect('/bingo90/rooms');
			return;
		}
		var cards_type = (req.query.cards_type)? true:false;
		Bingo = {
			user : req.session.user.username,
			user_bingo_credits:req.session.user_bingo_credits,
			cards : req.session.cards,
			user_room : req.session.room_id,
			game_id : req.session.game_id,
			card_name : {},
			body_bg: req.session.body_bg,
			pin_bg: req.session.pin_bg,
			cards_type : cards_type,
			url : 'bingo90' //req.url
		}
		// starts remove later - just to insert some testing games
	  	var g = new Game();
	  	g.title = 'This is new game..';
	  	g.date = new Date();
	  	g.started = false;
	  	g.completed = false;
	  	g.type = 'bingo90';
	  	g.save(function(err, g){
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  	});
	  	// ends remove later - just to insert some testing games
	  	
	  	// update after game is completed
		if(req.query.game_c == 'yes' && req.query.game_c_id){
			Game.findOne({'_id':req.query.game_c_id},  function(err, game){
	        	if(err){
					res.status(500).send(err);
					return;
				}
				game.started = true;
				game.completed = true;
				game.save(function(err){
			  		if(err){
			  			console.log(err);
			  			return;
			  		}
		  		});
			});
		}
		/*Room.find({type:'bingo90'}, function(err, rooms){
			if(err){
				res.status(500).send(err);
				return;
			}
			Bingo.rooms = rooms;*/
			User.findOne({username:req.session.user.username}, function(err, user){
				if(err){
					res.status(500).send(err);
					return;
				}
				user.total_credits = (user.total_credits - req.session.cards);
				user.save(function(err){
			  		if(err){
			  			console.log(err);
			  			return;
			  		}
		  		});
				Bingo.user_details = user;
		        Game.findOne({type:'bingo90', started:false, completed:false}, function(err, gameinplay){
		        	if(err){
						console.log(err);
						return;
					}
				Bingo.gameinplay = gameinplay; //used along with room - header90.ejs

					//console.log(Bingo.card_name,'object -- Bingo');
					/*var game = new Game();
					game.room_id = req.query.room;
					game.users = {
						user: req.session.user,
						cards_table:Bingo.table,
						playing_card:Bingo.card_name
					}*/
					var gameID = req.session.game_id;
					req.session.user_bought_card = false;
					
					
					if(Bingo.cards > 0 && !req.session.user_bought_card){
					req.session.user_bought_card = true;
					bingo90 = new Bingo90(Bingo.cards, 'none');
	        		Bingo.table = bingo90.newCards();
	        		//Bingo.user_bought_card = req.session.user_bought_card;
	        		Bingo.card_name = JSON.stringify(bingo90.getCard_name());
						Game.findOne({'_id':gameID},  function(err, game){
				        	if(err){
								res.status(500).send(err);
								return;
							}
							
							var user_exit = false;
							var game_user_id = '';
							//console.log(game, 'from game');
							if(game.users){
								for(var i=0;i<game.users.length;i++){
									if(game.users[i].user == req.session.user){
										user_exit = true;
										game_user_id = game.users[i]._id;
									} 
								}
							}
							var get_cards = [];
							var user_playing_cards = [];
							if(!user_exit){
								
						
								game.users.push({user: req.session.user.username, cards_table:Bingo.table, playing_card:Bingo.card_name, pattern:'none'});
								game.room_id = req.session.room_id;
								game.save(function(err){
							  		if(err){
							  			console.log(err);
							  			return;
							  		}
							  		//console.log(game2, ' user saveded exit');
						  		});
								//game.users.push(data);
								/*Game.findOneAndUpdate({'_id':gameID},{ 
								        "$set": {
								            "users": data
								        }
								    } ,function(err, game2){
							  		if(err){
							  			console.log(err);
							  			return;
							  		}
							  		console.log(game2, ' user saveded exit');
						  		});*/
							  		

							}
							
						  	//res.render('bingo90', {Bingo:Bingo});
						  	//return;
						});
					} 
					if(!Bingo.cards) {
						res.render('bingo90/bingo90', {Bingo:Bingo});
					}
					//console.log(req.session.user_bought_card,'111');
					if(req.session.user_bought_card) {
						Game.findOne({'_id':gameID,'users.user':req.session.user.username},{'users.user.$': 1} , function(err, game3){
				        	if(err){
								console.log(err);
								return;
							}
						//console.log('3333');	
						if(game3){
							Bingo.table = game3.users[0].cards_table;
							Bingo.card_name = game3.users[0].playing_card;
							Bingo.room_id = 'game3.room_id';
							//Bingo.user_bought_card = req.session.user_bought_card;
							
						}
						res.render('bingo90/bingo90', {Bingo:Bingo});
					  	//return;
						});
						//console.log(req.session.user_bought_card,'3344433');
					}

				}) //gamein play ends
			}) // user finds ends
		//}) //room ends
	}) //app get
	

}
