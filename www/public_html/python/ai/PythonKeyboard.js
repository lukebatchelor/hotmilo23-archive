var comboListener;

function addKeyboardListeners(){
	$(document).keydown(function(e){
		if(playing)
		{
			switch(e.keyCode){
				case 65: //left (a)
				case 37:
					if(snake.dir != 1)
						snake.dir = 3;
					break;
				case 68: //right (d)
				case 39:
					if(snake.dir != 3)
						snake.dir = 1;
					break;
				case 87: //up (w)
				case 38:
					if(snake.dir != 2)
						snake.dir = 0;
					break; 
				case 83: //down (s)
				case 40:
					if(snake.dir != 0)
						snake.dir = 2;
					break;
				case 32: //<enter> (space)
				case 13:
					playingState = 2;
					playing = false;
					break;
			}
			e.preventDefault();
		}
		else{
			switch(e.keyCode){
				case 32: //<enter> (space)
				case 13: //start the game!
					if(playingState == 0){
						restartGame();
					}
					else if(playingState == 2){				//game is paused, unpause
						playingState = 1;
						playing = true;
					}
					else if(playingState == 3){ 			//game over screen, restart game
						restartGame();
					}
					break;
				}
			//console.log(e.keyCode);
		}
	});
	
	comboListener = new window.keypress.Listener();

	comboListener.sequence_combo("up up down down left right left right b a enter", function() {
		if(playingState == 2){ //game is paused
			invincible = !invincible;	//make the player invisble
			playingState = 1;	//and start the game
			playing = true;
		}
	}, true);
	comboListener.sequence_combo("g o d m o d e enter", function() {
		if(playingState == 2){ //game is paused
			invincible = !invincible;	//make the player invisble
			playingState = 1;	//and start the game
			playing = true;
		}
	}, true);
	comboListener.sequence_combo("s t e r o i d s enter", function() {
		if(playingState == 2){ //game is paused
			for(var i=0; i < 30; i++){
				snake.grow();
			}
			playingState = 1;	//and start the game
			playing = true;
		}
	}, true);
	comboListener.sequence_combo("e n t e r h e l l enter", function() {
		if(playingState == 2){ //game is paused
			for(var i=0; i < 50; i++){
				snake.grow();
			}
			playingState = 1;	//and start the game
			playing = true;
		}
	}, true);
	comboListener.sequence_combo("o h s h i t enter", function() {
		if(playingState == 2){ //game is paused
			for(var i=0; i < 100; i++){
				snake.grow();
			}
			playingState = 1;	//and start the game
			playing = true;
		}
	}, true);
	comboListener.sequence_combo("p a r t y o n enter", function() {
		partyOn = true;
	}, true);
	comboListener.sequence_combo("p a r t y o f f enter", function() {
		partyOn = false;
	}, true);
	comboListener.sequence_combo("g r e e d y enter", function() {
		scoringCriteria = 'distance';
	}, true);
	comboListener.sequence_combo("h u n g r y enter", function() {
		scoringCriteria = 'score';
	}, true);
	
}