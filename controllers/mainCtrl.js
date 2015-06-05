"use strict";
app.controller("gameCtrl", function($scope, gameService) {

	$scope.gameBoard = gameService.createGameBoard();

})