var items; 
function Item(name, x, y){
	this.x = x;
	this.y = y;
	this.name = name;
	switch(name){
		case "apple":
			this.col = "#00FF00";	//green
			this.life = 150;
			this.value = 1;
			this.score = 1;
			break;
		case "cherry":
			this.col = "#FF0000";	//red
			this.life = 150;
			this.value = 2;
			this.score = 2;
			break;
		case "chocolate":
			this.col = "#996600";	//brown
			this.life = 100;
			this.value = 3;
			this.score = 5;
			break;
		case "icecream":
			this.col = "#FFFFFF";	//white
			this.life = 100;
			this.value = 4;
			this.score = 35;
			break;
		case "party":
			this.col = "#FFD700";	//gold
			this.life = 100;
			this.value = 5;
			this.score = 60;
			break;
		default:
			this.col = "#00FF00";	//green
			break;
	}
}



function collectItem(itemName, itemIdx){
	addFloatText(items[itemIdx].x*pixelSize, items[itemIdx].y*pixelSize, "+"+items[itemIdx].score)
	score += items[itemIdx].score;
	items.splice(itemIdx, 1);
	switch(itemName){
		case "apple":	//+1 score and create new apple
			dropItem("apple")
			snake.grow();
			break;
		case "cherry":	//+5 score, dont grow snake
			break;
		case "chocolate": //+10 points but grow three times!
			snake.grow();
			snake.grow();
			snake.grow();
			break;
		case "icecream": //+35 points but grow three times!
			for(var i=0; i < 10; i++){
				snake.grow();
			}
			break;
		case "party":	//+60 score, grow by 20, add 20 random cherrys
			for(var i=0; i < 20; i++){
				snake.grow();
				dropItem("cherry");
			}
			break;
	}
}


//place an item in a random location on the screen (not on the snake)
function dropItem(itemName){
	var x, y;
	do{
		x = randomAlong(canvasWidth, pixelSize);
		y = randomAlong(canvasHeight, pixelSize);
	}while(snake.bodyContains(x, y));
	
	items.push(new Item(itemName, x, y));
	
	do{
		x = randomAlong(canvasWidth, pixelSize);
		y = randomAlong(canvasHeight, pixelSize);
	}while(snake.bodyContains(x, y));
	
	if(randomInclusive(0, 3) == 0){
		items.push(new Item("cherry", x, y));
	}
	else if(randomInclusive(0, 3) == 0){
		items.push(new Item("chocolate", x, y));
	}
	else{
		if(randomInclusive(0, 3) == 0){
			items.push(new Item("icecream", x, y));
		}
		else{
			if(randomInclusive(0, 3) == 0){
				if(partyOn){
					items.push(new Item("party", x, y));
				}
			}
		}
	}
}

//remove item from items array
//drop an apple if we are removing an apple
function itemDie(itemIdx){
	if(items[itemIdx].name == "apple"){
		dropItem("apple");
	}
	items.splice(itemIdx, 1);
}

//return random position along an axis
function randomAlong(axisLength, pixelSize){
	var max = Math.floor(axisLength / pixelSize) - 1;
	var min = 0;
	return randomInclusive(min, max);
}

//return a random number between min and max inclusive
function randomInclusive(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//return a random color in #RRGGBB format
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
