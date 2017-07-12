var async = require('async');
var Room = require('../models/room');
var User = require('../models/user');
var Game = require('../models/game75');
var Setting = require('../models/setting');
//var Bingo75 = require('../models/bingo75');
var Bingo75 = Bingo75 || {}; 
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
			//do something after game
		}
		Bingo75 = {
			user : req.session.user.username,
			//user_details : req.session.user,
			game_id : (req.session.game_id) ? req.session.game_id : 0 ,
			user_playing75 : (req.session.user_playing75) ? req.session.user_playing75 : 0 ,
			url : 'bingo75/rooms' //req.url
		}

		//try with async
		async.parallel([
		    function(callback) { 
		    	Room.find({type:'bingo75'}, callback);
		    },
		    /*function(callback) {
		    	Game.findOne({type:'bingo75', started:false, completed:false}, callback);
		    },*/
		    function(callback) {
		    	User.findOne({_id:req.session.user._id}, callback);
		    }
		], function(err, results) {
		    // optional callback
	    	if (err) {
	            throw callback(err);
	            return;
	        }
		    Bingo75.rooms  = results[0]; //rooms
		    Bingo75.user_details = results[1];
		    res.render('bingo75/rooms', {Bingo75:Bingo75});
		});
		//asyncs ends
	});

	app.get('/bingo75', function(req, res){
		if(!req.session.user || !req.session.game_id){
			res.redirect('/bingo75/rooms');
			return;
		}
		Bingo75 = {
			user : req.session.user.username,
			cards : req.session.cards,
			user_room : req.session.room_id,
			game_id : req.session.game_id,
			room_img : req.session.room_img,
			card_name : {},
			url : 'bingo75' //req.url
		}

	  	var gameID = req.session.game_id;
			//try with async
			async.parallel([
			    function(callback) { 
			    	Room.findOne({_id:req.session.room_id}, callback);
			    },
			    function(callback) {
			    	Game.findOne({'_id':gameID,'users.user':req.session.user.username},{'users.user.$': 1}, callback);
			    },
			    function(callback) {
			    	Setting.findOne({}, callback);
			    },
			    function(callback) {
			    	User.findOne({_id:req.session.user._id}, callback);
			    }
			], function(err, results) {
		    	if (err) {
		            throw callback(err);
		            return;
		        }
			    Bingo75.room  = results[0]; //rooms

				for(var i=0;i<results[1].users.length;i++){
					if(results[1].users[i].user == req.session.user.username){
						Bingo75.table = results[1].users[i].cards_table;
						Bingo75.card_name = results[1].users[i].playing_card;
					} 
				}
				Bingo75.room_id = req.session.room_id;
				Bingo75.room_img =  req.session.room_img;
				Bingo75.marquee  = results[2].bingo75_broadcast_msg;
				Bingo75.pattern = results[1].users[0].pattern;
				Bingo75.user_details = results[3];
			    
			    res.render('bingo75/bingo75', {Bingo75:Bingo75});
			});
			//asyncs ends
						

	}) //app.get close 
	//app get
	
	
}

