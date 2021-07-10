//faceFold object used to contain information for the facefolding app without polluting
//the global namespace
var faceFold;
var mobile = false;
var dev = true;
var stages = {
	SELECT_IMAGE:   0,
	CROP_N_SCALE:   1,
	SELECT_LINE:    2,
	SET_OFFSETS:    3,
	DISPLAY_RESULT: 4
}
$(document).ready(function(){
	canvas = $("#appCanvas");
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 		//alert("mobile detected");
 		mobile = true;
	}
	
	faceFold = new FaceFold(canvas);
	canvas.on('mousemove', function(e){
		faceFold.setMousePos(e.clientX, e.clientY);
		mousemove();
	}).on('mousedown', mousedown)
	.on('mouseup', mouseup)
	.on('mouseout', function(e){
		mouseup();
	}).on('touchstart', function(e){
		e.preventDefault();
		var touch = e.originalEvent.touches[0];
		faceFold.setMousePos(touch.clientX, touch.clientY);
		mousedown();
	}).on('touchend', mouseup)
	.on('touchmove', function(e) {
		e.preventDefault();
		var touch = e.originalEvent.touches[0];
		faceFold.setMousePos(touch.clientX, touch.clientY); 
		mousemove();
	}).on('pinch', function(e) {
		e.preventDefault();
		console.log(e);
	});
	$("#upload_form").submit(function(e){
		sendFile();
	});
	
	faceImage = document.createElement('img');
	
	faceImage.onload = function(){
		faceFold.faceImage = faceImage;
	}
	faceImage.src = faceFold.faceImageURL;
	faceFold.start();

});


function mousedown(e){
	faceFold.mousedown = true;
	if(faceFold.stage == stages['SET_OFFSETS']){
		faceFold.selectedPart = faceFold.mouseY < faceFold.line ? 0 : 1;
		faceFold.clickOrigin = [faceFold.mouseX, faceFold.mouseY];
	}
	else if (faceFold.stage == stages['CROP_N_SCALE']){
		faceFold.clickOrigin = [faceFold.mouseX, faceFold.mouseY];
	}
}

function mouseup(){
	faceFold.mousedown = false;
	faceFold.clickOrigin = null;
	if(faceFold.stage == stages['SET_OFFSETS']){
		faceFold.imageOffsets[faceFold.selectedPart][0] += faceFold.mouseOffsets[faceFold.selectedPart][0];
		faceFold.imageOffsets[faceFold.selectedPart][1] += faceFold.mouseOffsets[faceFold.selectedPart][1];
	}
	else if (faceFold.stage == stages['CROP_N_SCALE']){
		faceFold.imageOffsets[0][0] += faceFold.mouseOffsets[0][0];
		faceFold.imageOffsets[0][1] += faceFold.mouseOffsets[0][1];
		faceFold.imageOffsets[1][0] += faceFold.mouseOffsets[1][0];
		faceFold.imageOffsets[1][1] += faceFold.mouseOffsets[1][1];
	}
	faceFold.mouseOffsets = [[0, 0], [0, 0]];
}
function mousemove(){
	if(faceFold.stage == stages['SELECT_LINE']){
		if(faceFold.mousedown){
			faceFold.line = faceFold.mouseY;
		}
	}
	else if(faceFold.stage == stages['SET_OFFSETS']){
		if(faceFold.mousedown){
			faceFold.mouseOffsets[faceFold.selectedPart] = [faceFold.mouseX - faceFold.clickOrigin[0], faceFold.mouseY - faceFold.clickOrigin[1]];
		}
	}
	else if (faceFold.stage == stages['CROP_N_SCALE']){
		if(faceFold.mousedown){
			faceFold.mouseOffsets[0] = [faceFold.mouseX - faceFold.clickOrigin[0], faceFold.mouseY - faceFold.clickOrigin[1]];
			faceFold.mouseOffsets[1] = [faceFold.mouseX - faceFold.clickOrigin[0], faceFold.mouseY - faceFold.clickOrigin[1]];
		}
	}
}
function drawLine(ctx, x1, y1, x2, y2){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}


function zoom(dir){
	faceFold.scaling +=  dir*0.1
}


