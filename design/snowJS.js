/*
* Altrozero.co.uk
* Copyright of Timothy Wilson
* Contact: altrozero@gmail.com
* Information: LET IT SNOW
*/

//Config VARs
var maxFlakes = 150;
var flakeChar = ".";
var speed = 1;
var minSize = 20;
var maxSize = 30;

//Standard VARs
snowtop = new Array();
snowleft = new Array();
snowdrift = new Array();
snowsize = new Array();
snowsizechange = new Array();
var curLoop = 0;
var divName = "";
var divWidth = 0;
var divHeight = 0;

//FUNCTIONS
/*
* Make sure the div you are submitting doesn't allow overflow and is fixed size
*/
function random_num(maxNum) {
	var rand = Math.floor(maxNum*Math.random())
    return rand
}

function start_snow(divBox) {
	//Get div information
	divName = divBox;
	var stringDivWidth = document.getElementById(divName).style.width;
	divWidth = stringDivWidth.slice(0, (stringDivWidth.length-2));
	var stringDivHeight = document.getElementById(divName).style.height;
	divHeight = stringDivHeight.slice(0, (stringDivHeight.length-2));
	
	for(var i = 0; i < maxFlakes; i++) {
		snowtop[i] = random_num(divHeight);
		snowleft[i] = random_num(divWidth);
		snowdrift[i] = random_num(2);
		snowsize[i] = (random_num((maxSize - minSize)) + minSize);
		snowsizechange[i] = random_num(5);
		document.getElementById(divName).innerHTML = '<div id="snowflake'+ i +'" style="position: absolute; color: #ffffff; font: Arial; font-size: ' + snowsize[i] + 'px; left: ' + snowleft[i] + 'px; top: ' + snowtop[i] + 'px;">' + flakeChar + '</div>' + document.getElementById(divName).innerHTML;
	}
	
	snow_fall();
}

function snow_fall() {
	for(var i = 0; i < maxFlakes; i++) {
		//setup id
		snowflakeid = "snowflake" + i;
		//set top location
		snowtop[i] += speed;
		if(snowtop[i] + snowsize[i] > divHeight) {
			snowtop[i] = 0;
			snowleft[i] = random_num(divWidth);
			snowsize[i] = (random_num((maxSize - minSize)) + minSize);
			snowsizechange[i] = random_num(5);
		}
		//set left location for drift
		if(snowdrift[i] == 1) {
			snowleft[i] += speed;
			if(snowleft[i] + snowsize[i] >= divWidth)
				snowdrift[i] = 2;
		} else {
			snowleft[i] -= speed;
			if(snowleft[i] <= 0)
				snowdrift[i] = 1;
		}
		//check size change
		if(snowsizechange[i] == 2) { //getting smaller
			snowsize[i] -= 0.1;
			if(snowsize[i] < 0) {
				snowsize[i] = 0;
			}
		} else if (snowsizechange[i] == 3) { //getting bigger
			snowsize[i] += 0.1;
		}
		
		//update page
		document.getElementById(snowflakeid).style.top = snowtop[i] + "px";
		document.getElementById(snowflakeid).style.left = snowleft[i] + "px";
		document.getElementById(snowflakeid).style.fontSize = snowsize[i] + "px";
	}
	
	//restart fall
	setTimeout("snow_fall()", 10);
}

start_snow("snowBox");
