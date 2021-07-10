var grims = ["The Holocaust", "Child Labour Camps", "Wasted Chicken Nuggets", "A Hedgehog in a Cast", "Death", "Not Having Enough Milk For Your Cereal", "Funerals", "Being an Engineer", "A Hardened Look on Ones Face", "The Aftermath of a Nuclear Explosion", "27 Seasons of Home and Away", "A Drink Spilled on Your Lap", "A Drink Spilled on Your Lap", "A Drink Spilled on Your Lap"];
var wets=["Water", "Eye Balls", "The Ocean", "Clouds", "Fish", "Tongues", "Melted Ice", "Ice Cream", "Dolphins", "Sunken Pirate Ships"];
var grimsAndWets = [grims, wets];


var allWords = grims.concat(wets);

var currentWord = grims[0];

function guess(input)
{
	if($.inArray(currentWord, grimsAndWets[input]) != -1)
	{
		$(".the-word").text("Correct");
		$(".the-word").css("color", "green");
		if(currentWord == "A Drink Spilled on Your Lap")
		{
			$(".the-word").text("THATS FUCKING RIGHT!!!!");
		}
	}
	else
	{
		$(".the-word").text("Wrong!");
		$(".the-word").css("color", "red");
	}
	currentWord = allWords[Math.floor((Math.random() * allWords.length))]; 
	setTimeout(function(){
		$(".the-word").text(currentWord);
		$(".the-word").css("color", "black");
	}, 2000)

}