var bodyParser = require('body-parser');
var User = require('../models/user');
var Room = require('../models/room');
var Pchat= require('../models/pchat');
var passwordHash = require('password-hash');
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
	  	//var hashedPassword = passwordHash.generate(password);
		//passwordHash.verify('password123', hashedPassword)
	  	/*var user = new User();
	  	user.username = username;
	  	user.password = password;*/

	  	//User.findOne({username:username,password:password}, function(err, user){
	  	User.findOne({username:username}, function(err, user){
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  		if(!user){
	  			res.status(404).send('username do not match');
	  			return;
	  		}
	  		//console.log(password, user);
	  		if(!passwordHash.verify(password, user.password)){
	  			res.status(404).send('password do not match');
	  			return;
	  		}
	  		
	  		//req.session.user = user.username;
	  		user.password = null;
	  		req.session.user = user;
	  		console.log(req.session.user.username,'user.role');
	  		req.session.user_role = (user.role)?user.role:'user';
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
	  	var hashedPassword = passwordHash.generate(password);
	  	//console.log(User);
	  	var newuser = new User();
	  	newuser.username = username;
	  	newuser.password = hashedPassword;
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
	app.post('/api/gotobingo90', jsonParser, function(req, res){
		if (!req.body) return res.sendStatus(400)
			req.session.body_bg = req.body.Room.body_bg;
			req.session.pin_bg = req.body.Room.pin_bg;
			req.session.cards = req.body.Room.cards;
			req.session.room_id = req.body.Room.room_id;
			req.session.game_id =  req.body.Room.game_id;
			return res.status(200).json({status:true});
	});
	// POST /api/total_credits gets JSON bodies
	app.post('/api/total_credits', jsonParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400);
	  	var total_credits = parseInt(req.body.total_credits);
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

	// POST /api/ gets JSON bodies
	app.post('/api/pchat', jsonParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400);
	  	var sender = req.body.sender;
	  	var receiver = req.body.receiver;
	  	var msg = req.body.msg;
	  	var date = new Date();
	  	var read = false;
	  	//console.log(User);
	  	var pchat = new Pchat();
	  	pchat.sender = sender;
	  	pchat.receiver = receiver;
	  	pchat.msg = msg;
	  	pchat.date = date;
	  	pchat.read = read;
	  	pchat.save(function(err, data){
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  		return res.status(200).json({data:data});
	  	});
	})

	app.post('/api/get_chat_buddies', jsonParser, function(req, res){
		if (!req.body) return res.sendStatus(400)
		var username = req.body.username;
		Pchat.aggregate(
		    [	
		    	//{ "$match": { "receiver": username , read: false}  },
		    	{ "$match": { "receiver": username , read: false}  },
		        // Grouping pipeline
		        { "$group": { 
		            "_id": '$sender', 
		            "count": { "$sum": 1 }
		        }},
		        // Sorting pipeline
		        { "$sort": { "sender": -1 } },
		        // Optionally limit results
		        { "$limit": 5 }
		    ],
		    function(err,result) {
		    	return res.status(200).json({data:result});
		    }
		);
	})
	app.post('/api/get_chat_data', jsonParser, function(req, res){

		if (!req.body) return res.sendStatus(400)
		var username = req.body.username;
		var sender= req.body.sender;
		//{ $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}
	  	//Pchat.find({receiver:username, sender:sender}).limit(5).exec(function(err, data){
	  	Pchat.find({
			      $or: [
			          { $and: [{receiver:username}, {sender:sender}] },
			          { $and: [{receiver:sender}, {sender:username}] }
			      ]
			  }).limit(10).sort('-date').exec(function(err, data){
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  		if(!data){
	  			res.status(404).send(err);
	  			return;
	  		}
	  		//update read status
	  		Pchat.update({receiver:username,sender:sender}, { read: true }, { multi: true }, function (err, raw) {
			  if (err){
			  	res.status(404).send(err); 
			  	return;
			  } 
			  console.log('The raw response from Mongo was ', raw);
			});

	  		//console.log(data)
	  		return res.status(200).json({data:data});
	  	});
	})
	//credit transfer to bingo credit
	app.post('/api/transfer_credits', jsonParser, function(req, res){
		//res.json({email:req.body.email});
		if (!req.body) return res.sendStatus(400)
		var total_credits = req.body.total_credits;
	  	var transfer_credits = req.body.transfer_credits;
	  	var bingo_credits = total_credits-transfer_credits;
	  	req.session.user_bingo_credits = transfer_credits;
	  	return res.status(200).json({transfer_credits:transfer_credits});
	  	
	});

	app.get('/api/login', function (req, res) {
	  //if (!req.body) return res.sendStatus(400)
	  res.send('hello');
	  // create user in req.body
	})
}


