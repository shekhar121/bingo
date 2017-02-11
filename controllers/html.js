/* 
var bodyParser = require('body-parser');

// create parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });*/
var Room = require('../models/room');
var User = require('../models/user');
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
		        bingo90 = new Bingo90(Bingo.cards, 'none');
        		Bingo.table = bingo90.newCards();
        		Bingo.card_name = JSON.stringify(bingo90.getCard_name());
				console.log(Bingo.card_name,'object -- Bingo');

				res.render('bingo90', {Bingo:Bingo})
			})
		//res.render('bingo90', {Bingo:Bingo})
		})
	    
	})
	

}
