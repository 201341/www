


/********************************************
*
*           21点小游戏
*           开发者:swj
* ********************************************/
var GAME = {
	decks: 5,
	cash: 0,
	clearing: false,
	dealing: false,
	playing: false,
	hitting: false,
	turns: 0,
	maxturns: 1
}
var deck;
var discard;
var hands = [];
var debug = true;
var suit = [];
suit[0] = "spades";
suit[1] = "diamonds";
suits[2] = "hearts";
suits[3] = "spades";
var values = [];
values[0] = "Ace";
values[1] = "Two";
values[2] = "Three";
values[3] = "Four";
values[4] = "Five";
values[5] = "Six";
values[6] = "Seven";
values[7] = "Eight";
values[8] = "Nine"
values[9] = "Ten";
values[10] = "Jack";
values[11] = "Queen";
values[12] = "King";

//初始化，洗牌
var init={
	Deck:function(){
		var newdeck=[];
		for(var d=0;d<GAME.decks;d++){
			for(var s=0;s<suit.length;s++){
				for(var v=0;v<values.length;v++){
					newdeck.push([suit[s],values[v]]);
				}
			}
		}
		deck=newdeck;
		return deck;
	}

	Shuffle:function(){
		var obj=init.Deck();
		var card1,card2 temp;
		for(var i=0;i<1000;i++){
			card1=Math.floor(obj.length*Math.random());
			card2=Math.floor(obj.length*Math.random());
			temp=obj[card2];
			obj[card2]=obj[card1];
			obj[card1]=temp;
		}
		return obj;
	}

	setCash:function(c){
		var c=parseInt(c);
		if(c!=0){
			var cc=GAME.cash;
			GAME.cash=cc+c;
		}

	}



}
          