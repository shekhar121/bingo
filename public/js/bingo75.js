//window.onload = newCard;
var Bingo75 = function(cards, pattern){ 
	this.cards = cards,
	this.pattern = pattern,
	this.patternT = function(i){
		document.getElementById("card_"+i+"_square0").className = 'pattern';
		document.getElementById("card_"+i+"_square1").className = 'pattern';
		document.getElementById("card_"+i+"_square2").className = 'pattern';
		document.getElementById("card_"+i+"_square3").className = 'pattern';
		document.getElementById("card_"+i+"_square4").className = 'pattern';
		document.getElementById("card_"+i+"_square7").className = 'pattern';
		document.getElementById("card_"+i+"_square16").className = 'pattern';
		document.getElementById("card_"+i+"_square21").className = 'pattern';
	}
	this.patternZ = function(i){
		document.getElementById("card_"+i+"_square0").className = 'pattern';
		document.getElementById("card_"+i+"_square1").className = 'pattern';
		document.getElementById("card_"+i+"_square2").className = 'pattern';
		document.getElementById("card_"+i+"_square3").className = 'pattern';
		document.getElementById("card_"+i+"_square4").className = 'pattern';
		document.getElementById("card_"+i+"_square8").className = 'pattern';
		document.getElementById("card_"+i+"_square15").className = 'pattern';
		document.getElementById("card_"+i+"_square19").className = 'pattern';
		document.getElementById("card_"+i+"_square20").className = 'pattern';
		document.getElementById("card_"+i+"_square21").className = 'pattern';
		document.getElementById("card_"+i+"_square22").className = 'pattern';
		document.getElementById("card_"+i+"_square23").className = 'pattern';
	}
	this.patternI = function(i){
		document.getElementById("card_"+i+"_square0").className = 'pattern';
		document.getElementById("card_"+i+"_square1").className = 'pattern';
		document.getElementById("card_"+i+"_square2").className = 'pattern';
		document.getElementById("card_"+i+"_square3").className = 'pattern';
		document.getElementById("card_"+i+"_square4").className = 'pattern';
		document.getElementById("card_"+i+"_square7").className = 'pattern';
		document.getElementById("card_"+i+"_square16").className = 'pattern';
		document.getElementById("card_"+i+"_square19").className = 'pattern';
		document.getElementById("card_"+i+"_square20").className = 'pattern';
		document.getElementById("card_"+i+"_square21").className = 'pattern';
		document.getElementById("card_"+i+"_square22").className = 'pattern';
		document.getElementById("card_"+i+"_square23").className = 'pattern';
	}
	this.patternArrowTop = function(i){
		document.getElementById("card_"+i+"_square2").className = 'pattern';
		document.getElementById("card_"+i+"_square7").className = 'pattern';
		document.getElementById("card_"+i+"_square16").className = 'pattern';
		document.getElementById("card_"+i+"_square21").className = 'pattern';
		document.getElementById("card_"+i+"_square6").className = 'pattern';
		document.getElementById("card_"+i+"_square8").className = 'pattern';
		document.getElementById("card_"+i+"_square10").className = 'pattern';
		document.getElementById("card_"+i+"_square13").className = 'pattern';
	}
	this.patternArrowBottom = function(i){
		document.getElementById("card_"+i+"_square2").className = 'pattern';
		document.getElementById("card_"+i+"_square7").className = 'pattern';
		document.getElementById("card_"+i+"_square16").className = 'pattern';
		document.getElementById("card_"+i+"_square21").className = 'pattern';
		document.getElementById("card_"+i+"_square15").className = 'pattern';
		document.getElementById("card_"+i+"_square17").className = 'pattern';
		document.getElementById("card_"+i+"_square10").className = 'pattern';
		document.getElementById("card_"+i+"_square13").className = 'pattern';
	}
	this.patternTWinner = function(counterBall){
	
	for (var i=0; i<this.cards; i++) { 
		//console.log(document.getElementById("card_"+i+"_square0").innerHTML);
		//console.log(cell_val0);
		var cell_val0 = document.getElementById("card_"+i+"_square0").innerHTML;
		if(cell_val0 == counterBall){
			document.getElementById("card_"+i+"_square0").className ='matched-cell';
		}
		var cell_val1 = document.getElementById("card_"+i+"_square1").innerHTML;
		if(cell_val1 == counterBall){
			document.getElementById("card_"+i+"_square1").className ='matched-cell';
		}
		var cell_val2 = document.getElementById("card_"+i+"_square2").innerHTML;
		if(cell_val2 == counterBall){
			document.getElementById("card_"+i+"_square2").className ='matched-cell';
		}
		var cell_val3 = document.getElementById("card_"+i+"_square3").innerHTML;
		if(cell_val3 == counterBall){
			document.getElementById("card_"+i+"_square3").className ='matched-cell';
		}
		var cell_val4 = document.getElementById("card_"+i+"_square4").innerHTML;
		if(cell_val4 == counterBall){
			document.getElementById("card_"+i+"_square4").className ='matched-cell';
		}
		var cell_val7 = document.getElementById("card_"+i+"_square7").innerHTML;
		if(cell_val7 == counterBall){
			document.getElementById("card_"+i+"_square7").className ='matched-cell';
		}
		var cell_val16 = document.getElementById("card_"+i+"_square16").innerHTML;
		if(cell_val16 == counterBall){
			document.getElementById("card_"+i+"_square16").className ='matched-cell';
		}
		var cell_val21 = document.getElementById("card_"+i+"_square21").innerHTML;
		if(cell_val21 == counterBall){
			document.getElementById("card_"+i+"_square21").className ='matched-cell';
		}
    }
}

this.patternZWinner = function(counterBall){
	
	for (var i=0; i<this.cards; i++) { 
		//console.log(document.getElementById("card_"+i+"_square0").innerHTML);
		//console.log(cell_val0);
		var cell_val0 = document.getElementById("card_"+i+"_square0").innerHTML;
		if(cell_val0 == counterBall){
			document.getElementById("card_"+i+"_square0").className ='matched-cell';
		}
		var cell_val1 = document.getElementById("card_"+i+"_square1").innerHTML;
		if(cell_val1 == counterBall){
			document.getElementById("card_"+i+"_square1").className ='matched-cell';
		}
		var cell_val2 = document.getElementById("card_"+i+"_square2").innerHTML;
		if(cell_val2 == counterBall){
			document.getElementById("card_"+i+"_square2").className ='matched-cell';
		}
		var cell_val3 = document.getElementById("card_"+i+"_square3").innerHTML;
		if(cell_val3 == counterBall){
			document.getElementById("card_"+i+"_square3").className ='matched-cell';
		}
		var cell_val4 = document.getElementById("card_"+i+"_square4").innerHTML;
		if(cell_val4 == counterBall){
			document.getElementById("card_"+i+"_square4").className ='matched-cell';
		}
		var cell_val8 = document.getElementById("card_"+i+"_square8").innerHTML;
		if(cell_val8 == counterBall){
			document.getElementById("card_"+i+"_square8").className ='matched-cell';
		}
		var cell_val15 = document.getElementById("card_"+i+"_square15").innerHTML;
		if(cell_val15 == counterBall){
			document.getElementById("card_"+i+"_square15").className ='matched-cell';
		}
		var cell_val19 = document.getElementById("card_"+i+"_square19").innerHTML;
		if(cell_val19 == counterBall){
			document.getElementById("card_"+i+"_square19").className ='matched-cell';
		}
		var cell_val20 = document.getElementById("card_"+i+"_square20").innerHTML;
		if(cell_val20 == counterBall){
			document.getElementById("card_"+i+"_square20").className ='matched-cell';
		}
		var cell_val21 = document.getElementById("card_"+i+"_square21").innerHTML;
		if(cell_val21 == counterBall){
			document.getElementById("card_"+i+"_square21").className ='matched-cell';
		}
		var cell_val22 = document.getElementById("card_"+i+"_square22").innerHTML;
		if(cell_val22 == counterBall){
			document.getElementById("card_"+i+"_square22").className ='matched-cell';
		}
		var cell_val23 = document.getElementById("card_"+i+"_square23").innerHTML;
		if(cell_val23 == counterBall){
			document.getElementById("card_"+i+"_square23").className ='matched-cell';
		}
    }
}
this.patternIWinner = function(counterBall){
	
	for (var i=0; i<this.cards; i++) { 
		//console.log(document.getElementById("card_"+i+"_square0").innerHTML);
		//console.log(cell_val0);
		var cell_val0 = document.getElementById("card_"+i+"_square0").innerHTML;
		if(cell_val0 == counterBall){
			document.getElementById("card_"+i+"_square0").className ='matched-cell';
		}
		var cell_val1 = document.getElementById("card_"+i+"_square1").innerHTML;
		if(cell_val1 == counterBall){
			document.getElementById("card_"+i+"_square1").className ='matched-cell';
		}
		var cell_val2 = document.getElementById("card_"+i+"_square2").innerHTML;
		if(cell_val2 == counterBall){
			document.getElementById("card_"+i+"_square2").className ='matched-cell';
		}
		var cell_val3 = document.getElementById("card_"+i+"_square3").innerHTML;
		if(cell_val3 == counterBall){
			document.getElementById("card_"+i+"_square3").className ='matched-cell';
		}
		var cell_val4 = document.getElementById("card_"+i+"_square4").innerHTML;
		if(cell_val4 == counterBall){
			document.getElementById("card_"+i+"_square4").className ='matched-cell';
		}
		var cell_val7 = document.getElementById("card_"+i+"_square7").innerHTML;
		if(cell_val7 == counterBall){
			document.getElementById("card_"+i+"_square7").className ='matched-cell';
		}
		var cell_val16 = document.getElementById("card_"+i+"_square16").innerHTML;
		if(cell_val16 == counterBall){
			document.getElementById("card_"+i+"_square16").className ='matched-cell';
		}
		var cell_val19 = document.getElementById("card_"+i+"_square19").innerHTML;
		if(cell_val19 == counterBall){
			document.getElementById("card_"+i+"_square19").className ='matched-cell';
		}
		var cell_val20 = document.getElementById("card_"+i+"_square20").innerHTML;
		if(cell_val20 == counterBall){
			document.getElementById("card_"+i+"_square20").className ='matched-cell';
		}
		var cell_val21 = document.getElementById("card_"+i+"_square21").innerHTML;
		if(cell_val21 == counterBall){
			document.getElementById("card_"+i+"_square21").className ='matched-cell';
		}
		var cell_val22 = document.getElementById("card_"+i+"_square22").innerHTML;
		if(cell_val22 == counterBall){
			document.getElementById("card_"+i+"_square22").className ='matched-cell';
		}
		var cell_val23 = document.getElementById("card_"+i+"_square23").innerHTML;
		if(cell_val23 == counterBall){
			document.getElementById("card_"+i+"_square23").className ='matched-cell';
		}
    }
}
this.patternArrowTopWinner = function(counterBall){
	
	for (var i=0; i<this.cards; i++) { 
		var cell_val2 = document.getElementById("card_"+i+"_square2").innerHTML;
		if(cell_val2 == counterBall){
			document.getElementById("card_"+i+"_square2").className ='matched-cell';
		}
		var cell_val7 = document.getElementById("card_"+i+"_square7").innerHTML;
		if(cell_val7 == counterBall){
			document.getElementById("card_"+i+"_square7").className ='matched-cell';
		}
		var cell_val16 = document.getElementById("card_"+i+"_square16").innerHTML;
		if(cell_val16 == counterBall){
			document.getElementById("card_"+i+"_square16").className ='matched-cell';
		}
		var cell_val21 = document.getElementById("card_"+i+"_square21").innerHTML;
		if(cell_val21 == counterBall){
			document.getElementById("card_"+i+"_square21").className ='matched-cell';
		}
		var cell_val6 = document.getElementById("card_"+i+"_square6").innerHTML;
		if(cell_val6 == counterBall){
			document.getElementById("card_"+i+"_square6").className ='matched-cell';
		}
		var cell_val8 = document.getElementById("card_"+i+"_square8").innerHTML;
		if(cell_val8 == counterBall){
			document.getElementById("card_"+i+"_square8").className ='matched-cell';
		}
		var cell_val10 = document.getElementById("card_"+i+"_square10").innerHTML;
		if(cell_val10 == counterBall){
			document.getElementById("card_"+i+"_square10").className ='matched-cell';
		}
		var cell_val13 = document.getElementById("card_"+i+"_square13").innerHTML;
		if(cell_val13 == counterBall){
			document.getElementById("card_"+i+"_square13").className ='matched-cell';
		}
    }
}
this.patternArrowBottomWinner = function(counterBall){
	
	for (var i=0; i<this.cards; i++) { 
		var cell_val2 = document.getElementById("card_"+i+"_square2").innerHTML;
		if(cell_val2 == counterBall){
			document.getElementById("card_"+i+"_square2").className ='matched-cell';
		}
		var cell_val7 = document.getElementById("card_"+i+"_square7").innerHTML;
		if(cell_val7 == counterBall){
			document.getElementById("card_"+i+"_square7").className ='matched-cell';
		}
		var cell_val16 = document.getElementById("card_"+i+"_square16").innerHTML;
		if(cell_val16 == counterBall){
			document.getElementById("card_"+i+"_square16").className ='matched-cell';
		}
		var cell_val21 = document.getElementById("card_"+i+"_square21").innerHTML;
		if(cell_val21 == counterBall){
			document.getElementById("card_"+i+"_square21").className ='matched-cell';
		}
		var cell_val15 = document.getElementById("card_"+i+"_square15").innerHTML;
		if(cell_val15 == counterBall){
			document.getElementById("card_"+i+"_square15").className ='matched-cell';
		}
		var cell_val17 = document.getElementById("card_"+i+"_square17").innerHTML;
		if(cell_val17 == counterBall){
			document.getElementById("card_"+i+"_square17").className ='matched-cell';
		}
		var cell_val10 = document.getElementById("card_"+i+"_square10").innerHTML;
		if(cell_val10 == counterBall){
			document.getElementById("card_"+i+"_square10").className ='matched-cell';
		}
		var cell_val13 = document.getElementById("card_"+i+"_square13").innerHTML;
		if(cell_val13 == counterBall){
			document.getElementById("card_"+i+"_square13").className ='matched-cell';
		}
    }
}
}
Bingo75.prototype.newCard = function() { //console.log()
    for (var i=0; i<this.cards; i++) { 
        for (var j=0; j<24; j++) {
            var newNum = Math.floor(Math.random() * 75) + 1;
            document.getElementById("card_"+i+"_square"  + j).innerHTML = newNum;
        }
        
        if(this.pattern == 'T'){
        	this.patternT(i);
        } else if(this.pattern == 'Z'){
        	this.patternZ(i);
        } else if(this.pattern == 'I'){
        	this.patternI(i);
        } else if(this.pattern == 'ArrowTop'){
        	this.patternArrowTop(i);
        } else if(this.pattern == 'ArrowBottom'){
        	this.patternArrowBottom(i);
        }
    }

}
Bingo75.prototype.patternWinner = function(counterBall){
	if(this.pattern == 'T'){
    	this.patternTWinner(counterBall);
    } else if(this.pattern == 'Z'){
    	this.patternZWinner(counterBall);
    } else if(this.pattern == 'I'){
    	this.patternIWinner(counterBall);
    } else if(this.pattern == 'ArrowTop'){
    	this.patternArrowTopWinner(counterBall);
    } else if(this.pattern == 'ArrowBottom'){
    	this.patternArrowBottomWinner(counterBall);
    }
}

Bingo75.prototype.patternT= function(counterBall){

}
/*Bingo75.prototype.newCard = function() {
     for (var i=0; i<24; i++) {
        var newNum = Math.floor(Math.random() * 75) + 1;

        document.getElementById("square"  + i).innerHTML = newNum;
     }
}*/
Bingo75.prototype.say = function() {
     alert('hi '+ this.cards)
}