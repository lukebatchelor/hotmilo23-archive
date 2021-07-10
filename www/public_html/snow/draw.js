function drawCanvas()
{
	ctx.clearRect(0, 0, 800, 400);
	drawSnowMan();
	drawLives();
	//playing: 0-loading, 1-infoScreen, 2-startLevelScreen, 3-playing, 4-paused, 5-gameOver
	if(playing == 0)
	{
		drawLoadingMenu();
	}
	if(playing == 1)
	{
		drawInfoScreen();
	}
	else if(playing == 2)
	{
		drawStartMenu();
	}
	else if(playing == 3)
	{
		ctx.drawImage(glovesImage, playerX, 300);
		moveSnowFlakes();
		addSnowFlakes();
		drawSnowFlakes();	
	}
	else if (playing == 4)
	{
		drawPausedMenu();
	}
	else	
		drawGameOverMenu();
		
	drawScore();
}
function drawLoadingMenu()
{
	ctx.fillText("Loading...", 340, 200);
}
function drawInfoScreen()
{
	ctx.clearRect(0, 0, 800, 400);
	var imageLeft = 150;
	var textLeft = imageLeft + 40;
	var imageTop = 180;
	var textTop = imageTop + 20;
	ctx.fillText("Collect snowflakes to make a snowman!", textLeft, textTop);
	ctx.fillText("But don't touch the yellow snow!!", textLeft,textTop + 30);
	ctx.fillText("Collect hearts live longer!", textLeft, textTop + 60);
	
	ctx.drawImage(snowFlakeImages[0],imageLeft , imageTop);
	ctx.drawImage(snowFlakeImages[1],imageLeft , imageTop + 30);
	ctx.drawImage(snowFlakeImages[2],imageLeft , imageTop + 60);
	
}
function drawLives()
{
	for(var i=0; i < lives; i++)
	{
		ctx.drawImage(heartImage,snowmanImage.width +  i*(heartImage.width+10) , 20);
	}
}
function drawPausedMenu()
{
	ctx.fillText("Paused", 340, 200);
	ctx.fillText("Press Enter to start", 260,230);
}
function drawGameOverMenu()
{
	ctx.fillText("Game Over", 340, 200);
	ctx.fillText("Press Enter to restart", 260,230);
}
function drawStartMenu()
{
	ctx.fillText("Level: "+curLevel.level, 340, 200);
	ctx.fillText("Press Enter to start", 260,230);
}
function drawScore()
{
	ctx.fillText("Score: "+ score ,600,30);
}
function drawSnowMan()
{
	ctx.drawImage(snowmanImage, 
		0,                      snowmanImage.height - snowmanImage.height * curLevel.complete,
		snowmanImage.width,     snowmanImage.height * curLevel.complete,
		0,                      snowmanImage.height - snowmanImage.height * curLevel.complete,
		snowmanImage.width,     snowmanImage.height * curLevel.complete);
}
function drawSnowFlakes()
{
	for(var i = 0; i < snowFlakes.length; i++)
	{
		ctx.drawImage(snowFlakeImages[snowFlakes[i].type], snowFlakes[i].x, snowFlakes[i].y);
	}
}