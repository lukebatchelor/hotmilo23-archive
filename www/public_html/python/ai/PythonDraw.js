var floatTexts = [];

function FloatText(x, y, text){
	this.x = x;
	this.y = y;
	this.text = text;
	this.alpha = 1;
	
	return this;
} 

function addFloatText(x, y, text){
	floatTexts.push(new FloatText(x, y, text));
}

function drawFloatTexts(){
	ctx.textAlign = 'left';
	ctx.font = '14pt Calibri';
	for(var i = floatTexts.length - 1; i >= 0 ; i--){
		ctx.fillStyle = "rgba("+randomInclusive(0,255)+", "+randomInclusive(0,255)+", "+randomInclusive(0,255)+", " + floatTexts[i].alpha + ")";
		floatTexts[i].alpha -= 0.05;
		if(floatTexts[i].alpha < 0){
			floatTexts.splice(i, 1);
		}
		else{
			ctx.fillText(floatTexts[i].text, floatTexts[i].x, floatTexts[i].y);
		}
	}
}
 
 function draw(){
	ctx.fillStyle="#EFEFEF";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	if(playing){
		drawSnake();
		drawItems();
		drawScore();
		drawDebug();
		drawFloatTexts();
		drawTimer();
	}
	else{
		if(playingState == 0){//start screen
			drawStartMessage();
			drawScore();
		}
		else if(playingState == 2){//paused
			drawSnake();
			drawItems();
			drawDebug();
			drawPausedMenu();
		}
		else if(playingState == 3){//game over
			drawSnake();
			drawItems();
			drawScore();
			drawDebug();
			drawFloatTexts();
			drawGameOver();
		}
	}
}

function drawGameOver(){
	ctx.textAlign = 'center';
	ctx.font = 'bold 24pt Calibri';
	ctx.fillStyle="rgba(255, 255, 255, 0.7)";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.fillStyle="#000000";
	ctx.fillText("Game Over", canvasWidth/2, canvasHeight*0.2);
	ctx.font = ' 24pt Calibri';
	ctx.fillText("Score: "+(("0000"+score).slice(-4)), canvasWidth/2, canvasHeight*0.5);
	ctx.fillText("Time: "+timer.lapTime, canvasWidth/2, canvasHeight*0.6);
	
	if(newHighScore){
		ctx.font = 'bold 24pt Calibri';
		ctx.fillStyle = "rgba("+randomInclusive(0,255)+", "+randomInclusive(0,255)+", "+randomInclusive(0,255)+", 1)";
		ctx.fillText("New High Score!", canvasWidth/2, canvasHeight*0.35);
	}
}

function drawTimer(){
	ctx.textAlign = 'left';
	ctx.fillStyle="#000000";
	ctx.font = '18pt Calibri';
	ctx.fillText( timer.getTimeString(), 5, 20);
}

function drawDebug(){
	if(debug){
		ctx.textAlign = 'left';
		ctx.fillStyle="#000000";
		ctx.font = 'bold 10pt Calibri';
		var debugText = "DEBUG";
		debugText += "|Loc:("+snake.body[0]+","+snake.body[1]+")";
		debugText += "|Goal:("+(Goal?Goal.x:-1)+","+(Goal?Goal.y:-1)+")";
		debugText += "|Path:"+(path_calculated);
		debugText += "|Dir: "+((snake.dir==0)?"up":(snake.dir==1)?"right":(snake.dir==2)?"down":(snake.dir==3)?"left":"?");
		ctx.fillText( debugText, 4, canvasHeight-5);
		
		drawPath();
	}
}

