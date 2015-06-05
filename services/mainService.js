"use strict";
app.service("gameService", function($http, $q) {

	this.createGameBoard = function() {
		var minefield = {};
    	minefield.rows = [];

    	var row = Math.floor(Math.random() * 8);
		var column = Math.floor(Math.random() * 8);
    
    	for(var i = 0; i < 9; i++) {
        	var row = {};
        	row.spots = [];
        
	        for(var j = 0; j < 9; j++) {
	            var spot = {};
	            spot.notClicked = true;
	            spot.isFlag = false;
	            spot.content="empty";
	            row.spots.push(spot);
	        }
        
        	minefield.rows.push(row);
    	}

    	var getSpot = function(minefield, row, column) {
    		return minefield.rows[row].spots[column];
		}

		var populateMine = function(minefield) {
				var row = Math.floor(Math.random() * 8);
				var column = Math.floor(Math.random() * 8);
				var spot = getSpot(minefield, row, column);
				spot.content = "mine";
		}

		var randomizeMines = function(minefield) {
			for (var i = 0; i < 10; i++) {
				populateMine(minefield);
			}
		}

		randomizeMines(minefield, getSpot);

		var calculateNumber = function(minefield, row, column) {
			var thisSpot = getSpot(minefield, row, column);

			if (thisSpot.content === "mine") {
				return;
			}

			var mineCount = 0;

			if (row > 0) {
				if (column > 0) {
					var spot = getSpot(minefield, row - 1, column - 1);
					if (spot.content === "mine") {
						mineCount++;
					}
				}
			}

			if (mineCount > 0) {
				thisSpot.content = mineCount;
			}
		}

		var calculateAllNumbers = function(minefield) {
	    	for(var y = 0; y < 9; y++) {
	        	for(var x = 0; x < 9; x++) {
	            calculateNumber(minefield, x, y);
        		}
    		}
		}

		calculateAllNumbers(minefield);
    
    	return minefield;
	}

});