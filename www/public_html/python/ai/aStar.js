function aStar(start, goal){
	var closed_set = [];
	var open_set = [start];
	var neighbours, tentative_g_score;
	start.g_score = 0;		//cost from  start along best known path
	//estimated total cost from start to goal through y
	start.f_score = start.g_score + heuristic_cost_estimate(start, goal);
	
	while((open_set.length != 0)){
		var current = lowest_f_score(open_set);
		if (current.equals(goal)){
			return reconstruct_path(current.came_from, current);
		}
		//filter http://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
		open_set = open_set
			.filter(function(to_remove){
				return (!to_remove.equals(current));
			});
		closed_set.push(current);
		neighbours = get_neighbours(current);
		for(var i=0; i < neighbours.length; i++){
			if(!contains_node(closed_set, neighbours[i])){
				tentative_g_score = current.g_score + 1;
				
				if( (!contains_node(open_set, neighbours[i])) || (tentative_g_score < neighbours[i].g_score)){
					neighbours[i].came_from = current;
					neighbours[i].g_score = tentative_g_score;
					neighbours[i].f_score = neighbours[i].g_Score + heuristic_cost_estimate(neighbours[i], goal);
					if(!contains_node(open_set, neighbours[i])){
						open_set.push(neighbours[i]);
					}
				}
			}
		}
	}
	return false;
}

function run(){
	var goal = new node(4, 4, null, null);
	var start = new node(0, 0, null, goal);
	var d = aStar(start, goal);
	return d;
}

function get_neighbours(from_node){
	var neighbours = [];
	if(from_node.x > 0){
		if(!snake.bodyContains(from_node.x - 1, from_node.y)){
			neighbours.push(new node(from_node.x - 1, from_node.y    , from_node, from_node.goal));
		}
	}
	if(from_node.y > 0){
		if(!snake.bodyContains(from_node.x, from_node.y - 1)){
			neighbours.push(new node(from_node.x    , from_node.y - 1, from_node, from_node.goal));
		}
	}
	if(from_node.y < canvasHeight/pixelSize - 1){
		if(!snake.bodyContains(from_node.x, from_node.y + 1)){
			neighbours.push(new node(from_node.x    , from_node.y + 1, from_node, from_node.goal));
		}
	}
	if(from_node.x < canvasWidth/pixelSize - 1){
		if(!snake.bodyContains(from_node.x + 1, from_node.y)){
			neighbours.push(new node(from_node.x + 1, from_node.y    , from_node, from_node.goal));
		}
	}
	return neighbours;
}

function reconstruct_path(came_from, current){
	var total_path = [current];
	var directions = [];
	while(current['came_from'] != null){
		if(current.x > current['came_from'].x){
			directions.unshift(1);
		}
		else if(current.y > current['came_from'].y){
			directions.unshift(2);
		}
		else if(current.x < current['came_from'].x){
			directions.unshift(3);
		}
		else if(current.y < current['came_from'].y){
			directions.unshift(0);
		}
		total_path.push(current);
		current = current.came_from;
	}
	return [total_path, directions];
}

function heuristic_cost_estimate(start, goal){
	var cost_estimate = Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y);
	return cost_estimate
}

function lowest_f_score(set){
	var node = set[0];
	var f_score = node.f_score;
	for(var i=1; i < set.length; i++){
		if(set[i].f_score < f_score){
			f_score = set[i].f_score;
			node = set[i];
		}
	}
	return node;
}

function contains_node(set, node){
	var containsNode = false;
	for(var i=0; i < set.length; i++){
		if(set[i].equals(node)){
			containsNode = true;
		}
	}
	return containsNode;
}

function node(x, y, came_from, goal){
	this.x = x;
	this.y = y;
	this.goal = goal;
	this.came_from = came_from;
	this.g_score = 9999;
	this.f_score = function(){
		return Math.abs(this.x - goal.x) + Math.abs(this.y - goal.y);
	}
	this.equals = function(aNode){
		return (aNode.x == this.x) && (aNode.y == this.y);
	}
}