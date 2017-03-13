var bodyParser = require('body-parser');
var Room = require('../models/room');
var User = require('../models/user');
var Game = require('../models/game');
var Setting = require('../models/setting');
var Bingo75 = require('../models/bingo75');
var Bingo = Bingo || {}; 
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(app){
// admin
	//admin_dashboard
	app.get('/admin', function(req, res){ 

		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : 'admin', //req.url
			title : 'Dashboard'
		}
		res.render('admin/admin_dashboard', {Bingo:Bingo});
	})
	//admin_dashboard - END
	//users
	app.get('/admin/users', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }
		Bingo = {
			user : 'req.session.user',
			url : '/admin/users', //req.url
			title : 'Registered Players'
		}
		User.listPlayers('all', function(err,users){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}
			Bingo.players = users;
			res.render('admin/admin_users', {Bingo:Bingo});
		})
		
	})
	//users ends Model.findOneAndUpdate(query, { name: 'jason borne' }, options, callback)
	//users banned
	app.get('/admin/users/banned', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }
		Bingo = {
			user : 'req.session.user',
			url : '/admin/users/banned', //req.url
			title : 'Banned Players'
		}
		User.listPlayers('ban', function(err,users){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}
			Bingo.players = users;
			res.render('admin/admin_users_banned', {Bingo:Bingo});
		})
		
	})
	//users banned ends
	//users free
	app.get('/admin/users/free', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }
		Bingo = {
			user : 'req.session.user',
			url : '/admin/users/free', //req.url
			title : 'Banned Players'
		}
		User.listPlayers('free', function(err,users){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}
			Bingo.players = users;
			res.render('admin/admin_users_free', {Bingo:Bingo});
		})
		
	})
	//users free ends
	//users ban
	app.get('/admin/users/ban/:id', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : '/admin/users' //req.url
		} 
		User.findOneAndUpdate({_id:req.params.id}, { ban: true }, function(err,data){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}
			res.redirect('/admin/users');
			return;
		})
		
	})
	//users ban ends
	//users unban
	app.get('/admin/users/unban/:id', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : '/admin/users' //req.url
		} 
		User.findOneAndUpdate({_id:req.params.id}, { ban: false }, function(err,data){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}
			res.redirect('/admin/users');
			return;
		})
		
	})
	//users unban ends
	//users del
	app.get('/admin/users/delete/:id', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : '/admin/users' //req.url
		} 
		User.findOneAndRemove({_id:req.params.id}, function(err,data){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}
			res.redirect('/admin/users');
			return;
		})
		
	})
	//users del ends
	//users view to edit
	app.get('/admin/users/view/:id', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : '/admin/users', //req.url
			title : 'View Players'
		} 
		User.findOne({_id:req.params.id},  function(err,user){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}

			Bingo.player = user;
			res.render('admin/admin_users_view', {Bingo:Bingo});
		})
		
	})
	//users view ends
	app.post('/admin/user/edit', jsonParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400);
	  	//var username = req.body.username;
	  	var firstname = req.body.firstname;
	  	var lastname = req.body.lastname;
	  	var _id = req.body.user_id;
	  	//var username = req.body.username;

	  	User.findOne({'_id':_id},  function(err, user){
        	if(err){
				res.status(500).send(err);
				return;
			}
			user.firstname = firstname;
			user.lastname = lastname;
			user.save(function(err, data){
		  		if(err){
		  			res.status(500).send(err);
		  			return;
		  		}
		  		//return res.status(200).json({username:data.username});
		  		res.redirect('/admin/users');
				return;
	  		});
		});

	  	
	})

	//room 75
	app.get('/admin/rooms75', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : '/admin/room75', //req.url
			title : 'Rooms 75'
		}
		Room.listRooms('r75', function(err,rooms){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}
			Bingo.rooms = rooms;
			res.render('admin/admin_rooms75', {Bingo:Bingo});
		})
	})
	//room 75 - end

	//room 90
	app.get('/admin/rooms90', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : '/admin/rooms90', //req.url
			title : 'Rooms 90'
		}
		Room.listRooms('r90', function(err,rooms){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}
			Bingo.rooms = rooms;
			res.render('admin/admin_rooms90', {Bingo:Bingo});
		})
	})
	//room 90  ends
	//rooms 75 view to edit
	app.get('/admin/rooms75/view/:id', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : '/admin/rooms/view75', //req.url
			title : 'View Room'
		} 
		Room.findOne({_id:req.params.id},  function(err,room){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}

			Bingo.room = room;
			res.render('admin/admin_rooms_view75', {Bingo:Bingo});
		})
		
	})
	//rooms 75  view ends
	//rooms 90 view to edit
	app.get('/admin/rooms90/view/:id', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : '/admin/rooms/view90', //req.url
			title : 'View Room'
		} 
		Room.findOne({_id:req.params.id},  function(err,room){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}

			Bingo.room = room;
			res.render('admin/admin_rooms_view90', {Bingo:Bingo});
		})
		
	})
	//rooms 990  view ends
	//rooom 75 edit view 
	app.post('/admin/room75/edit', jsonParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400);
	  	var firstname = req.body.name;
	  	var _id = req.body.room_id;


	  	Room.findOne({'_id':_id},  function(err, room){
        	if(err){
				res.status(500).send(err);
				return;
			}
			room.name = req.body.name;
			room.description = req.body.description;
			room.card_price= req.body.card_price;
			room.cards_upto = req.body.cards_upto;
			room.card_balls_to_roll = req.body.card_balls_to_roll;

			
			room.save(function(err, data){
		  		if(err){
		  			res.status(500).send(err);
		  			return;
		  		}
		  		//return res.status(200).json({username:data.username});
		  		res.redirect('/admin/rooms75/view/'+req.body.room_id);
				return;
	  		});
		});
	})
	//rooom 75 edit view

	app.post('/admin/room90/edit', jsonParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400);
	  	var firstname = req.body.name;
	  	var _id = req.body.room_id;


	  	Room.findOne({'_id':_id},  function(err, room){
        	if(err){
				res.status(500).send(err);
				return;
			}
			room.name = req.body.name;
			room.description = req.body.description;
			room.book1_cost = req.body.book1_cost;
			room.book2_cost = req.body.book2_cost;
			room.book3_cost = req.body.book3_cost;
			room.book4_cost = req.body.book4_cost;
			room.book5_cost = req.body.book5_cost;
			room.book6_cost = req.body.book6_cost;
			room.line1_prize = req.body.line1_prize;
			room.line2_prize = req.body.line2_prize;
			room.fullhouse_prize = req.body.fullhouse_prize;
			room.jackpot_prize = req.body.jackpot_prize;
			room.jackpot_ball = req.body.jackpot_ball;
			
			room.save(function(err, data){
		  		if(err){
		  			res.status(500).send(err);
		  			return;
		  		}
		  		//return res.status(200).json({username:data.username});
		  		res.redirect('/admin/rooms90/view/'+req.body.room_id);
				return;
	  		});
		});

	  	
	})
	//room 90 edit nds
	//setting view 
	app.get('/admin/setting/view', function(req, res){ 
		//if(!req.session.user){ res.redirect('/'); return; }
		//if(req.session.user_role != 'admin'){ res.redirect('/'); return; }

		Bingo = {
			user : 'req.session.user',
			url : '/admin/setting/view', //req.url
			title : 'View Settings'
		} 
		//Room.findOne({_id:req.params.id},  function(err,room){
		Setting.findOne({},  function(err,setting){
			if(err){ 
				res.status(500).send(err); 
				return; 
			}

			Bingo.setting = setting;
			res.render('admin/admin_setting_view', {Bingo:Bingo});
		})
		
	})
	//setting view ends
	//setting edit  
	app.post('/admin/setting/edit', jsonParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400);
	  	var firstname = req.body.name;
	  	var _id = req.body.setting_id;


	  	//Room.findOne({'_id':_id},  function(err, room){
	  	Setting.findOne({'_id':_id},  function(err, setting){
        	if(err){
				res.status(500).send(err);
				return;
			}

			setting.bingo75_broadcast_msg = req.body.bingo75_broadcast_msg;
			setting.bingo90_broadcast_msg = req.body.bingo90_broadcast_msg;
			
			
			setting.save(function(err, data){
		  		if(err){
		  			res.status(500).send(err);
		  			return;
		  		}
		  		//return res.status(200).json({username:data.username});
		  		res.redirect('/admin/setting/view/');
				return;
	  		});
		});

	  	
	})
	//room edit nds
}