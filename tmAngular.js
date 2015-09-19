// // -*- mode: js2 -*-
// // Author: jto

var app = angular.module('timeMachineAdventure', []);
app.controller('tmControl', function($scope, $interval) {
    $scope.tmSpeed = 0;		// initial speed 0... err, 1s/s?
    $scope.tmYear = new Date().getFullYear(); // initial date: present
    var updateYear = function(){
	var theDestination = parseInt($scope.tmSpeed) + parseInt($scope.tmYear);
	var timeHorizon = new Date().getFullYear().valueOf();
	if (theDestination > timeHorizon) {
	    $scope.tmSpeed = 0;
	    alert("Warning! There are no chronoports on the future side of year " + timeHorizon);
	    $scope.tmYear = timeHorizon;
	} else {
	    $scope.tmYear = theDestination;
	};
    };
    $interval(updateYear,1000);
});
