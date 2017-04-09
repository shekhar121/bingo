
var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
		name: {type: String, unique:true},
		type: String,
		description: String,
		book1_cost:Number,
		book2_cost:Number,
		book3_cost:Number,
		book4_cost:Number,
		book5_cost:Number,
		book6_cost:Number,
		line1_prize:Number,
		line2_prize:Number,
		jackpot_prize:Number,
		jackpot_ball:{ type: Number, default: 90 },
		fullhouse_prize:Number,
		status:Boolean,
		card_price:Number,
		cards_upto : Number,
		card_balls_to_roll : Number,
		game_start_time: Date,
		if_open: Boolean
	});
roomSchema.statics.listRooms = function(type, func) {
	if(type == 'r75'){
		return this.find({"type":'bingo75'},  func);
	}
	if(type == 'r90'){
		return this.find({"type":'bingo90'},  func);
	}
};
roomSchema.statics.roomStatus = function(boolean, room_id) {
	//if(boolean){
		this.findOne({'_id':room_id},  function(err, room){
        	if(err){
				console.log(err,'error in updating room status to - '+boolean+'');
				return;
			}
			room.status = boolean;
			room.save(function(err, data){
		  		if(err){
		  			console.log(err,'could not update room status to - '+boolean+'');
		  			return;
		  		}
		  		return true;
	  		});
		});
	//} 
};
var Room = mongoose.model('room', roomSchema);
module.exports = Room;