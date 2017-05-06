
var express = require('express');
var session = require('express-session');
var controllers = require('./controllers');
//var bodyParser = require('body-parser');
//var html = require('./controllers/html');
var mongoose = require('mongoose'); 

mongoose.connect('mongodb://127.0.0.1:27017/bingo', function(err){
	if(err){
		console.log('mongodb could not connect', err);
		//res.render('error',{error:err})
		return err;
	}
	console.log('Mongodb Connected ..!')
});
var app = express();
var http = require('http').Server(app);

var port = process.env.PORT || 3030;



app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'sfsfsf78789gegwe7ew3',
  resave: false,
  saveUninitialized: true
}));

controllers.html(app);
controllers.api(app);
controllers.cbingo75(app);
controllers.cbingo90(app);
controllers.admin(app);
//controllers.chat75(http);
controllers.chat90(http);
//html(app);

http.listen(port);
console.log('Bingo started on: ', port);