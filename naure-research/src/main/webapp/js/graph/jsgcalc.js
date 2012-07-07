function dump(text) {
	$("#log").append("<div class='logentry'>"+text+"</div>");
	$("#log").attr({ scrollTop: $("#log").attr("scrollHeight") });
}

function widthPlusPadding(elem) {
	return $(elem).width() + parseFloat($(elem).css('paddingRight')) + parseFloat($(elem).css('paddingLeft'));
}

function JSgCalc (){
	this.graph = document.getElementById("graph");
	this.graphElement = $("#graph");
	this.width = $("#wrapper").width();
	this.height = $("#wrapper").height();
	this.maxgridlines = {x : 13, y : 13};
	this.charHeight = 8;
	this.startDrag = {x : 0, y : 0};
	this.prevDrag = {x : 0, y : 0};
	this.startCoord = {x1 : 0, y1 : 0, x2 : 0, y2 : 0};
	this.currCoord = {x1 : -5, y1 : -5, x2 : 5, y2 : 5};
	this.mousebutton = 0;
	this.canvasX = this.graph.offsetLeft;
	this.canvasY = this.graph.offsetTop;
	this.calccache = new Object;
	this.quality = 1;
	this.zoomFactor = 0.1;
	this.lines = [];

	this.arbRound = function(value, roundTo) {
		return Math.round(value/roundTo)*roundTo;
	}

	this.arbFloor = function(value, roundTo) {
		return Math.floor(value/roundTo)*roundTo;
	}

	this.copyCoord = function(coord) {
		return {x1 : coord.x1, y1 : coord.y1, x2 : coord.x2, y2 : coord.y2};
	}

	this.clearScreen = function() {
		this.ctx.fillStyle = "rgb(255,255,255)";
		this.ctx.fillRect (0, 0, this.width, this.height);
	}

	this.getEquation = function(lineid) {
		if(this.lines[lineid])
			return Calc.parseEquation(this.lines[lineid].equation, true);
		return false;
	}

	this.getColor = function(lineid) {
		if(this.lines[lineid])
			return this.lines[lineid].color;
		return "#000000";
	}

	this.drawEquation = function(equation, color) {
		if(!equation)
			return false;
		
		x1 = this.currCoord.x1;
		x2 = this.currCoord.x2;
		y1 = this.currCoord.y1;
		y2 = this.currCoord.y2;

		xrange = x2 - x1;
		yrange = y2 - y1;

		scale = this.getScale();

		if(!this.calccache[equation])
			this.calccache[equation] = new Object;

		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		//We don't want to draw lines that go off the screen too much, so we keep track of how many times we've had
		//to go off the screen here
		lineExists = 0;
		lastpoint = 0;
		//Loop through each pixel
		for(i = 0; i < this.width + (1 / this.quality); i += (1 / this.quality)) {
			xval = i / scale.x + x1;	//calculate the x-value for a given pixel

			yval = Parser.evaluate(equation, {"x" : xval});	//evaluate the equation

			ypos = this.height - ((yval - y1) * scale.y);
			//The line is on the screen, or pretty close to it
			if(ypos >= (this.height * -1) && ypos <= this.height * 2) {
				if(lineExists > 1)
					this.ctx.beginPath();

				if(lastpoint !== false && ((lastpoint > 0 && yval < 0) || (lastpoint < 0 && yval > 0))) {
					this.ctx.moveTo(i, ypos);
				}
				else
					this.ctx.lineTo(i, ypos);

				lineExists = 0;
				lastpoint = false;
			}
			else if(lineExists <= 1) {	//The line is off the screen
				this.ctx.lineTo(i, ypos);
				lastpoint = yval;
				this.ctx.stroke();
				lineExists++;
			}
			//this.ctx.fillRect(i - 0.5, ypos - 0.5, 1, 1);
		}
		this.ctx.stroke();
	}
	
	//Draws an arbritrary straight line from (x1, y1) to (x2, y2)
	this.drawLine = function(x1, y1, x2, y2, color) {
		if(!color)
			color = "#000000";
		
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		var start = this.getCoord(x1, y1);
		var end = this.getCoord(x2, y2);
		this.ctx.moveTo(start.x, start.y);
		this.ctx.lineTo(end.x, end.y);
		this.ctx.stroke();
	}
	
	//Draws an arbritrary label on the graph, given the numeric values (rather than the pixel values)
	this.drawLabel = function(xval, yval, text, color) {
		if(!color)
			color = "#000000";
		
		var labelCoord = this.getCoord(xval, yval);
		var xpos = labelCoord.x;
		var ypos = labelCoord.y;
		
		this.ctx.font = "8pt monospace";
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(xpos, ypos);
		
		if(ypos-4 < this.charHeight)
			ypos += this.charHeight + 3;
		textwidth = this.ctx.measureText(text).width;
		if(xpos-4 < textwidth)
			xpos += textwidth + 3;
		this.ctx.fillText(text, xpos-3, ypos-3);
	}
	
	this.drawDot = function(xval, yval, color, radius) {
		if(!radius)
			radius = 4;
		if(!color)
			color = "#000000";
		
		var coord = this.getCoord(xval, yval);
		this.ctx.beginPath();
		this.ctx.fillStyle = color;
		this.ctx.arc(coord.x, coord.y, radius, 0, Math.PI*2, false);
		this.ctx.fill();
	}

	//Draws thge vertex of an equation (i.e. when it changes direction)
	this.drawVertex = function(equation, color, x) {
		scale = this.getScale();
		xpos = x / scale.x + this.currCoord.x1;
		matchingDist = 20 / scale.x;
		answer = Calc.getVertex(equation, xpos-matchingDist, xpos+matchingDist, 0.0000001);
		var tries = 0;
		while(answer === false) {
			tries++;
			if(tries > 5)
				return false;
			answer = Calc.getVertex(equation, xpos-matchingDist-Math.random()/100, xpos+matchingDist+Math.random()/100, 0.0000001);
		}
		xval = Calc.roundFloat(answer);
		yval = Parser.evaluate(equation, {x : xval});
		yval = Calc.roundFloat(this.arbRound(yval, 0.0000001));
		this.drawDot(xval, yval, color, 4);

		//draw label text
		this.drawLabel(xval, yval, Calc.roundFloat(this.arbRound(xval, 0.0000001))+", " + yval, "#000000");
	}

	//Draws the root of an equation (i.e. where x=0)
	this.drawRoot = function(equation, color, x) {
		scale = this.getScale();
		xpos = x / scale.x + this.currCoord.x1;
		//Calculate the root (within 50 pixels)
		answer = Calc.getRoot(equation, xpos, 50 / scale.x);
		if(answer === false)
			return false;
			
		answer = Math.round(answer * 10000000) / 10000000;
		
		xval = Calc.roundFloat(answer);
		yval = 0;
		
		this.drawDot(xval, yval, color, 4); //draw the dot
		//draw label text
		this.drawLabel(xval, yval, Calc.roundFloat(this.arbRound(xval, 0.00000001))+", " + yval);
	}

	//draws the intersection of an equation and the nearest equation to the mose pointer
	this.drawIntersect = function(equation1, color, x) {
		var scale = this.getScale();
		var xpos = x / scale.x + this.currCoord.x1;

		var answer = false;
		for(i in this.lines) {
			if(this.getEquation(i) == equation1)
				continue;

			tempanswer = Calc.getIntersection(equation1, this.getEquation(i), xpos, 50 / scale.x);
			if(tempanswer === false)
				continue;
			tempanswer = Math.round(tempanswer * 10000000) / 10000000;
			dump(tempanswer);
			if(tempanswer !== false && (answer === false || Math.abs(xpos - answer) > Math.abs(xpos - tempanswer))) {
				answer = tempanswer;
				equation = equation1;
			}
		}
		if(answer===false)
			return false;

		var xval = Calc.roundFloat(answer);
		var yval = Parser.evaluate(equation, {x : xval});
		
		//Draw dot
		this.drawDot(xval, yval, color, 4);

		//draw label text
		this.drawLabel(xval, yval, Math.round(xval * 1000000000) / 1000000000 + ", " + Math.round(yval * 1000000000) / 1000000000, color);
	}

	this.drawDerivative = function(equation, color, x) {
		scale = this.getScale();
		xpos = Calc.roundFloat(this.arbRound(x / scale.x + this.currCoord.x1, this.xgridscale/100));

		//Do the actual calculation.
		slope = Math.round(Calc.getDerivative(equation, xpos) * 10000000) / 10000000;

		xval = xpos;
		yval = Parser.evaluate(equation, {x : xval});
		yval = Calc.roundFloat(this.arbRound(yval, 0.0000001));
		pos = this.getCoord(xval, yval);
		this.ctx.beginPath();
		this.ctx.fillStyle = color;
		this.ctx.arc(pos.x, pos.y, 4, 0, Math.PI*2, false);
		this.ctx.fill();

		//draw derivative lines of exactly 2*xgridscale long
		xdist = this.xgridscale*2 / (Math.sqrt(Math.pow(slope, 2) + 1));
		ydist = xdist * slope;
		linestart = {x : xval - xdist, y : yval - ydist};
		lineend = {x : xval + xdist, y : yval + ydist};
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#000000";
		linestart = this.getCoord(linestart.x, linestart.y);
		lineend = this.getCoord(lineend.x, lineend.y);
		this.ctx.moveTo(linestart.x, linestart.y);
		this.ctx.lineTo(lineend.x, lineend.y);
		this.ctx.stroke();

		//draw label text
		this.ctx.font = "8pt monospace";
		this.ctx.fillStyle = "#000000";
		text = "x="+xval+", d/dx="+slope;
		xval2 = xval;	//find out whether to put label above or below dot
		xval -= this.xgridscale / 5;
		answer2 = Parser.evaluate(equation, {x : xval});
		xval += this.xgridscale / 10;
		answer3 = Parser.evaluate(equation, {x : xval});
		if(pos.y-4 < this.charHeight || answer2 > answer3)
			pos.y += this.charHeight + 3;
		textwidth = this.ctx.measureText(text).width;
		if(pos.x-4 < textwidth)
			pos.x += textwidth + 3;
		this.ctx.fillText(text, pos.x-4, pos.y-4);
	}

	//Draws the trace on an equation
	//xpos is the pixel value of x, not the numerical value
	this.drawTrace = function(equation, color, xval) {
		scale = this.getScale();
		
		xval = Math.round(this.arbRound(xval, this.xgridscale / 100) * 100000000000) / 100000000000;
		yval = Parser.evaluate(equation, {x : xval});	//evaluate the equation
		yval = Math.round(yval * 100000000000) / 100000000000;
		xpos = this.getCoord(xval, yval).x;
		ypos = this.getCoord(xval, yval).y;

		this.ctx.strokeStyle = color;
		//Draw the lines if the y-value is on the screen
		if(ypos <= this.height && ypos >= 0) {
			//Draw a line from the point to the x-axis
			this.drawLine(xval, yval, xval, 0, color);
			
			//Draw line from point to the y-axis
			this.drawLine(xval, yval, 0, yval, color);

			//draw label text
			this.drawLabel(xval, yval, xval + ", " + yval, "#000000");
		}
		
		//Update displayed trace values
		$("input.jsgcalc_trace_input").val(xval);
		$("input.jsgcalc_trace_output").val(yval);
	}

	this.drawGrid = function() {
		this.clearScreen();

		x1 = this.currCoord.x1;
		x2 = this.currCoord.x2;
		y1 = this.currCoord.y1;
		y2 = this.currCoord.y2;

		xrange = x2 - x1;
		yrange = y2 - y1;

		//Calculate the numeric value of each pixel (scale of the graph)
		xscale = xrange/this.width;
		yscale = yrange/this.height;

		//Calculate the scale of the gridlines
		for(i = 0.000000000001, c = 0; xrange/i > this.maxgridlines.x -1; c++) {
			if(c % 3 == 1) i *= 2.5;	//alternating between 2, 5 and 10
			else i *= 2;
		}
		this.xgridscale = i;

		//do the same for the y-axis
		for(i = 0.000000000001, c = 0; yrange/i > this.maxgridlines.y -1; c++) {
			if(c % 3 == 1) i *= 2.5;
			else i *= 2;
		}
		this.ygridscale = i;

		this.ctx.font = "8pt monospace";	//set the font
		this.ctx.textAlign = "center";

		xaxis = yaxis = null;

		//currx is the current gridline being drawn, as a numerical value (not a pixel value)
		currx = this.arbFloor(x1, this.xgridscale);	//set it to before the lowest x-value on the screen
		curry = this.arbFloor(y1, this.ygridscale);
		xmainaxis = this.charHeight;	//the next two variables are the axis on which text is going to be placed
		ymainaxis = -1;
		currx = Math.round(currx * 100000000000) / 100000000000;	//round to the closest 0.00000001
		curry = Math.round(curry * 100000000000) / 100000000000;

		if(y2 >= 0 && y1 <= 0)	//y=0 appears on the screen - move the text to follow
			xmainaxis = this.height - ((0-y1)/(y2-y1))*this.height + (this.charHeight * 1.2);
		else if(y1 > 0)	//the smallest value of y is above the screen - the x-axis labels get pushed to the top of the screen
			xmainaxis = this.height - 1;

		//the x-axis labels have to be a certain distance from the bottom of the screen
		if(xmainaxis > this.height - (this.charHeight / 2))
			xmainaxis = this.height - 1;

		//do the same as above with the y-axis
		if(x2 >= 0 && x1 <= 0)	//y-axis in the middle of the screen
			ymainaxis = ((0-x1)/(x2-x1))*this.width - 2;
		else if(x2 < 0)	//y-axis on the right side of the screen
			ymainaxis = this.width-2;

		if(ymainaxis < (this.ctx.measureText(curry).width + 1)) {
			ymainaxis = -1;
		}

		sigdigs = String(currx).length + 3;
		//VERTICAL LINES
		for(i = 0; i < this.maxgridlines.x; i++) {
			xpos = ((currx-x1)/(x2-x1))*this.width;	//position of the line (in pixels)
			//make sure it is on the screen
			if(xpos-0.5 > this.width + 1 || xpos < 0) {
				currx += this.xgridscale;
				continue;
			}

			//currx = Calc.roundToSignificantFigures(currx, sigdigs);
			currx = Math.round(currx * 100000000000) / 100000000000;

			if(currx == 0)
				xaxis = xpos;

			if(jsgui.gridlines == "normal" || (jsgui.gridlines == "less" && Calc.roundFloat(currx) % Calc.roundFloat((this.xgridscale*2)) == 0)) {
				this.ctx.fillStyle = "rgb(190,190,190)";
				this.ctx.fillRect (xpos-0.5, 0, 1, this.height);
			}
			this.ctx.fillStyle = "rgb(0,0,0)";

			//Draw label
			if (currx != 0) {
				xtextwidth = this.ctx.measureText(currx).width;
				if (xpos + xtextwidth * 0.5 > this.width) //cannot overflow the screen
					xpos = this.width - xtextwidth * 0.5 + 1;
				else 
					if (xpos - xtextwidth * 0.5 < 0) 
						xpos = xtextwidth * 0.5 + 1;
				this.ctx.fillText(currx, xpos, xmainaxis);
			}

			currx += this.xgridscale;

		}
		this.ctx.textAlign = "right";
		sigdigs = String(curry).length + 3;

		//HORIZONTAL LINES
		for(i = 0; i < this.maxgridlines.y; i++) {
			ypos = this.height - ((curry-y1)/(y2-y1))*this.height;	//position of the line (in pixels)
			//make sure it is on the screen
			if(ypos-0.5 > this.height + 1 || ypos < 0) {
				curry += this.ygridscale;
				continue;
			}

			//curry = Calc.roundToSignificantFigures(curry, sigdigs);
			curry = Math.round(curry*100000000000)/100000000000;

			if(curry == 0)
				yaxis = ypos;

			if(jsgui.gridlines == "normal" || (jsgui.gridlines == "less" && Calc.roundFloat(curry) % (Calc.roundFloat(this.ygridscale*2)) == 0)) {
				this.ctx.fillStyle = "rgb(190,190,190)";
				this.ctx.fillRect (0, ypos-0.5, this.width, 1);
			}
			this.ctx.fillStyle = "rgb(0,0,0)";

			//Draw label
			if (curry != 0) {
				ytextwidth = this.ctx.measureText(curry).width;
				if (ypos + (this.charHeight / 2) > this.height) //cannot overflow the screen
					ypos = this.height - (this.charHeight / 2) - 1;
				if (ypos - 4 < 0) 
					ypos = 4;
				xaxispos = ymainaxis;
				if (ymainaxis == -1) 
					xaxispos = ytextwidth + 1;
				this.ctx.fillText(curry, xaxispos, ypos + 3);
			}
			curry += this.ygridscale;
		}
		//Draw the axis
		if(xaxis)
			this.ctx.fillRect (xaxis-0.5, 0, 1, this.height);
		if(yaxis)
			this.ctx.fillRect (0, yaxis-0.5, this.width, 1);
	}

	//get the pixel coordinates of a value
	this.getCoord = function(x, y) {
		xpos = ((x-this.currCoord.x1)/(this.currCoord.x2-this.currCoord.x1))*this.width;
		ypos = this.height - ((y-this.currCoord.y1)/(this.currCoord.y2-this.currCoord.y1))*this.height;
		return {x : xpos, y : ypos};
	}

	//get the (numerical) position of a (pixel) coordinate
	this.getValue = function(x, y){
		scale = this.getScale();
		xpos = x / scale.x + this.currCoord.x1;
		ypos = (this.height - y) / scale.y + this.currCoord.y1;
		return {x : xpos, y : ypos};
	}

	//zoom to a box. the inputs are pixel coordinates
	this.doZoomBox = function(x1, y1, x2, y2) {
		if(x1 == x2 || y1 == y2) {
			dump("Invalid doZoomBox");
			return;
		}
		coord1 = this.getValue(x1, y1);
		coord2 = this.getValue(x2, y2);

		if(x1 > x2) {
			this.currCoord.x1 = coord2.x;
			this.currCoord.x2 = coord1.x;
		}
		else {
			this.currCoord.x1 = coord1.x;
			this.currCoord.x2 = coord2.x;
		}

		if(y2 > y1) {
			this.currCoord.y1 = coord2.y;
			this.currCoord.y2 = coord1.y;
		}
		else {
			this.currCoord.y1 = coord1.y;
			this.currCoord.y2 = coord2.y;
		}

		this.startCoord = this.copyCoord(this.currCoord);
		this.draw();
	}

	this.draw = function() {
		this.drawGrid();
		for(var i in this.lines) {
			//dump(this.lines[i].equation);
			equation = Calc.parseEquation(this.lines[i].equation, true);
			this.drawEquation(equation, this.lines[i].color);
		}
		jsgui.updateValues();
	}

	//Gets the scale (pixels per unit)
	this.getScale = function() {
		return {x : (this.width / (this.startCoord.x2 - this.startCoord.x1)),
			y : (this.height / (this.startCoord.y2 - this.startCoord.y1))}
	}

	//get the range of values on the screen
	this.getRange = function() {
		return {x : Math.abs(this.startCoord.x2 - this.startCoord.x1),
			y : Math.abs(this.startCoord.y2 - this.startCoord.y1)}
	}

	var started = false;

	this.checkMove = function(x, y) {
		if(x == this.prevDrag.x && y == this.prevDrag.y)
			return;

		if(this.mousebutton == 1) {
			if(jsgui.currtool == "zoombox" || jsgui.currtool == "zoombox_active") {	//ZOOM BOX
				this.draw();
				this.ctx.strokeStyle = "rgb(150,150,150)";
				this.ctx.strokeRect (this.startDrag.x, this.startDrag.y, x-this.startDrag.x, y-this.startDrag.y);
			}
			else { //CLICK AND DRAG
				//find the scale of the graph (units per pixel)
				scale = this.getScale();
				//dump(scale.x + " " + scale.y + " -- " + this.startCoord.x1 + " " + this.startCoord.y1);
				//dump(this.startCoord.x1 + " " +(y - this.startDrag.y) / scale.y);
				this.currCoord.x1 = this.startCoord.x1 - ((x - this.startDrag.x) / scale.x);
				this.currCoord.x2 = this.startCoord.x2 - ((x - this.startDrag.x) / scale.x);

				this.currCoord.y1 = this.startCoord.y1 + ((y - this.startDrag.y) / scale.y);

				this.currCoord.y2 = this.startCoord.y2 + ((y - this.startDrag.y) / scale.y);

				this.draw();
			}
		}
		else if(jsgui.currtool == "trace") {	//TRACE
			this.draw();
			this.drawTrace(this.getEquation(jsgui.currEq), "#000000", x / scale.x + this.currCoord.x1);
		}
		else if(jsgui.currtool == "vertex") {
			this.draw();
			this.drawVertex(this.getEquation(jsgui.currEq), this.getColor(jsgui.currEq), x);
		}
		else if(jsgui.currtool == "root") {
			this.draw();
			this.drawRoot(this.getEquation(jsgui.currEq), this.getColor(jsgui.currEq), x);
		}
		else if(jsgui.currtool == "intersect") {
			this.draw();
			this.drawIntersect(this.getEquation(jsgui.currEq), this.getColor(jsgui.currEq), x);
		}
		else if(jsgui.currtool == "derivative") {
			this.draw();
			this.drawDerivative(this.getEquation(jsgui.currEq), this.getColor(jsgui.currEq), x);
		}
		this.prevDrag = {x : x, y : y};
	}

	this.mouseDown = function(event) {
		document.body.style.cursor = "hand";
		if(this.mousebutton == 0) {
			if(jsgui.currtool == "zoombox") {
				jsgui.currtool = "zoombox_active";
			}
			this.startDrag.x = event.pageX - this.canvasX;
			this.startDrag.y = event.pageY - this.canvasY;
			this.startCoord = this.copyCoord(this.currCoord);
		}
		this.mousebutton = 1;
	}

	this.mouseUp = function(event) {
		//document.body.style.cursor = "auto";
		if(jsgui.currtool == "zoombox_active") {
			this.doZoomBox(this.startDrag.x, this.startDrag.y, event.pageX - this.canvasX, event.pageY - this.canvasY);
			jsgui.setTool("pointer");
		}
		if(jsgui.currtool == "zoomin") {
			if(Math.abs((event.pageX - this.canvasX) - this.startDrag.x) + Math.abs((event.pageY - this.canvasY) - this.startDrag.y) < 5)
				this.zoom(0.10, event);
		}
		if(jsgui.currtool == "zoomout") {
			if(Math.abs((event.pageX - this.canvasX) - this.startDrag.x) + Math.abs((event.pageY - this.canvasY) - this.startDrag.y) < 5)
				this.zoom(-0.10, event);
		}
		this.mousebutton = 0;
		this.startCoord = this.copyCoord(this.currCoord);
	}

	this.mouseWheel = function(event, delta) {
		if(delta > 0) {
			this.zoom(this.zoomFactor, event);
		}
		else {
			this.zoom(-this.zoomFactor, event);
		}
	}
	
	this.setWindow = function(x1, x2, y1, y2) {
		this.currCoord.x1 = x1;
		this.currCoord.x2 = x2;
		this.currCoord.y1 = y1;
		this.currCoord.y2 = y2;
		this.startCoord = this.copyCoord(this.currCoord);
		this.draw();
	}

	this.zoom = function(scale, event) {
		range = this.getRange();
		if(event) {
			mousex = event.pageX - this.canvasX;
			mousey = event.pageY - this.canvasY;
			mousetop = 1-(mousey / this.height);	//if we divide the screen into two halves based on the position of the mouse, this is the top half
			mouseleft = mousex / this.width;	//as above, but the left hald
			this.currCoord.x1 += range.x * scale * mouseleft;
			this.currCoord.y1 += range.y * scale * mousetop;
			this.currCoord.x2 -= range.x * scale * (1-mouseleft);
			this.currCoord.y2 -= range.y * scale * (1-mousetop);
		}
		else {
			this.currCoord.x1 += range.x * scale;
			this.currCoord.y1 += range.y * scale;
			this.currCoord.x2 -= range.x * scale;
			this.currCoord.y2 -= range.y * scale;
		}
		this.startCoord = this.copyCoord(this.currCoord);
		this.draw();
	}

	this.animate = function() {
		this.currCoord.x1 += 0.05;
		this.currCoord.y1 += 0.05;
		this.currCoord.x2 += 0.05;
		this.currCoord.y2 += 0.05;
		this.draw();
		setTimeout('jsgcalc.animate()', 50);
	}

	this.resizeGraph = function(width, height) {
		oldheight = this.height;
		oldwidth = this.width;

		//Resize the elements
		$("#graph").width(width);
		$("#graph").height(height);

		this.ctx.height = height;
		this.ctx.width = width;
		this.graph.height = height;
		this.graph.width = width;
		this.height = height;
		this.width = width;
		dump("Resized to " + width + "x" + height);

		//Compute the new boundaries of the graph
		this.currCoord.x1 *= (width/oldwidth);
		this.currCoord.x2 *= (width/oldwidth);
		this.currCoord.y1 *= (height/oldheight);
		this.currCoord.y2 *= (height/oldheight);
		this.startCoord = this.copyCoord(this.currCoord);

		//Compute how many grid lines to show
		this.maxgridlines.x = 0.015 * width;
		this.maxgridlines.y = 0.015 * height;
		this.draw();
	}

	this.resetZoom = function() {
		this.currCoord = {x1 : -5 * (this.width / this.height), y1 : -5, x2 : 5 * (this.width / this.height), y2 : 5};
		this.startCoord = this.copyCoord(this.currCoord);
		this.draw();
	}

	this.initCanvas = function() {
		if (this.graph.getContext){
			this.ctx = this.graph.getContext('2d');
			//this.ctx.height = 953;
			$("#graph_wrapper").width($("#graph_wrapper").width() - $("#sidewrapper").width());
			this.resizeGraph($("#graph_wrapper").width() - widthPlusPadding("#toolbar"), $("#graph_wrapper").height());
			this.currCoord = {x1 : -5 * (this.width / this.height), y1 : -5, x2 : 5 * (this.width / this.height), y2 : 5};
			this.startCoord = this.copyCoord(this.currCoord);
			jsgui.evaluate();

			//this.animate();

			var self = this;
			$("#graph").mousemove(function(event) {
				self.canvasX = self.graph.offsetLeft;
				self.canvasY = self.graph.offsetTop;
				self.checkMove(event.pageX - self.canvasX, event.pageY - self.canvasY);
			});
			$("#graph").mousedown(function(event) {
				self.mouseDown(event);
			});
			$("#graph").mousewheel(function(event, delta) {
				self.mouseWheel(event, delta);
				return false;
			});
			$("#graph").mouseup(function(event) {
				self.mouseUp(event);
			});
			$(window).resize(function() {
				if($("#sidewrapper").is(":visible"))
					$("#graph_wrapper").width($("#wrapper").width() - $("#sidewrapper").width());
				else
					$("#graph_wrapper").width($("#wrapper").width());
				self.resizeGraph($("#graph_wrapper").width(), $("#graph_wrapper").height());
			});
		}
		else {
			alert("Sorry, your browser is not supported.");
		}
	}
};

$(document).ready(function() {
	jsgcalc = new JSgCalc;
	jsgcalc.initCanvas();
});

function about() {
	alert("For demonstration purposes only.\n\nCalculations are not guaranteed to be correct and are often inaccurate due to floating point errors. Use at your own risk.");
}
