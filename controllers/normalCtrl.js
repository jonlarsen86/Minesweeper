"use strict";
app.controller("normalCtrl", function($scope, $timeout, $location, normalService) {

	$scope.gameBoard = normalService.createGameBoard();
	$scope.modalShown = false;
	$scope.wonMessage = false;
	$scope.lostMessage = false;
	$scope.smileOpen = false;

	$scope.uncoverSpot = function(spot) {
		//if the spot is a flag, don't allow it to be clicked.
		if (spot.isFlag) {
			return;
		}
		//if the user has already won or lost, don't allow anything to be clicked.
		if ($scope.wonMessage || $scope.lostMessage) {
			return;
		}
		spot.isClicked = true;
		$scope.y = spot.id;
	};

	$scope.assignRow = function(row) {
		if ($scope.wonMessage || $scope.lostMessage) {
			return;
		}
		$scope.x = row.id;
		var location = {
			x: $scope.x,
			y: $scope.y
		}
		normalService.expand(location, $scope.gameBoard);
		var wonOrLost = normalService.wonOrLost($scope.gameBoard);
    	if (wonOrLost === "won") {
    		$scope.wonMessage = true;
    		$timeout(function() {
	    		$scope.modalShown = !$scope.modalShown;
	    		$scope.text = "won!"
	    	}, 750);
	    } else if (wonOrLost === "lost") {
	    	$scope.lostMessage = true;
	    	$timeout(function() {
	    		$scope.modalShown = !$scope.modalShown;
	    		$scope.text ="lost :("
	    	}, 750);
	    }
	}

	$scope.flag = function(spot) {
		if ($scope.wonMessage || $scope.lostMessage) {
			return;
		}
		spot.isFlag = !spot.isFlag;
	};

	$scope.resetGame = function() {
		normalService.createGameBoard();
	}

	$scope.showSmileOpen = function() {
		if ($scope.wonMessage || $scope.lostMessage) {
			return;
		}
		$scope.smileOpen = true;
	}

	$scope.hideSmileOpen = function() {
		if ($scope.wonMessage || $scope.lostMessage) {
			return;
		}
		$scope.smileOpen = false;
	}

	$scope.returnToHomePage = function() {
		$location.path("/");
	}


});