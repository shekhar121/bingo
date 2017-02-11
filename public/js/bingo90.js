//window.onload = newCard;
/*function card_name(obj){
		for (var i=0; i<obj.cards; i++) { 
			obj.card_name_+i = [];
		}
	}*/ 
var Bingo90 = function(cards, pattern){
	this.cards = cards;
	this.pattern = pattern;
	this.card_name = {};
	this.winnerLine1 = 0;
	this.winnerLine1Shown = 0;
	this.winnerLine2 = 0;
	this.winnerLine2Shown = 0;
	this.winnerLine3 = 0;
	this.winnerLine3Shown = 0;
	this.patternTopLine = function(i){
		document.getElementById("card_"+i+"_square0").className = 'pattern';
		document.getElementById("card_"+i+"_square1").className = 'pattern';
		document.getElementById("card_"+i+"_square2").className = 'pattern';
		document.getElementById("card_"+i+"_square3").className = 'pattern';
		document.getElementById("card_"+i+"_square4").className = 'pattern';
		document.getElementById("card_"+i+"_square5").className = 'pattern';
		document.getElementById("card_"+i+"_square6").className = 'pattern';
		document.getElementById("card_"+i+"_square7").className = 'pattern';
		document.getElementById("card_"+i+"_square8").className = 'pattern';
	};
	this.patternMiddleLine = function(i){
		document.getElementById("card_"+i+"_square10").className = 'pattern';
		document.getElementById("card_"+i+"_square11").className = 'pattern';
		document.getElementById("card_"+i+"_square12").className = 'pattern';
		document.getElementById("card_"+i+"_square13").className = 'pattern';
		document.getElementById("card_"+i+"_square14").className = 'pattern';
		document.getElementById("card_"+i+"_square15").className = 'pattern';
		document.getElementById("card_"+i+"_square16").className = 'pattern';
		document.getElementById("card_"+i+"_square17").className = 'pattern';
		document.getElementById("card_"+i+"_square18").className = 'pattern';
	};
	this.patternBottomLine = function(i){
		document.getElementById("card_"+i+"_square20").className = 'pattern';
		document.getElementById("card_"+i+"_square21").className = 'pattern';
		document.getElementById("card_"+i+"_square22").className = 'pattern';
		document.getElementById("card_"+i+"_square23").className = 'pattern';
		document.getElementById("card_"+i+"_square24").className = 'pattern';
		document.getElementById("card_"+i+"_square25").className = 'pattern';
		document.getElementById("card_"+i+"_square26").className = 'pattern';
		document.getElementById("card_"+i+"_square27").className = 'pattern';
		document.getElementById("card_"+i+"_square28").className = 'pattern';
	}
	this.noPattern = function(i){
		document.getElementById("card_"+i+"_square0").className = 'pattern';
		document.getElementById("card_"+i+"_square1").className = 'pattern';
		document.getElementById("card_"+i+"_square2").className = 'pattern';
		document.getElementById("card_"+i+"_square3").className = 'pattern';
		document.getElementById("card_"+i+"_square4").className = 'pattern';
		document.getElementById("card_"+i+"_square5").className = 'pattern';
		document.getElementById("card_"+i+"_square6").className = 'pattern';
		document.getElementById("card_"+i+"_square7").className = 'pattern';
		document.getElementById("card_"+i+"_square8").className = 'pattern';
		document.getElementById("card_"+i+"_square10").className = 'pattern';
		document.getElementById("card_"+i+"_square11").className = 'pattern';
		document.getElementById("card_"+i+"_square12").className = 'pattern';
		document.getElementById("card_"+i+"_square13").className = 'pattern';
		document.getElementById("card_"+i+"_square14").className = 'pattern';
		document.getElementById("card_"+i+"_square15").className = 'pattern';
		document.getElementById("card_"+i+"_square16").className = 'pattern';
		document.getElementById("card_"+i+"_square17").className = 'pattern';
		document.getElementById("card_"+i+"_square18").className = 'pattern';
		document.getElementById("card_"+i+"_square20").className = 'pattern';
		document.getElementById("card_"+i+"_square21").className = 'pattern';
		document.getElementById("card_"+i+"_square22").className = 'pattern';
		document.getElementById("card_"+i+"_square23").className = 'pattern';
		document.getElementById("card_"+i+"_square24").className = 'pattern';
		document.getElementById("card_"+i+"_square25").className = 'pattern';
		document.getElementById("card_"+i+"_square26").className = 'pattern';
		document.getElementById("card_"+i+"_square27").className = 'pattern';
		document.getElementById("card_"+i+"_square28").className = 'pattern';
	};
	//card_name(this)
	this.noPatternWinner = function(counterBall){
		
		for (var i=0; i<this.cards; i++) {

			// top line macth
			
			var cell_val0 = document.getElementById("card_"+i+"_square0").innerHTML;
			if(cell_val0 == counterBall){
				document.getElementById("card_"+i+"_square0").className ='matched-cell';
				//topLine[i] = counterBall;
				this.card_name["card_"+i+"_square0"] = 1;
			}

			var cell_val2 = document.getElementById("card_"+i+"_square2").innerHTML;
			if(cell_val2 == counterBall){
				document.getElementById("card_"+i+"_square2").className ='matched-cell';
				//topLine[i] = counterBall;
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square2"] = 1;
			}
			var cell_val3 = document.getElementById("card_"+i+"_square3").innerHTML;
			if(cell_val3 == counterBall){
				document.getElementById("card_"+i+"_square3").className ='matched-cell';
				//topLine[i] = counterBall;
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square3"] = 1;
			}
			var cell_val7 = document.getElementById("card_"+i+"_square7").innerHTML;
			if(cell_val7 == counterBall){
				document.getElementById("card_"+i+"_square7").className ='matched-cell';
				//topLine[i] = counterBall;
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square7"] = 1;
			}
			var cell_val8 = document.getElementById("card_"+i+"_square8").innerHTML;
			if(cell_val8 == counterBall){
				document.getElementById("card_"+i+"_square8").className ='matched-cell';
				//topLine[i] = counterBall;
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square8"] = 1;
			}
			

			//middle line match
			var cell_val11 = document.getElementById("card_"+i+"_square11").innerHTML;
			if(cell_val11 == counterBall){
				document.getElementById("card_"+i+"_square11").className ='matched-cell';
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square11"] = 1;
			}

			var cell_val12 = document.getElementById("card_"+i+"_square12").innerHTML;
			if(cell_val12 == counterBall){
				document.getElementById("card_"+i+"_square12").className ='matched-cell';
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square12"] = 1;
			}
			var cell_val15 = document.getElementById("card_"+i+"_square15").innerHTML;
			if(cell_val15 == counterBall){
				document.getElementById("card_"+i+"_square15").className ='matched-cell';
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square15"] = 1;
			}
			var cell_val14 = document.getElementById("card_"+i+"_square14").innerHTML;
			if(cell_val14 == counterBall){
				document.getElementById("card_"+i+"_square14").className ='matched-cell';
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square14"] = 1;
			}
			var cell_val16 = document.getElementById("card_"+i+"_square16").innerHTML;
			if(cell_val16 == counterBall){
				document.getElementById("card_"+i+"_square16").className ='matched-cell';
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square16"] = 1;
			}
			
			//bottom line match
			var cell_val20 = document.getElementById("card_"+i+"_square20").innerHTML;
			if(cell_val20 == counterBall){
				document.getElementById("card_"+i+"_square20").className ='matched-cell';
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square20"] = 1;
			}

			var cell_val21 = document.getElementById("card_"+i+"_square21").innerHTML;
			if(cell_val21 == counterBall){
				document.getElementById("card_"+i+"_square21").className ='matched-cell';
				//this.card_name['card_name'+i].push(counterBall);
				this.card_name["card_"+i+"_square21"] = 1;
			}
			var cell_val23 = document.getElementById("card_"+i+"_square23").innerHTML;
			if(cell_val23 == counterBall){
				document.getElementById("card_"+i+"_square23").className ='matched-cell';
				this.card_name["card_"+i+"_square23"] = 1;
			}
			var cell_val25 = document.getElementById("card_"+i+"_square25").innerHTML;
			if(cell_val25 == counterBall){
				document.getElementById("card_"+i+"_square25").className ='matched-cell';
				this.card_name["card_"+i+"_square25"] = 1;
			}
			var cell_val28 = document.getElementById("card_"+i+"_square28").innerHTML;
			if(cell_val28 == counterBall){
				document.getElementById("card_"+i+"_square28").className ='matched-cell';
				this.card_name["card_"+i+"_square28"] = 1;
			}
			//console.log(this.card_name, 'care_name'+i);
			//for (var j=0; j<this.cards; j++) {
			// find any one line winner
				if(this.card_name["card_"+i+"_square0"]	&&
					this.card_name["card_"+i+"_square2"] &&
					this.card_name["card_"+i+"_square3"] &&
					this.card_name["card_"+i+"_square7"] &&
					this.card_name["card_"+i+"_square8"]){
					this.winnerLine1 = 1;
					//this.winnerLine1Shown = 1;
				}
				if(this.card_name["card_"+i+"_square11"]  &&
					this.card_name["card_"+i+"_square12"] &&
					this.card_name["card_"+i+"_square14"] &&
					this.card_name["card_"+i+"_square15"] &&
					this.card_name["card_"+i+"_square16"]){
					this.winnerLine1 = 1;
					//this.winnerLine2Shown = 1;
				}
				if(this.card_name["card_"+i+"_square20"]	&&
					this.card_name["card_"+i+"_square21"] &&
					this.card_name["card_"+i+"_square23"] &&
					this.card_name["card_"+i+"_square25"] &&
					this.card_name["card_"+i+"_square28"]){
					this.winnerLine1 = 1;
					//this.winnerLine3Shown = 1;
				}
			// END - find any one line winner
			// find any two line winner
			if((	this.card_name["card_"+i+"_square0"] &&
					this.card_name["card_"+i+"_square2"] &&
					this.card_name["card_"+i+"_square3"] &&
					this.card_name["card_"+i+"_square7"] &&
					this.card_name["card_"+i+"_square8"] && 
					this.card_name["card_"+i+"_square11"] &&
					this.card_name["card_"+i+"_square12"] &&
					this.card_name["card_"+i+"_square14"] &&
					this.card_name["card_"+i+"_square15"] &&
					this.card_name["card_"+i+"_square16"]) 
				||
				(	this.card_name["card_"+i+"_square11"] &&
					this.card_name["card_"+i+"_square12"] &&
					this.card_name["card_"+i+"_square14"] &&
					this.card_name["card_"+i+"_square15"] &&
					this.card_name["card_"+i+"_square16"] &&
					this.card_name["card_"+i+"_square20"] &&
					this.card_name["card_"+i+"_square21"] &&
					this.card_name["card_"+i+"_square23"] &&
					this.card_name["card_"+i+"_square25"] &&
					this.card_name["card_"+i+"_square28"])
				||
				(	this.card_name["card_"+i+"_square0"] &&
					this.card_name["card_"+i+"_square2"] &&
					this.card_name["card_"+i+"_square3"] &&
					this.card_name["card_"+i+"_square7"] &&
					this.card_name["card_"+i+"_square8"] && 
					this.card_name["card_"+i+"_square20"] &&
					this.card_name["card_"+i+"_square21"] &&
					this.card_name["card_"+i+"_square23"] &&
					this.card_name["card_"+i+"_square25"] &&
					this.card_name["card_"+i+"_square28"])){
					this.winnerLine2 = 1;
					this.winnerLine2Shown = 1;
				}
			// END - find two line winner
			// find full house line winner
				if(	this.card_name["card_"+i+"_square0"] &&
					this.card_name["card_"+i+"_square2"] &&
					this.card_name["card_"+i+"_square3"] &&
					this.card_name["card_"+i+"_square7"] &&
					this.card_name["card_"+i+"_square8"] && 
					this.card_name["card_"+i+"_square11"] &&
					this.card_name["card_"+i+"_square12"] &&
					this.card_name["card_"+i+"_square14"] &&
					this.card_name["card_"+i+"_square15"] &&
					this.card_name["card_"+i+"_square16"] &&
					this.card_name["card_"+i+"_square20"] &&
					this.card_name["card_"+i+"_square21"] &&
					this.card_name["card_"+i+"_square23"] &&
					this.card_name["card_"+i+"_square25"] &&
					this.card_name["card_"+i+"_square28"]){
					this.winnerLine3 = 1;
					this.winnerLine3Shown = 1;
				}
			//END - find full house line winner
			//}
			/*if(this.card_name['card_name'+i].length == 5){
				winnerLine2 = 1;
			}
			if(this.card_name['card_name'+i].length == 5){
				winnerLine1 = 1;
				this.card_name['card_name'+i] = [];
				console.log('card_name'+i+' is a winner')
			}
			if(this.card_name['card_name'+i].length == 5){
				winnerLine3 = 1;
			}*/
			

	    }
	};
	this.patternTopLineWinner = function(counterBall){
	
		for (var i=0; i<this.cards; i++) {

			//console.log(document.getElementById("card_"+i+"_square0").innerHTML);
			//console.log(cell_val0);
			var cell_val0 = document.getElementById("card_"+i+"_square0").innerHTML;
			if(cell_val0 == counterBall){
				document.getElementById("card_"+i+"_square0").className ='matched-cell';
			}

			var cell_val2 = document.getElementById("card_"+i+"_square2").innerHTML;
			if(cell_val2 == counterBall){
				document.getElementById("card_"+i+"_square2").className ='matched-cell';
			}
			var cell_val3 = document.getElementById("card_"+i+"_square3").innerHTML;
			if(cell_val3 == counterBall){
				document.getElementById("card_"+i+"_square3").className ='matched-cell';
			}
			var cell_val7 = document.getElementById("card_"+i+"_square7").innerHTML;
			if(cell_val7 == counterBall){
				document.getElementById("card_"+i+"_square7").className ='matched-cell';
			}
			var cell_val8 = document.getElementById("card_"+i+"_square8").innerHTML;
			if(cell_val8 == counterBall){
				document.getElementById("card_"+i+"_square8").className ='matched-cell';
			}

	    }
	};
    this.patternMiddleLineWinner = function(counterBall){
	
		for (var i=0; i<this.cards; i++) { 
			var cell_val11 = document.getElementById("card_"+i+"_square11").innerHTML;
			if(cell_val11 == counterBall){
				document.getElementById("card_"+i+"_square11").className ='matched-cell';
			}

			var cell_val12 = document.getElementById("card_"+i+"_square12").innerHTML;
			if(cell_val12 == counterBall){
				document.getElementById("card_"+i+"_square12").className ='matched-cell';
			}
			var cell_val15 = document.getElementById("card_"+i+"_square15").innerHTML;
			if(cell_val15 == counterBall){
				document.getElementById("card_"+i+"_square15").className ='matched-cell';
			}
			var cell_val14 = document.getElementById("card_"+i+"_square14").innerHTML;
			if(cell_val14 == counterBall){
				document.getElementById("card_"+i+"_square14").className ='matched-cell';
			}
			var cell_val16 = document.getElementById("card_"+i+"_square16").innerHTML;
			if(cell_val16 == counterBall){
				document.getElementById("card_"+i+"_square16").className ='matched-cell';
			}

		}
    /*this.getRandomInt = function (min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}*/
	};
	this.patternBottomLineWinner = function(counterBall){
	
		for (var i=0; i<this.cards; i++) { 
			var cell_val20 = document.getElementById("card_"+i+"_square20").innerHTML;
			if(cell_val20 == counterBall){
				document.getElementById("card_"+i+"_square20").className ='matched-cell';
			}

			var cell_val21 = document.getElementById("card_"+i+"_square21").innerHTML;
			if(cell_val21 == counterBall){
				document.getElementById("card_"+i+"_square21").className ='matched-cell';
			}
			var cell_val23 = document.getElementById("card_"+i+"_square23").innerHTML;
			if(cell_val23 == counterBall){
				document.getElementById("card_"+i+"_square23").className ='matched-cell';
			}
			var cell_val25 = document.getElementById("card_"+i+"_square25").innerHTML;
			if(cell_val25 == counterBall){
				document.getElementById("card_"+i+"_square25").className ='matched-cell';
			}
			var cell_val28 = document.getElementById("card_"+i+"_square28").innerHTML;
			if(cell_val28 == counterBall){
				document.getElementById("card_"+i+"_square28").className ='matched-cell';
			}

		}
    /*this.getRandomInt = function (min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}*/
	};
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createCards(obj){  //console.log(obj);
		for (var i=0; i<obj.cards; i++) {
			obj.card_name['card_'+i+'_square0'] = 0;
			obj.card_name['card_'+i+'_square2'] = 0;
			obj.card_name['card_'+i+'_square3'] = 0;
			obj.card_name['card_'+i+'_square7'] = 0;
			obj.card_name['card_'+i+'_square8'] = 0;

			obj.card_name['card_'+i+'_square11'] = 0;
			obj.card_name['card_'+i+'_square12'] = 0;
			obj.card_name['card_'+i+'_square14'] = 0;
			obj.card_name['card_'+i+'_square15'] = 0;
			obj.card_name['card_'+i+'_square16'] = 0;

			obj.card_name['card_'+i+'_square20'] = 0;
			obj.card_name['card_'+i+'_square21'] = 0;
			obj.card_name['card_'+i+'_square23'] = 0;
			obj.card_name['card_'+i+'_square25'] = 0;
			obj.card_name['card_'+i+'_square28'] = 0;
		}
		console.log(obj.card_name);
	}
/*Bingo90.prototype.createCards = function (){
		for (var i=0; i<this.cards; i++) {
			var card_name_+i = [];
		}
	}*/

Bingo90.prototype.newCard = function() { console.log(this.cards,'newCard');
	createCards(this);
    for (var i=0; i<this.cards; i++) { 
        //for (var j=0; j<30; j=j+5) {
            var num = getRandomInt(1, 20);
            document.getElementById("card_"+i+"_square0").innerHTML = num;
            this.card_name['card_'+i+'_square0'] = num;
            //var num = getRandomInt(1, 20);
            //document.getElementById("card_"+i+"_square10").innerHTML = num;
            var num = getRandomInt(1, 20);
            document.getElementById("card_"+i+"_square20").innerHTML = num;
            this.card_name['card_'+i+'_square20'] = num;
            //var num = getRandomInt(11, 20);
            //document.getElementById("card_"+i+"_square1").innerHTML = num;
            var num = getRandomInt(11, 20);
            document.getElementById("card_"+i+"_square11").innerHTML = num;
            this.card_name['card_'+i+'_square11'] = num;
            var num = getRandomInt(11, 20);
            document.getElementById("card_"+i+"_square21").innerHTML = num;
            this.card_name['card_'+i+'_square21'] = num;

            var num = getRandomInt(21, 30);
            document.getElementById("card_"+i+"_square2").innerHTML = num;
            this.card_name['card_'+i+'_square2'] = num;
            var num = getRandomInt(21, 30);
            document.getElementById("card_"+i+"_square12").innerHTML = num;
            this.card_name['card_'+i+'_square12'] = num;
            //var num = getRandomInt(21, 30);
            //document.getElementById("card_"+i+"_square22").innerHTML = num;

            var num = getRandomInt(31, 40);
            document.getElementById("card_"+i+"_square3").innerHTML = num;
            this.card_name['card_'+i+'_square3'] = num;
            //var num = getRandomInt(31, 40);
            //document.getElementById("card_"+i+"_square13").innerHTML = num;
            var num = getRandomInt(31, 40);
            document.getElementById("card_"+i+"_square23").innerHTML = num;
            this.card_name['card_'+i+'_square23'] = num;

            //var num = getRandomInt(41, 50);
            //document.getElementById("card_"+i+"_square4").innerHTML = num;
            var num = getRandomInt(41, 50);
            document.getElementById("card_"+i+"_square14").innerHTML = num;
            this.card_name['card_'+i+'_square14'] = num;
            //var num = getRandomInt(41, 50);
            //document.getElementById("card_"+i+"_square24").innerHTML = num;

            //var num = getRandomInt(51, 60);
            //document.getElementById("card_"+i+"_square5").innerHTML = num;
            var num = getRandomInt(51, 60);
            document.getElementById("card_"+i+"_square15").innerHTML = num;
            this.card_name['card_'+i+'_square15'] = num;
            var num = getRandomInt(51, 60);
            document.getElementById("card_"+i+"_square25").innerHTML = num;
            this.card_name['card_'+i+'_square25'] = num;
            //var num = getRandomInt(61, 70);
            //document.getElementById("card_"+i+"_square6").innerHTML = num;
            var num = getRandomInt(61, 70);
            document.getElementById("card_"+i+"_square16").innerHTML = num;
            this.card_name['card_'+i+'_square16'] = num;
            //var num = getRandomInt(61, 70);
            //document.getElementById("card_"+i+"_square26").innerHTML = num;

            var num = getRandomInt(71, 80);
            document.getElementById("card_"+i+"_square7").innerHTML = num;
            this.card_name['card_'+i+'_square7'] = num;
            //var num = getRandomInt(71, 80);
            //document.getElementById("card_"+i+"_square17").innerHTML = num;
            //var num = getRandomInt(71, 80);
            //document.getElementById("card_"+i+"_square27").innerHTML = num;

            var num = getRandomInt(81, 90);
            document.getElementById("card_"+i+"_square8").innerHTML = num;
            this.card_name['card_'+i+'_square8'] = num;
            //var num = getRandomInt(81, 90);
            //document.getElementById("card_"+i+"_square18").innerHTML = num;
            var num = getRandomInt(81, 90);
            document.getElementById("card_"+i+"_square28").innerHTML = num;
            this.card_name['card_'+i+'_square28'] = num;

            if(this.pattern == 'TopLine'){
            	this.patternTopLine(i);
            } else if(this.pattern == 'BottomLine'){
            	this.patternBottomLine(i);
            } else if(this.pattern == 'MiddleLine'){
            	this.patternMiddleLine(i);
            } else {
            	this.noPattern(i);
            }
    }
    console.log(this, 'my object');
}
Bingo90.prototype.patternWinner = function(counterBall){
	if(this.pattern == 'TopLine'){
    	this.patternTopLineWinner(counterBall);
    } else if(this.pattern == 'BottomLine'){
    	this.patternBottomLineWinner(counterBall);
    } else if(this.pattern == 'MiddleLine'){
    	this.patternMiddleLineWinner(counterBall);
    } else {
    	this.noPatternWinner(counterBall);
    }
}

Bingo90.prototype.patternT= function(counterBall){

}
