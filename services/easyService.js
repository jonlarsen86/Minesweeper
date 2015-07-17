"use strict";
app.service("easyService", function() {

	//create the game board
	this.createGameBoard = function() {
		var maxRows = 9;
		var maxCols = 9;
		var mines = 10;
		var minefield = {};
		var currentLocation = [];
    	minefield.rows = [];

    	//populate the rows
    	for(var i = 0; i < maxRows; i++) {
        	var row = {};
        	row.spots = [];
        	row.id = i;
        	
        	//populate the spots
	        for(var j = 0; j < maxCols; j++) {
	            var spot = {};
	            spot.isClicked = false;
	            spot.isFlag = false;
	            spot.content="empty";
	            spot.id = j;
	            row.spots.push(spot);
	        }
        
        	minefield.rows.push(row);
    	}

    	//find the current spot you are on
    	var getSpot = function(minefield, row, column) {
    		return minefield.rows[row].spots[column];
		}

		//populate one mine
		var populateMine = function(minefield) {
				var row = Math.floor(Math.random() * 8.99999);
				var column = Math.floor(Math.random() * 8.99999);
				var spot = getSpot(minefield, row, column);
				if (spot.content === "mine") {
					populateMine(minefield);
					return;
				}
				spot.content = "mine";
		}

		//randomize the mines that were populated
		var randomizeMines = function(minefield) {
			for (var i = 0; i < mines; i++) {
				populateMine(minefield);
			}
		}

		randomizeMines(minefield, getSpot);

		//calculate the number of mines touching that spot
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
				var spot = getSpot(minefield, row - 1, column);
					if (spot.content === "mine") {
						mineCount++;
					}
				if (column < maxCols - 1) {
					var spot = getSpot(minefield, row - 1, column + 1);
					if (spot.content === "mine") {
						mineCount++;
					}
				}
			}

			if (row < maxRows - 1) {
				if (column > 0) {
					var spot = getSpot(minefield, row + 1, column - 1);
					if (spot.content === "mine") {
						mineCount++;
					}
				}
				var spot = getSpot(minefield, row + 1, column);
				if (spot.content === "mine") {
						mineCount++;
				}
				if (column < maxCols - 1) {
					var spot = getSpot(minefield, row + 1, column + 1);
					if (spot.content === "mine") {
						mineCount++;
					}
				}	
			}

			if (column > 0) {
				var spot = getSpot(minefield, row, column - 1);
				if (spot.content === "mine") {
					mineCount++;
				}
			}

			if (column < maxCols - 1) {
				var spot = getSpot(minefield, row, column + 1);
				if (spot.content === "mine") {
					mineCount++;
				}
			}

			if (mineCount > 0) {
				thisSpot.content = mineCount;
			}
		}

		//calculate the numbers for the whole board
		var calculateAllNumbers = function(minefield) {
	    	for(var y = 0; y < maxRows; y++) {
	        	for(var x = 0; x < maxCols; x++) {
	            calculateNumber(minefield, x, y);
        		}
    		}
		}

		calculateAllNumbers(minefield);

		this.wonOrLost = function(minefield) {
			var spotCounter = 0;
			for (var y = 0; y < maxRows; y++) {
        		for (var x = 0; x < maxCols; x++) {
            		var spot = getSpot(minefield, x, y);
            		//If the spot is clicked and not a mine, increase the counter.
            		if (spot.isClicked && spot.content !== "mine") {
                		spotCounter++;
                	//If the spot is clicked and a mine...
            		} else if (spot.isClicked && spot.content === "mine") {
            			spot.content = "redMine";
            			//for each row...
            			minefield.rows.forEach(function(row) {
            				//for each spot in that row...
            				row.spots.forEach(function(spot) {
            					//if content is a mine, uncover it.
	            				if (spot.content === "mine") {
	            					spot.isClicked = true;
	            				}
	            			});
            			});
            			return "lost";
            		}
    			}
    		}
    		if ((maxRows * maxCols) - spotCounter === mines) {
    			return "won";
    		}
		}

		//expand empty spots up to spots with numbers
    	this.expand = function(coord, minefield){
		    var surroundingCoords = [
		    	{x: coord.x - 1, y: coord.y - 1},
		    	{x: coord.x - 1, y: coord.y},
		    	{x: coord.x - 1, y: coord.y + 1},

		    	{x: coord.x, y: coord.y - 1},
		    	{x: coord.x, y: coord.y + 1},

		    	{x: coord.x + 1, y: coord.y - 1},
		    	{x: coord.x + 1, y: coord.y},
		    	{x: coord.x + 1, y: coord.y + 1},
		    ];

		    surroundingCoords.forEach(function(coord) {
		    	if (coord.x >= 0 && coord.x < maxRows && coord.y >= 0 && coord.y < maxCols) {
		    		var spot = getSpot(minefield, coord.x, coord.y)
		    		//If it's a mine...
		    		if (spot.content === "mine") {
		    			return;
		    		}
		    		//If it's a number...
		    		if (!spot.isClicked && spot.content !== "empty" && spot.content !== "mine") {
		    			spot.isClicked = true;
		    			return;
		    		//If it's an empty spot...
		    		} else if (!spot.isClicked && spot.content === "empty") {
		    			spot.isClicked = true;
		    			return this.expand(coord, minefield)
		    		} else if (spot.isClicked) {
		    			return;
		    		}
		    	}
		    }.bind(this))
		}

		this.timer = function() {
			
		}

    	return minefield;
	}

});