//used to move between stages forward and back
//dir = +ve for forward, dir = -ve for backward
function moveStage(dir){
	faceFold.stage += dir < 0 ? -1 : 1;
	if(faceFold.stage == stages['SELECT_IMAGE']){
		$("#upload_buttons").show();
		$("#zoom_buttons").hide();
		$("#backNextButtons").hide();
		$("#shareButtons").hide();
	}
	else if(faceFold.stage == stages['CROP_N_SCALE']){
		$("#upload_buttons").hide();
		$("#zoom_buttons").show();
		$("#backNextButtons").show();
		$("#shareButtons").hide();
	}
	else if(faceFold.stage == stages['SELECT_LINE']){
		$("#upload_buttons").hide();
		$("#zoom_buttons").hide();
		$("#backNextButtons").show();
		$("#shareButtons").hide();
	}
	else if(faceFold.stage == stages['SET_OFFSETS']){
		$("#upload_buttons").hide();
		$("#zoom_buttons").hide();
		$("#backNextButtons").show();
		$("#shareButtons").hide();
	}
	else if(faceFold.stage == stages['DISPLAY_RESULT']){
		$("#upload_buttons").hide();
		$("#zoom_buttons").hide();
		$("#backNextButtons").show();
		$("#shareButtons").show();
		
		faceFold.canvas.attr("width", faceFold.newSize[0]).attr("height", faceFold.newSize[1]);
	}
}
function drawFaceFold(){
	faceFold.ctx.fillStyle = '#CECECE';
	faceFold.ctx.fillRect(0, 0, faceFold.rekt.width, faceFold.rekt.height);
	var totalOffsets = [[faceFold.imageOffsets[0][0] + faceFold.mouseOffsets[0][0], faceFold.imageOffsets[0][1] + faceFold.mouseOffsets[0][1]],
			[faceFold.imageOffsets[1][0] + faceFold.mouseOffsets[1][0], faceFold.imageOffsets[1][1] + faceFold.mouseOffsets[1][1]]
		];
	if(faceFold.stage == stages['CROP_N_SCALE']){
		faceFold.ctx.drawImage(faceFold.faceImage,
			0,											//x coord of where to clip from image
			0,														//y coord of where to clip from image
			faceFold.faceImage.width,	//width of clipped image
			faceFold.faceImage.height,						//height of cliped image
			totalOffsets[0][0],						//x coord of where to place on canvas
			totalOffsets[0][1],										//y coord of where to place on canvas
			faceFold.faceImage.width*faceFold.scaling,	//width of new image (stretching, reducing, etc)
			faceFold.faceImage.height*faceFold.scaling);					//height of new image (stretching, reducing, etc)
	}
	else if(faceFold.stage == stages['SELECT_LINE']){
		if(faceFold.faceImage){
			faceFold.ctx.drawImage(faceFold.faceImage,
				totalOffsets[0][0], 
				totalOffsets[0][1],
				faceFold.faceImage.width * faceFold.scaling, 
				faceFold.faceImage.height * faceFold.scaling);
		}
		drawLine(faceFold.ctx, 0, faceFold.line, faceFold.rekt.width, faceFold.line);
	}
	else if(faceFold.stage == stages['SET_OFFSETS']){
		var clips = [
			[	//top image part
				totalOffsets[0][0] < totalOffsets[1][0] ? totalOffsets[1][0] - totalOffsets[0][0] : 0, //left clipping
				totalOffsets[0][0] > totalOffsets[1][0] ? totalOffsets[0][0] - totalOffsets[1][0] : 0	//right clipping
			],
			[	//bottom image part
				totalOffsets[1][0] < totalOffsets[0][0] ? totalOffsets[0][0] - totalOffsets[1][0] : 0,	//left clipping
				totalOffsets[1][0] > totalOffsets[0][0] ? totalOffsets[1][0] - totalOffsets[0][0] : 0	//right clipping
			]
		];

		var rect1 = [
			totalOffsets[0][0] + clips[0][0],							//x position of top left corner
			totalOffsets[0][1],							//y position of top left corner
			faceFold.faceImage.width * faceFold.scaling - clips[0][1],	//width
			faceFold.line - totalOffsets[0][1],	//height
		];
		var rect2 = [					
			totalOffsets[1][0] + clips[1][0],							//x position of top left corner
			rect1[1] + rect1[3],									//y position of top left corner
			faceFold.faceImage.width * faceFold.scaling - clips[1][1],			//width
			faceFold.faceImage.height * faceFold.scaling - (faceFold.line - totalOffsets[1][1]),			//height
		];
		
		faceFold.ctx.drawImage(faceFold.faceImage,
			clips[0][0]/faceFold.scaling,																//x coord of where to clip from image
			0,																			//y coord of where to clip from image
			faceFold.faceImage.width - clips[1][0]/faceFold.scaling,						//width of clipped image
			rect1[3]/faceFold.scaling,											//height of cliped image
			rect1[0],											//x coord of where to place on canvas
			rect1[1],															//y coord of where to place on canvas
			rect1[2],	//width of new image (stretching, reducing, etc)
			rect1[3]);					//height of new image (stretching, reducing, etc)

		faceFold.ctx.drawImage(faceFold.faceImage,
			clips[1][0]/faceFold.scaling,																//x coord of where to clip from image
			faceFold.line / faceFold.scaling - totalOffsets[1][1]/faceFold.scaling,						//y coord of where to clip from image
			faceFold.faceImage.width - clips[1][1]/faceFold.scaling,						//width of clipped image
			faceFold.faceImage.height - (faceFold.line / faceFold.scaling - totalOffsets[1][1]/faceFold.scaling),											//height of cliped image
			rect2[0],											//x coord of where to place on canvas
			rect2[1],															//y coord of where to place on canvas
			rect2[2],	//width of new image (stretching, reducing, etc)
			rect2[3]);					//height of new image (stretching, reducing, etc)
			
			
		faceFold.newSize = [Math.min(400, rect1[2]), Math.min(400, rect1[3] + rect2[3])];
	}
	else if(faceFold.stage == stages['DISPLAY_RESULT']){
		var clips = [
			[	//top image part
				totalOffsets[0][0] < totalOffsets[1][0] ? totalOffsets[1][0] - totalOffsets[0][0] : 0, //left clipping
				totalOffsets[0][0] > totalOffsets[1][0] ? totalOffsets[0][0] - totalOffsets[1][0] : 0	//right clipping
			],
			[	//bottom image part
				totalOffsets[1][0] < totalOffsets[0][0] ? totalOffsets[0][0] - totalOffsets[1][0] : 0,	//left clipping
				totalOffsets[1][0] > totalOffsets[0][0] ? totalOffsets[1][0] - totalOffsets[0][0] : 0	//right clipping
			]
		];
		var rect1 = [
			Math.min(0, totalOffsets[0][0] + clips[0][0]),							//x position of top left corner
			Math.min(0, totalOffsets[0][1]),							//y position of top left corner
			faceFold.faceImage.width * faceFold.scaling - clips[0][1],	//width
			faceFold.line - totalOffsets[0][1],	//height
		];
		var rect2 = [					
			Math.min(0, totalOffsets[1][0] + clips[1][0]),							//x position of top left corner
			rect1[1] + rect1[3],									//y position of top left corner
			faceFold.faceImage.width * faceFold.scaling - clips[1][1],			//width
			faceFold.faceImage.height * faceFold.scaling - (faceFold.line - totalOffsets[1][1]),			//height
		];
		
		
		faceFold.ctx.drawImage(faceFold.faceImage,
			clips[0][0]/faceFold.scaling,																//x coord of where to clip from image
			0,																			//y coord of where to clip from image
			faceFold.faceImage.width - clips[1][0]/faceFold.scaling,						//width of clipped image
			rect1[3]/faceFold.scaling,											//height of cliped image
			rect1[0],											//x coord of where to place on canvas
			rect1[1],															//y coord of where to place on canvas
			rect1[2],	//width of new image (stretching, reducing, etc)
			rect1[3]);					//height of new image (stretching, reducing, etc)

		faceFold.ctx.drawImage(faceFold.faceImage,
			clips[1][0]/faceFold.scaling,																//x coord of where to clip from image
			faceFold.line / faceFold.scaling - totalOffsets[1][1]/faceFold.scaling,						//y coord of where to clip from image
			faceFold.faceImage.width - clips[1][1]/faceFold.scaling,						//width of clipped image
			faceFold.faceImage.height - (faceFold.line / faceFold.scaling - totalOffsets[1][1]/faceFold.scaling),											//height of cliped image
			rect2[0],											//x coord of where to place on canvas
			rect2[1],															//y coord of where to place on canvas
			rect2[2],	//width of new image (stretching, reducing, etc)
			rect2[3]);					//height of new image (stretching, reducing, etc)
	}
}


