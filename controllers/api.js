var bodyParser = require('body-parser');
var User = require('../models/user');

// create parser

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

// parse application/x-www-form-urlencoded 
app.use(urlencodedParser);
 // parse application/json 
app.use(jsonParser);

	app.post('/api/login', jsonParser, function(req, res){
		//res.json({email:req.body.email});
		if (!req.body) return res.sendStatus(400)
		var username = req.body.username;
	  	var password = req.body.password;

	  	var user = new User();
	  	user.username = username;
	  	user.password = password;

	  	User.findOne({username:username,password:password}, function(err, user){
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  		if(!user){
	  			res.status(404).send(err);
	  			return;
	  		}
	  		//console.log(user);
	  		req.session.user = user.username;
	  		//Bingo.username = user.username;
	  		app.set('settings', { username: user.username });
	  		return res.status(200).json({username:user.username});
	  	});
	})

	// POST /api/users gets JSON bodies
	app.post('/api/register', jsonParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400);
	  	var username = req.body.username;
	  	var password = req.body.password;
	  	var firstname = req.body.fname;
	  	var lastname = req.body.lname;
	  	//console.log(User);
	  	var newuser = new User();
	  	newuser.username = username;
	  	newuser.password = password;
	  	newuser.firstname = firstname;
	  	newuser.lastname = lastname;
	  	newuser.save(function(err, data){
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  		return res.status(200).json({username:data.username});
	  	});
	})
	// POST /api/total_credits gets JSON bodies
	app.post('/api/total_credits', jsonParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400);
	  	var total_credits = req.body.total_credits;
	  	var username = req.body.username;

	  	User.findOne({'_id':username},  function(err, user){
        	if(err){
				res.status(500).send(err);
				return;
			}
			user.total_credits = total_credits;
			user.save(function(err, data){
		  		if(err){
		  			res.status(500).send(err);
		  			return;
		  		}
		  		return res.status(200).json({username:data.username});
	  		});
		});

	  	
	})
	app.get('/api/user/:id', function(req, res){
	    //res.send('<h1>'+req.params.id+'</h1>')
	    res.render('user', {ID : req.params.id, URL:req.url, Q:req.query.q})
	})

	// POST /api/users gets JSON bodies
	app.get('/api/logout', function (req, res) {
	  req.session.user = null; //req.session.destroy();
	  res.redirect('/');
	  // create user in req.body
	})

	
	app.get('/api/login', function (req, res) {
	  //if (!req.body) return res.sendStatus(400)
	  res.send('hello');
	  // create user in req.body
	})
}


