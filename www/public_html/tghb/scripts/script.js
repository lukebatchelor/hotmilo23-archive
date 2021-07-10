var context, canvas;
var loadingState = 0;
var loadingStates = ["Loading", "Loading.", "Loading..", "Loading..."]

$( document ).ready(function() {
  	canvas = document.getElementById('420blzit');
        context = canvas.getContext('2d');
        window.addEventListener('resize', resizeCanvas, false);
  	
        function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                redraw(); 
        }
        
        function redraw() {
        	context.fillStyle="#00CCFF";
        	context.fillRect(0,0,canvas.width,canvas.height/3);
        	context.fillStyle="#00CC00";
        	context.fillRect(0,canvas.height/3,canvas.width,(2*canvas.height)/3);
        	
        	 context.font = "bold 96px Arial";
  		context.textAlign= "center";
  		context.textBaseline = "middle";
        	context.fillStyle = "#ff0000";
  		context.fillText(loadingStates[loadingState], canvas.width/2, canvas.height/2);
        }
        
        setInterval(function(){
        	loadingState = loadingState + 1;
        	if( loadingState == loadingStates.length )
        	{
        		loadingState = 0;
        	}
        	
        	redraw();
        }, 1000);
        
        resizeCanvas();


  	

});