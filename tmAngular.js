// -*- mode: js2 -*-
// Author: jto

// ===============
// TIME MACHINE
// ===============
function TimeMachine(depth,speed){
    this.depth = depth || 0;	// years before present
    this.speed = speed || 0;	// years per jump
};
// things time machines can do
// ========== TIMEJUMP!
TimeMachine.prototype.jump = function(crashFn) { // fn to run on illegal jump
    var proposedYear = parseInt(this.depth) + parseInt(this.speed);
    if (proposedYear < 0) {	// check if visit is illegal, i.e. in real future
	this.depth = 0;
	this.speed = 0;
	crashFn();
    } else {			// if the jump is legal
	this.depth = proposedYear; // do it
    };
};
// ========== convert depth to formatted year
TimeMachine.prototype.getYear = function(yearsBeforePresent) {
    // turn years before present to a common-era style date
    var ybp = parseInt(yearsBeforePresent) || this.depth; // default to time machine depth
    var y = new Date().getFullYear() - ybp;
    var suffix;		// for CE/BCE
    if (y > 0){
	suffix = " CE";
    } else {
	y = 1 + Math.abs(y); // bce format date, non-negative, starts @ 1
	suffix = " BCE";
    }
    return y + suffix;
};
// ========== change speed
TimeMachine.prototype.setSpeed = function(newSpeed) {
    this.speed = newSpeed;
};
// ===============
// ANGULAR.JS APP
// ===============
var app = angular.module('timeMachineAdventure', []);
app.controller('tmControl', function($scope, $interval) {
    $scope.speed = 0;
    $scope.tm = new TimeMachine(10,0);
    function update() {
	$scope.tm.setSpeed($scope.speed);
	$scope.tm.jump(function(){ //function to execute if illegal jump is made
	    $scope.speed = 0;	   // has to be a call-back to access $scope
	    alert("Warning! There are no chronoports on the future side of " + $scope.tm.getYear());
	} );	    
    };
    
    $interval(update,1000);
});
