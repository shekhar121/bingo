/* 
var bodyParser = require('body-parser');

// create parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });*/
var Room = require('../models/room');
var User = require('../models/user');
var Game = require('../models/game');
var Bingo90 = require('../models/bingo90');
var Bingo = Bingo || {}; 
//get user details
/*User.find({username:req.session.user}, function(err, user){
	if(err){
		res.status(500).send(err);
		return;
	}
	Bingo.user_details = user;
	console.log(Bingo.user_details,'details');
})*/
//console.log(app.get('settings'), 'session');
module.exports = function(app){
//console.log(app.get('settings'), 'session2');
	app.get('/', function(req, res){
		Bingo = {
			user : req.session.user,
			url : 'index' //req.url
		}
	    res.render('index',{Bingo:Bingo})
	})
	app.get('/bingo75', function(req, res){
		if(!req.session.user){
			res.redirect('/');
			return;
		}
		//Bingo = {
			Bingo.user = req.session.user,
			Bingo.cards = req.query.cards,
			Bingo.user_room = req.query.room,
			Bingo.url = 'bingo75' //req.url
		//}
		Room.find({type:'bingo75'}, function(err, rooms){
			if(err){
				res.status(500).send(err);
				return;
			}
			Bingo.rooms = rooms;
			//console.log(Bingo)
	    	res.render('bingo75', {Bingo:Bingo})
		})
		
	    //res.redirect('/bingo75');
	})
	app.get('/bingo90', function(req, res){ 
		//console.log(app.get('settings'), 'session3');
		//req.session.user_bought_card = false;
		if(!req.session.user){
			res.redirect('/');
			return;
		}
		Bingo = {
			user : req.session.user,
			cards : req.query.cards,
			user_room : req.query.room,
			card_name : {},
			url : 'bingo90' //req.url
		}
		Room.find({type:'bingo90'}, function(err, rooms){
			if(err){
				res.status(500).send(err);
				return;
			}
			Bingo.rooms = rooms;
			User.find({username:req.session.user}, function(err, user){
				if(err){
					res.status(500).send(err);
					return;
				}
				Bingo.user_details = user;
				//console.log(Bingo.user_details,'details');
				/*var pattern = 'none';
		        var selected_pattern = pattern[Math.floor(Math.random()*pattern.length)];
		        bingo90 = new Bingo90(Bingo.cards, selected_pattern);
		        console.log(bingo90,'object -- Bingo90');
		        Bingo.newCards = bingo90.newCards();*/
		        
				//console.log(Bingo.card_name,'object -- Bingo');
			/*var game = new Game();
				game.room_id = req.query.room;
				game.users = {
					user: req.session.user,
					cards_table:Bingo.table,
					playing_card:Bingo.card_name
				}*/
				var gameID = '589cecd91d2a97e829000029';
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
							
							/*var data = {
								user: req.session.user,
								cards_table:Bingo.table,
								playing_card:JSON.stringify(Bingo.card_name)
							}*/
							//console.log(data , ' user no exit');
							game.users.push({user: req.session.user, cards_table:Bingo.table, playing_card:Bingo.card_name});
						//game.started = true;
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
					res.render('bingo90', {Bingo:Bingo});
				}
				console.log(req.session.user_bought_card,'111');
				if(req.session.user_bought_card) {
					Game.findOne({'users.user':req.session.user},{'users.user.$': 1} , function(err, game3){
			        	if(err){
							console.log(err);
							return;
						}
					console.log('3333');	
					if(game3){
						Bingo.table = game3.users[0].cards_table;
						Bingo.card_name = game3.users[0].playing_card;
						//Bingo.user_bought_card = req.session.user_bought_card;
						
					}
					res.render('bingo90', {Bingo:Bingo});
				  	//return;
					});
					//console.log(req.session.user_bought_card,'3344433');
				}
				
				 
				
				
			})
		
		})
	    
	})
	

}
