var Room = require('../models/room');
var User = require('../models/user');
var Game = require('../models/game');
var Bingo = Bingo || {}; 

module.exports = function(app){
	app.get('/', function(req, res){
		Bingo = {
			user : req.session.user,
			user_role : req.session.user_role,
			url : 'index' //req.url
		}
	    res.render('index',{Bingo:Bingo})
	})

	app.get('/about-us', function(req, res){
		Bingo = {
			user : req.session.user,
			user_role : req.session.user_role,
			url : 'about-us' //req.url
		}
	    res.render('about-us',{Bingo:Bingo})
	})

	app.get('/terms-and-conditions', function(req, res){
		Bingo = {
			user : req.session.user,
			user_role : req.session.user_role,
			url : 'terms-and-conditions' //req.url
		}
	    res.render('terms-and-conditions',{Bingo:Bingo})
	})

	app.get('/copyright', function(req, res){
		Bingo = {
			user : req.session.user,
			user_role : req.session.user_role,
			url : 'copyright' //req.url
		}
	    res.render('copyright',{Bingo:Bingo})
	})

	app.get('/privacy-policy', function(req, res){
		Bingo = {
			user : req.session.user,
			user_role : req.session.user_role,
			url : 'privacy-policy' //req.url
		}
	    res.render('privacy-policy',{Bingo:Bingo})
	})

	app.get('/responsible-gaming', function(req, res){
		Bingo = {
			user : req.session.user,
			user_role : req.session.user_role,
			url : 'responsible-gaming' //req.url
		}
	    res.render('responsible-gaming',{Bingo:Bingo})
	})
	
	app.get('/depositbonus', function(req, res){
		Bingo = {
			user : req.session.user,
			user_role : req.session.user_role,
			url : 'depositbonus' //req.url
		}
	    res.render('depositbonus',{Bingo:Bingo})
	})

}
