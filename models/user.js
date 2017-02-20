
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
		username: {type: String, unique:true},
		password: String,
		firstname: String,
		lastname:String,
		total_credits:Number,
		total_games:Number,
		games_won:Number,
		games:[],
		updated: { type: Date, default: Date.now }
	});

var User = mongoose.model('user', userSchema);
module.exports = User;