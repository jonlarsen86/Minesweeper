"use strict";
app.controller("mainCtrl", function($scope, $location, mainService) {
	
	$scope.createEasyGame = function() {
		$location.path("/difficulty/easy")
	}
	$scope.createNormalGame = function() {
		$location.path("/difficulty/normal")
	}
	$scope.createHardGame = function() {
		$location.path("/difficulty/hard")
	}

});