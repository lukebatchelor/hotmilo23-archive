function addKeyEvents()
{
	$(window).keydown(function(e) {
       		var key = e.which;
      
   	});
   	$(window).keyup(function(e) {
       		var key = e.which;
       		switch(key)
       		{

       			case 13: //enter
       			{
      				enterPressed();
       				break;
       			}
       		}
   	});
}

function enterPressed()
{
	//playing: 0-loading, 1-infoScreen, 2-startLevelScreen, 3-playing, 4-paused, 5-gameOver
	if(playing == 1)
	{
		playing = 2;
		drawCanvas();
	}
	else if(playing == 2)
	{
		playing = 3; 
		curLevel.caught = 0;
		curLevel.complete = 0;
		clearInterval(timer);
		timer = setInterval(drawCanvas, 30);
		$("#music")[0].play();
	}
	else if(playing == 3)
	{
		playing = 4;
		ctx.clearRect(0, 0, 800, 400);
		drawPausedMenu();
		$("#music")[0].pause();
	}
	else if(playing == 4)
	{
		playing = 3;
		$("#music")[0].play();
	}
	else if(playing == 5)
	{
		curLevel = new Level();
		caught = 0;
		playing = 2;
		score = 0;
		lives = 3;
	}
}