function drawPath(){
	if(path.length != 0){
		var x=snake.body[0], y=snake.body[1];
		var dir;
		ctx.beginPath();
		ctx.strokeStyle = '#cecece';
		for(var i=0; i < path.length; i++){
			dir = path[i];
			if(dir == 1){//right
				x += 1;
				ctx.moveTo((x)     *pixelSize,(y+0.5)*pixelSize);
				ctx.lineTo((x+1)   *pixelSize,(y+0.5)*pixelSize);
				ctx.lineTo((x+0.66)*pixelSize,(y    )*pixelSize);
				ctx.lineTo((x+0.66)*pixelSize,(y+1  )*pixelSize);
				ctx.lineTo((x+1)   *pixelSize,(y+0.5)*pixelSize);
				ctx.stroke();
			}
			else if(dir == 3){//left
				x -= 1;
				ctx.moveTo((x+1)   *pixelSize,(y+0.5)*pixelSize);
				ctx.lineTo((x)     *pixelSize,(y+0.5)*pixelSize);
				ctx.lineTo((x+0.33)*pixelSize,(y    )*pixelSize);
				ctx.lineTo((x+0.33)*pixelSize,(y+1  )*pixelSize);
				ctx.lineTo((x)   *pixelSize,(y+0.5)*pixelSize);
				ctx.stroke();
			}
			else if(dir == 0){//up
				y -= 1;
				ctx.moveTo((x+0.5)   *pixelSize,(y+1)*pixelSize);
				ctx.lineTo((x+0.5)     *pixelSize,(y)*pixelSize);
				ctx.lineTo((x)*pixelSize,(y+0.33)*pixelSize);
				ctx.lineTo((x+1)*pixelSize,(y+0.33)*pixelSize);
				ctx.lineTo((x+0.5)   *pixelSize,(y)*pixelSize);
				ctx.stroke();
			}
			else if(dir == 2){//down
				y += 1;
				ctx.moveTo((x+0.5)   *pixelSize,(y)*pixelSize);
				ctx.lineTo((x+0.5)     *pixelSize,(y+1)*pixelSize);
				ctx.lineTo((x)*pixelSize,(y+0.66)*pixelSize);
				ctx.lineTo((x+1)*pixelSize,(y+0.66)*pixelSize);
				ctx.lineTo((x+0.5)   *pixelSize,(y+1)*pixelSize);
				ctx.stroke();
			}
		}
	}
}

function drawSnake(){
	if(path_calculated){
		ctx.fillStyle = "#0000FF";
	}
	else{
		ctx.fillStyle = "#FF0000";
	}
	for(var i=0; i < snake.length; i++)
	{
		if(invincible){
			ctx.fillStyle = getRandomColor();
		}
		ctx.fillRect(snake.body[i*2] * pixelSize+1, snake.body[i*2+1] * pixelSize+1, pixelSize-1, pixelSize-1);
	}
}

function drawItems(){
	for(var i=0; i < items.length; i++){
		ctx.fillStyle = items[i].col;
		ctx.fillRect(items[i].x * pixelSize, items[i].y * pixelSize, pixelSize, pixelSize);
	}
}

function drawScore(){
	ctx.textAlign = 'right';
	ctx.fillStyle="#000000";
	ctx.font = '18pt Calibri';
	if(playing){
		ctx.fillText( "Score: "+(("0000"+score).slice(-4)), canvasWidth - 5, 20);
	}
	else{
		ctx.fillText( "High Score: "+(("0000"+highScore).slice(-4)), canvasWidth - 5, 20);
	}
}
function drawStartMessage(){
	ctx.textAlign = 'center';
	ctx.fillStyle="#000000";
	ctx.font = '22pt Calibri';
	var x = canvasWidth / 2;
	var y = canvasHeight / 3;
	ctx.fillText("Press space to start!", x, y);

	//draw item descriptiona
	ctx.font = '12pt Calibri';
	ctx.textAlign = 'left';
	ctx.fillText("+1   score, snake grows a little", x/3 + pixelSize*1.5, y + 59);
	ctx.fillText("+5   score", x/3 + pixelSize*1.5, y + 79);
	ctx.fillText("+10 score, snake grows a lot", x/3 + pixelSize*1.5, y + 99);
	ctx.fillText("+35 score, snake grows A LOT", x/3 + pixelSize*1.5, y + 119);
	ctx.fillText("You'll see...", x/3 + pixelSize*1.5, y + 139);
	
	//draw items
	ctx.fillStyle="#00FF00";
	ctx.fillRect(x/3, y + 50, pixelSize, pixelSize);
	ctx.fillStyle="#FF0000";
	ctx.fillRect(x/3, y + 70, pixelSize, pixelSize);
	ctx.fillStyle="#996600";
	ctx.fillRect(x/3, y + 90, pixelSize, pixelSize);
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(x/3, y + 110, pixelSize, pixelSize);
	ctx.fillStyle="#FFD700";
	ctx.fillRect(x/3, y + 130, pixelSize, pixelSize);
}

function drawPausedMenu(){
	ctx.textAlign = 'center';
	ctx.fillStyle="rgba(255, 255, 255, 0.7)";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.fillStyle="#000000";
	ctx.font = '22pt Calibri';
	var x = canvasWidth / 2;
	var y = canvasHeight / 2;
	ctx.fillText("Paused!", x, y);
}