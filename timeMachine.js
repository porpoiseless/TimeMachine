// -*- mode: js2 -*-
// Author: jto
// =========================
// html manip functions
// =========================
var createEl = function (theEl, theContent, theId){
    var el = document.createElement(theEl);
    el.innerHTML = theContent;
    el.id = theId;
    document.body.appendChild(el);
    return el;
};
var elAddEventListener = function(elId, theEvent, theFunction){
    // add an event listener to an element
    var el = document.getElementById(elId);
    el.addEventListener(theEvent, theFunction);
    return el;
};

    


// =========================
// time machine objects
// =========================
// the time machine! 
var TimeMachine = function() {
    // important time machine vars
    var rate = 0; // speed at which machine travels thru time, may be +/-, init=0
    var presentYear = new Date().getFullYear(); // limit of travelling to future = present year
    var tm = this;
    var visitingYear = presentYear; // in what year is the machine located?
    // methods
    // change years per second
    tm.getRate = function() {
	return rate;
    };
    var setRate = function(newRate){
	rate = newRate;
    };
    // time navigation
    tm.jump = function(){
	visitingYear += parseInt(rate);
    };
    // methods for display
    tm.draw = function(){
	var yearDisplay = createEl("h1", visitingYear, "visitingYear");
	return yearDisplay;
    };
    tm.update = function(){
	var yearDisplay = document.getElementById("visitingYear");
	if (yearDisplay.innerHTML != visitingYear) {
	    yearDisplay.innerHTML = visitingYear;
	};
	return yearDisplay;
    };
    // ==============================
    	
    // var TMButton = function(buttonMessage, buttonEffect, buttonId){
    // 	var theButton = createEl("button", buttonMessage, buttonId);
    // 	elAddEventListener(buttonId, "click", function(){
    // 	    buttonEffect();
    // 	    // console.log("You are now in the year " + tm.year + "!");
    // 	    tm.update();
    // 	});
    // };
    // implement a slider to change the time machine's rate
    var syncRateToLever = function() {
	rate = document.getElementById("chronoLever").value;
	//	console.log(rate);
    };
    var ChronoLever = function(){
	var theSlider = document.createElement('input');
	theSlider.type = "range";
	theSlider.min = -5;
	theSlider.max = 5;
	theSlider.value = 0;
	theSlider.step = 1;
	theSlider.id = "chronoLever";
	var theLabel = document.createElement('label');
	theLabel.for = "chronoLever";
	theLabel.innerHTML = "Speed:";
	var theDash = document.createElement('div');
	theDash.id = "TMDashboard";
	document.body.appendChild(theDash);
	theDash.appendChild(theLabel);
	theDash.appendChild(theSlider);
	elAddEventListener("chronoLever","input", syncRateToLever);
	window.setInterval(function(){tm.jump(),tm.update(); }, 1000); 
    };
    tm.draw();
    var tmSlider = new ChronoLever();
    // tm.forward = new TMButton("Go forward in time!", tm.increment, "forwardInTime");
    // tm.stop = new TMButton("Stop the Machine!", function(){
    // 	alert("Brakes not implemented yet!"); });
    // tm.backward = new TMButton("Go backward in time!", tm.decrement, "backwardInTime");
};
// =========================
// test fns
// =========================
// time machine
var testTimeMachine = new TimeMachine();
