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
var TimeMachine = function(ypsRate, timeLocation){ // years per second, where in time?
    var tm = this;
    var rate = ypsRate;
    tm.year = timeLocation;    // date: what year is the time traveller in now?
    tm.changeRate = function(newRate){
	rate = newRate;
    };
    // methods for changing year
    tm.decrement = function(){ 	// go back *rate* years
	tm.year = tm.year - rate;
    };
    tm.increment = function(){	// go forward *rate* years
	tm.year = tm.year + rate;
    };
    // methods for display
    tm.draw = function(){
	var yearDisplay = createEl("h1", tm.year, "timeLocation");
	return yearDisplay;
    };
    tm.update = function(){
	var yearDisplay = document.getElementById("timeLocation");
	if (yearDisplay.innerHTML != tm.year) {
	    yearDisplay.innerHTML = tm.year;
	};
	return yearDisplay;
    };
    var TMButton = function(buttonMessage, buttonEffect, buttonId){
	var theButton = createEl("button", buttonMessage, buttonId);
	elAddEventListener(buttonId, "click", function(){
	    buttonEffect();
	    console.log("You are now in the year " + tm.year + "!");
	    tm.update();
	});
    };
    tm.draw();
    tm.forward = new TMButton("Go forward in time!", tm.increment, "forwardInTime");
    tm.stop = new TMButton("Stop the Machine!", function(){
	console.log("Brakes not implemented yet!"); });
    tm.backward = new TMButton("Go backward in time!", tm.decrement, "backwardInTime");


};
// =========================
// test fns
// =========================
// time machine
var theCurrentYear = new Date();
var testTimeMachine = new TimeMachine(1,theCurrentYear.getFullYear());

