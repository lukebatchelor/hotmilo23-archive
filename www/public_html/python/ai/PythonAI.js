var auto_pilot = true;
var path_calculated = false;
var Goal;
var path = [];
var scoringCriteria = 'distance';

 
 function getSafeDir(){
	var dir;
	var neighbours = get_neighbours(new node(snake.body[0], snake.body[1], null, null));
	if(neighbours){
		if(snake.body[0] < neighbours[0].x){
			dir = 1;
		}
		else if(snake.body[0] > neighbours[0].x){
			dir = 3;
		}
		else if(snake.body[1] < neighbours[0].y){
			dir = 2;
		}
		else if(snake.body[1] > neighbours[0].y){
			dir = 0;
		}
	}
	path_calculated = false;
	return dir;
}

function distanceToItem(sX, sY, iX, iY){
	return Math.abs(sX - iX) + Math.abs(sY - iY);
}
function setPath(){
	var bestItem = -1;
	var tempPath, tempGoal, start;
		
	items.sort(function(a, b){
		return distanceToItem(snake.body[0], snake.body[1], a.x, a.y) -
				distanceToItem(snake.body[0], snake.body[1], b.x, b.y);
	});
	
	do{
		bestItem++;
		tempGoal = new node(items[bestItem].x, items[bestItem].y, null, null);
		start = new node(snake.body[0], snake.body[1], null, tempGoal);
		tempPath = aStar(start, tempGoal)[1];
	}while((!tempPath) && (bestItem != items.length - 1));
	
	if(!tempPath){		//unable to find a path to any goal
		var neighbours = get_neighbours(start);
		var tmpDir = -1;
		if(neighbours){
			if(!neighbours[0].x){console.log("dfgF")}
			if(neighbours[0].x < start.x){
				tmpDir = 3;					//left
			}
			else if(neighbours[0].x > start.x){
				tmpDir = 1;					//right
			}
			else if(neighbours[0].y < start.y){
				tmpDir = 0;					//up
			}
			else if(neighbours[0].y > start.y){
				tmpDir = 2;					//down
			}
		}
		path = [tmpDir];
		Goal = new node('-', '-', null, null);
		path_calculated = false;
	}
	else{
		path = tempPath;
		Goal = tempGoal;
		path_calculated = true;
		stalePathCount = stalePathMax;
	}
}