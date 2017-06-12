
var async = require('async'); 
var Room = require('../models/room');
var User = require('../models/user');
var Game = require('../models/game');
var Game90 = require('../models/game90');
var Setting = require('../models/setting');
var Bingo90 = require('../models/bingo90');
var moment = require('moment-timezone');
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
			//req.session.game_id = null;
		}

		Bingo = {
			user : req.session.user.username,
			game_id : (req.session.game_id) ? req.session.game_id : 0 ,
			user_playing : (req.session.user_playing) ? req.session.user_playing : 0 ,
			url : 'bingo90/rooms' //req.url
		}
			async.parallel([
			    function(callback) { 
			    	Room.find({type:'bingo90'}, callback);
			    },
			    /*function(callback) {
			    	Game90.findOne({_id:Bingo.game_id}, callback);
			    },*/
			    function(callback) {
			    	User.findOne({_id:req.session.user._id}, callback);
			    }
			], function(err, results) {
		    	if (err) {
		            throw callback(err);
		            return;
		        }
			    Bingo.rooms  = results[0]; //rooms
			    //Bingo.gameinplay  = results[1]; //gameinplay
			    Bingo.user_details = results[1];
			    //console.log(Bingo);
			    res.render('bingo90/rooms', {Bingo:Bingo});
			});
			//asyncs ends
	});
	
	app.get('/bingo90', function(req, res){ 
		//console.log(app.get('settings'), 'session3');
		//req.session.user_bought_card = false;
		if(!req.session.user || !req.session.game_id){
			res.redirect('/bingo90/rooms');
			return;
		}
		var cards_type = (req.query.cards_type)? true:false;
		var hrhh = moment(new Date()).tz("Europe/Amsterdam").format("hh");
		var hr = moment(new Date()).tz("Europe/Amsterdam").format("mmss");

		Bingo = {
			user : req.session.user.username,
			//user_bingo_credits:req.session.user_bingo_credits,
			//user_details : req.session.user,
			cards : req.session.cards,
			user_room : req.session.room_id,
			game_id : req.session.game_id,
			card_name : {},
			body_bg: req.session.body_bg,
			pin_bg: req.session.pin_bg,
			cards_type : cards_type,
			url : 'bingo90', //req.url
			game_round: 0,
			game_round_clr: '#fff'
		}
		
	
			var gameID = req.session.game_id;
			//try with async
			async.parallel([
			    function(callback) { 
			    	Room.findOne({_id:req.session.room_id}, callback);
			    },
			    /*function(callback) {
			    	Game90.findOne({'_id':gameID,'users.user':req.session.user.username},{'users.user.$': 1}, callback);
			    }*/
			    function(callback) {
			    	Game90.findOne({'_id':gameID}, callback);
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
		        if(hrhh % 2 == 0){ //console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA')
					//if(hr == "0001" || hr == "0601" || hr == "1001" || hr == '1601' || hr == "2001" || hr == "2601" || hr == "3001" || hr == "3601" || hr == "4001" || hr == "4601" || hr == "5001"){
						//console.log('VVVVVVVVVVVVVVVVVVVVVV')
			    		//if(hr < "0001" && hr > "5601"){ Bingo.game_round = 1; Bingo.game_round_clr = '#fc4000';}
			    		if(hr > "0001" && hr < "0601"){ Bingo.game_round = 1; Bingo.game_round_clr = '#9b0298';}
			    		if(hr > "0601" && hr < "1001"){ Bingo.game_round = 2; Bingo.game_round_clr = '#4e2900';}
			    		if(hr > "1001" && hr < "1601"){ Bingo.game_round = 3; Bingo.game_round_clr = '#fd02b1';}
			    		if(hr > "1601" && hr < "2001"){ Bingo.game_round = 4; Bingo.game_round_clr = '#00f05b';}
			    		if(hr > "2001" && hr < "2601"){ Bingo.game_round = 5; Bingo.game_round_clr = '#054F50';}
			    		if(hr > "2601" && hr < "3001"){ Bingo.game_round = 6; Bingo.game_round_clr = '#4D4880';}
			    		if(hr > "3001" && hr < "3601"){ Bingo.game_round = 7; Bingo.game_round_clr = '#C18E09';}
			    		if(hr > "3601" && hr < "4001"){ Bingo.game_round = 8; Bingo.game_round_clr = '#FF00FF';}
			    		if(hr > "4001" && hr < "4601"){ Bingo.game_round = 9; Bingo.game_round_clr = '#808000';}
			    		if(hr > "4601" && hr < "5001"){ Bingo.game_round = 10; Bingo.game_round_clr = '#800000';}
			    		if(hr > "5001" && hr < "5601"){ Bingo.game_round = 11; Bingo.game_round_clr = '#fc4000';}
				    //}
				}
			    Bingo.room  = results[0]; //rooms
			    //Bingo.gameinplay  = results[1]; //gameinplay
			    //console.log(results[1]);
			    for(var i=0;i<results[1].users.length;i++){
					if(results[1].users[i].user == req.session.user.username){
						Bingo.table = results[1].users[i].cards_table;
						Bingo.card_name = results[1].users[i].playing_card;
					} 
				}
			    
				Bingo.room_id = req.session.room_id;
				Bingo.marquee  = results[2].bingo90_broadcast_msg;
				Bingo.user_details = results[3];

			    
			    res.render('bingo90/bingo90', {Bingo:Bingo});
			});
			//asyncs ends
			

	}) //app get
	


}
