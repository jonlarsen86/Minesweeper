var app = angular.module("minesweeper", ["ngRoute"])
.config(function($routeProvider) {
	$routeProvider
	.when("/difficulty/easy", {
		templateUrl: "templates/easyTmpl.html",
		controller: "easyCtrl"
	})
	.when("/difficulty/normal", {
		templateUrl: "templates/normalTmpl.html",
		controller: "normalCtrl"
	})
	.when("/difficulty/hard", {
		templateUrl: "templates/hardTmpl.html",
		controller: "hardCtrl"
	})
	.otherwise({
		redirectTo: "/"
	});

})