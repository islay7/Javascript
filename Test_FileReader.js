var gPt = new Array();

function Draw1(name) {
	var drawing = document.getElementById(name);
	if (drawing.getContext == false)
		return;
	
	var context = drawing.getContext("2d");
	context.strokeRect(10, 10, 50, 50);
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(100, 100);
	context.stroke();
	
}

function drawCoord(name, event) {
	var drawing = document.getElementById(name);	
	if (drawing.getContext == false)
		return;
	
	var rect = drawing.getBoundingClientRect();
	
	var P = new Object();
	P.X = event.clientX - rect.left;
	P.Y = event.clientY - rect.top;
	gPt[gPt.length] = P;

	var context = drawing.getContext("2d");
	context.beginPath();
	context.arc(P.X, P.Y, 5, 0, 2 * Math.PI, false);
	context.stroke();
}

function drawLines(name) {
	var drawing = document.getElementById(name);	
	if (drawing.getContext == false)
		return;
	if (gPt.length < 2)
		return;

	var context = drawing.getContext("2d");
	context.beginPath();
	context.moveTo(gPt[0].X, gPt[0].Y);
	for (var i = 1; i < gPt.length; i++) {
		context.lineTo(gPt[i].X, gPt[i].Y);
	}
	context.stroke();
	gPt.length = 0;
}

function openFile(name, event) {
	var input = event.target;

  var reader = new FileReader();
  reader.onload = function(){
		var text = reader.result;
    var lines = text.split("\n");
		for (var i = 0; i < lines.length; i++) {
			var data = lines[i].split(",");
			if (data.length < 2)
				break;
			var P = new Object();
			P.X = data[0];
			P.Y = data[1];
			gPt[gPt.length] = P;
		}
  }
	reader.onloadend = function() {
		drawLines(name);
	}
  reader.readAsText(input.files[0]);

}