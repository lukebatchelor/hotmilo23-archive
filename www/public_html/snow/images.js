var glovesImage;
var snowmanImage;
var heartImage;
var snowFlakeImages; //array

var totalImagesToLoad = 6;
var totalImagesLoaded = 0;

function loadImages()
{
	var snowFlakeImageNames = ["snowflake.png", "snowflake2.png", "heart2.png"];
	glovesImage = document.createElement('img');
	
	glovesImage.onload = function()
	{
		imageLoaded();
	}
	glovesImage.src = "gloves.png";
	snowmanImage = document.createElement('img');
	snowmanImage.onload = function()
	{
		imageLoaded();
	}
	snowmanImage.src = "snowman.png";
	heartImage = document.createElement('img');
	heartImage.onload = function()
	{
		imageLoaded();
	}
	heartImage.src = "heart.png";
	for( var i = 0; i < snowFlakeImageNames.length; i++)
	{
		snowFlakeImages[i] = document.createElement("img");
		snowFlakeImages[i].onload = function()
		{
			imageLoaded();
		}
		snowFlakeImages[i].src = snowFlakeImageNames[i];
	}
}
function imageLoaded()
{
	totalImagesLoaded++;
	if(totalImagesLoaded == totalImagesToLoad)
	{
		playing = 1;
		drawInfoScreen();
	}
}