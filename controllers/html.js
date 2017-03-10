/*  
var bodyParser = require('body-parser');

// create parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });*/
var Room = require('../models/room');
var User = require('../models/user');
var Game = require('../models/game');
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
			user_role : req.session.user_role,
			url : 'index' //req.url
		}
	    res.render('index',{Bingo:Bingo})
	})

}
