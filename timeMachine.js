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
    // vars
    var rate = 0; // speed at which machine travels thru time, may be +/-, init=0
    var presentYear = new Date().getFullYear(); // limit of travelling to future = present year
    var tm = this;
    var visitingYear = presentYear; // in what year is the machine located?
    // methods
    tm.getRate = function() {	// you can getRate() on the TimeMachine externally...
	return rate;
    };
    var setRate = function(newRate){ // but only the TimeMachine can setRate() itself
	rate = newRate;
    };
    // time navigation
    tm.jump = function(){	// moves through time at the specified rate
	var theYear = visitingYear + parseInt(rate); // prospective year to jump to
	if (theYear > presentYear) {		     // test if it's in the future
	    visitingYear = presentYear;		     // 'crash' into present
	    document.getElementById("chronoLever").value = 0; // reset lever
	    rate = 0;					      // stop the machine & alert
	    alert("Sorry, there are no chronoports on the future side of year " +presentYear+ ".");
	} else {		// if the visit is legal do it
	    visitingYear = theYear;
	};
    };
    // methods for display
    var ChronoScope = function(){
	this.draw = function(){
	    var cs = document.createElement("h1");
	    cs.innerHTML = visitingYear;
	    cs.id = "visitingYear";
	    document.body.appendChild(cs);
	    return cs;
	};
	this.update = function(){
	    var yearDisplay = document.getElementById("visitingYear");
	    yearDisplay.innerHTML = visitingYear;
	    return yearDisplay;
	};
	this.draw();
    };
    var tmScope = new ChronoScope();
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
	window.setInterval(function(){tm.jump(),tmScope.update(); }, 1000); 
    };
	
	var tmSlider = new ChronoLever();
    };
// =========================
// test fns
// =========================
// time machine
var testTimeMachine = new TimeMachine();
