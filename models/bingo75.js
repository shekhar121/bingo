function getRandomInt(min, max) { 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createCards(obj){ 
    for (var i=0; i<obj.cards; i++) {
        for (var j=0; j<24; j++) {
            obj.card_name['card_'+i+'_square0'] = 0;
        }
    }
    console.log(obj.card_name);
}

var Bingo75 = function(cards, pattern){
	this.cards = cards;
	this.pattern = pattern;
	this.card_name = {};

	this.sayHello = function(){
		return 'Hello' + this.cards;
	}
    this.getRandomInt = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this.getCard_name = function () {
      return this.card_name;
    }
	this.newCards = function(){
        createCards(this);
		var table = '';
        var nm = 0;
		if(this.cards > 0){
            for(var i=0; i < this.cards; i++) {
                
                var num0 = this.getRandomInt(1, 15);
                this.card_name['card_'+i+'_square0'] = num0;
                var num1 = this.getRandomInt(16, 30);
                this.card_name['card_'+i+'_square1'] = num1;
                var num2 = this.getRandomInt(31, 45);
                this.card_name['card_'+i+'_square2'] = num2;
                var num3 = this.getRandomInt(46, 60);
                this.card_name['card_'+i+'_square3'] = num3;
                var num4 = this.getRandomInt(61, 75);
                this.card_name['card_'+i+'_square4'] = num4;

                var num7 = this.getRandomInt(31, 45);
                this.card_name['card_'+i+'_square7'] = num7;
                var num16 = this.getRandomInt(31, 45);
                this.card_name['card_'+i+'_square16'] = num16;
                var num21 = this.getRandomInt(31, 45);
                this.card_name['card_'+i+'_square21'] = num21;

        table += '<div class="col-md-3">\
                    <div class="card75">\
                    <table class="table75 pattern" id="card_'+i+'">\
                        <tr>\
                            <th width="20%">B</th>\
                            <th width="20%">I</th>\
                            <th width="20%">N</th>\
                            <th width="20%">G</th>\
                            <th width="20%">O</th>\
                        </tr>\
                        <tr>\
                            <td id="card_'+i+'_square0" class="pattern">'+num0+'</td>\
                            <td id="card_'+i+'_square1" class="pattern">'+num1+'</td>\
                            <td id="card_'+i+'_square2" class="pattern">'+num2+'</td>\
                            <td id="card_'+i+'_square3" class="pattern">'+num3+'</td>\
                            <td id="card_'+i+'_square4" class="pattern">'+num4+'</td>\
                        </tr>\
                        <tr>\
                            <td id="card_'+i+'_square5">&nbsp;</td>\
                            <td id="card_'+i+'_square6">&nbsp;</td>\
                            <td id="card_'+i+'_square7" class="pattern">'+num7+'</td>\
                            <td id="card_'+i+'_square8">&nbsp;</td>\
                            <td id="card_'+i+'_square9">&nbsp;</td>\
                        </tr>\
                        <tr>\
                            <td id="card_'+i+'_square10">&nbsp;</td>\
                            <td id="card_'+i+'_square11">&nbsp;</td>\
                            <td id="card_'+i+'_free" class="free_square">Free</td>\
                            <td id="card_'+i+'_square12">&nbsp;</td>\
                            <td id="card_'+i+'_square13">&nbsp;</td>\
                        </tr>\
                        <tr>\
                            <td id="card_'+i+'_square14">&nbsp;</td>\
                            <td id="card_'+i+'_square15">&nbsp;</td>\
                            <td id="card_'+i+'_square16" class="pattern">'+num16+'</td>\
                            <td id="card_'+i+'_square17">&nbsp;</td>\
                            <td id="card_'+i+'_square18">&nbsp;</td>\
                        </tr>\
                        <tr>\
                            <td id="card_'+i+'_square19">&nbsp;</td>\
                            <td id="card_'+i+'_square20">&nbsp;</td>\
                            <td id="card_'+i+'_square21" class="pattern">'+num21+'</td>\
                            <td id="card_'+i+'_square22">&nbsp;</td>\
                            <td id="card_'+i+'_square23">&nbsp;</td>\
                        </tr>\
                    </table>\
                    </div>\
                    </div>';
                }
            }
        return table;
	}
    this.winner75 = function(data){
        //console.log(data.users, 'from hee'); return;
        for(usr in data.users){
            //data.card_name = data.users[usr];

            var obj_length = Object.keys(data.users[usr]).length;
            console.log(obj_length, 'in winner75..');
            for(key in data.users[usr]){
                if(data.users[usr][key] == data.counter_ball){
                    data.users[usr][key] = 'matched';
                }
            }
            if(data.pattern == 'T'){
                for(i=0;i<obj_length;i++){
                    //T patter winner
                    if( data.users[usr]["card_"+i+"_square0"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square1"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square2"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square3"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square4"] == 'matched' && 
                        data.users[usr]["card_"+i+"_square7"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square16"] == 'matched' &&
                        data.users[usr]["card_"+i+"_square21"] == 'matched'){
                        data.winner75 = 1;
                        data.winner75User = usr;
                    }
                } 
            }
            data.card_name[usr] = data.users[usr];
        }
        
        return data;
    }
}

module.exports = Bingo75;