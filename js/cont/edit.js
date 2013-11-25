// Controller for the edit screen
myap.controller('editCont', function ($scope, $location, locDat, playAn, trckDif, mntCanv) {

	$scope.boxes = {'color': 'red'};

	// create a wrapper around native canvas element (with id="c")
	var canv = new fabric.Canvas('c');

	// Get data from local storage
	var oAnSeq = locDat.getAnim();

	// Run the event stack
	playAn.runAni(oAnSeq, canv);


	// Set the canvas modified event
	canv.on('object:modified', function(options){ 

		// See what has changed
		trckDif.findDif(options, oAnSeq);
	})


	// Switch to the home screen
	$scope.showHom = function(){
		$location.path('home'); // path not hash
	}

	// Plays animation
	$scope.newTxt = function(){

		// Run the event stack
		var oAE = {
			"cShpe": "text",
			"txt": $scope.cTxt || '?',
			"cAct": "ad",
			"oPt": {
				"font": 40,
				"top": 200,
				"left": 250,
				"fill": $scope.boxes.color
			}
		};
		$scope.cTxt = '';
		adQue(oAE);

		mntCanv.addShpe(oAE, oAnSeq, canv);
	}


	// Adds a new shape
	$scope.newRec = function(cShape){

		//console.log(cShape);
		// Run the event stack
		var oAE = {
			"cShpe": cShape,
			"cAct": "ad",
			"oPt": {
				"width": 50,
				"height": 50,
				"top": 200,
				"left": 250,
				"fill": $scope.boxes.color
			}
		};
		adQue(oAE);

		mntCanv.addShpe(oAE, oAnSeq, canv);
	}


	// Add shape to canvas
	function adQue(oAE) {

		// Increment object counter and save 
		var iLID = oAnSeq.iLID + 1;
		oAnSeq.iLID = iLID; oAE.iD = iLID;
		// Add it to the data 
		oAnSeq.aDat.push(oAE);
		// Save local data
		locDat.savDat(oAnSeq);

	}



	// Plays animation
	$scope.playDat = function(){

		// Run the event stack
		playAn.runAni(oAnSeq, canv);
	}


	// Clears the data for an animation
	$scope.initDat = function(){

		// Runs the data initialisation routine
		oAnSeq = locDat.inDat();
		// Runs the animation
		playAn.runAni(oAnSeq, canv);
	}
	
});