
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
		username: {type: String, unique:true},
		password: String,
		firstname: String,
		lastname:String,
		role:{ type: String, default: 'user' },
		total_credits:{ type: Number, default: 0 },
		total_games:{ type: Number, default: 0 },
		games_won:{ type: Number, default: 0 },
		ban:{ type: Boolean, default: false },
		activated:{ type: Boolean, default: false },
		paid:{ type: Boolean, default: false },
		games:[],
		updated: { type: Date, default: Date.now }
	});
//"ban": { $exists: false, $ne: null, $lt: time } 
userSchema.statics.listPlayers = function(type, func) {
	if(type == 'ban'){
		return this.find({"ban":true,"role" : { "$ne": 'admin'}},  func);
	}
	if(type == 'free'){
		return this.find({"paid":false,"role" : { "$ne": 'admin'}},  func);
	}
	if(type == 'all'){
		return this.find({"ban":false,"role" : { "$ne": 'admin'}},  func);
	}
};
/*userSchema.statics.banPlayer = function(id, func) {
  return this.find({"role" : { "$ne": 'admin' }}, func);
};*/

var User = mongoose.model('user', userSchema);
module.exports = User;