function FaceFold(canvas){
	this.canvas = canvas;
	this.faceImageURL = "images/ginny.PNG";
	this.ctx = canvas[0].getContext("2d");
	this.rekt = canvas[0].getBoundingClientRect();
	this.mouseX,
	this.mouseY;
	this.clock;
	this.faceImage;
	this.FPS = 30;
	this.mousedown = false;
	this.scaling = 1;
	this.mouseOffsets = [[0, 0], [0, 0]];
	this.imageOffsets = [[0, 0], [0, 0]];
	this.newSize = [300, 400];
	this.line = this.rekt.height * 0.5;
	this.stage = 0;
	this.setMousePos = function(x, y){
		this.mouseX = x - this.rekt.left;
		this.mouseY = y - this.rekt.top;
	};
	this.start = function(){
		this.clock = setInterval(function() {
			drawFaceFold();
		}, 1000/this.FPS);
	};
	return this;
}

function share(){
	var form = new FormData(); 
	form.append("imageData", faceFold.canvas[0].toDataURL());
	$.ajax({
		type: 'POST',
		url: 'save.php',
		data: form,
		success: function (d) {
			var shareBox = $("#shareURL");
			shareBox.val(window.location.protocol + "//" + window.location.host + "/" + window.location.pathname+"/"+d);
			shareBox.focus().select();
		},
		error: function(jqXHR, textStatus, errorThrown ){
			alert("Error uploading file to server");
			console.log(jqXHR, textStatus, errorThrown);
		},
		processData: false,
		contentType:false
	});
}

function sendFile() {
	var form = new FormData(); 
	//var form = $("#upload_form")[0]; 
	
	form.append("img", $("#img")[0].files[0]);
	$.ajax({
		type: 'POST',
		url: 'upload.php',
		data: form,
		success: function (d) {
			faceFold.faceImageURL = JSON.parse(d)['success'];
			var faceImage = document.createElement('img');
			faceImage.onload = function(){
				faceFold.faceImage = faceImage;
				moveStage(1);
			}
			faceImage.src = faceFold.faceImageURL;
		},
		error: function(jqXHR, textStatus, errorThrown ){
			alert("Error uploading file");
			console.log(jqXHR, textStatus, errorThrown);
		},
		processData: false,
		contentType:false
	});
}