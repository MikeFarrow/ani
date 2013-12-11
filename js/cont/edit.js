// Controller for the edit screen
myap.controller('editCont', 
	['$scope','$routeParams', '$location', 'locDat', 'playAn', 'trckDif', 'mntCanv', 
	function ($scope, $routeParams, $location, locDat, playAn, trckDif, mntCanv) {

	$scope.boxes = {'color': 'red'};

	// create a wrapper around native canvas element (with id="c")
	var canv = new fabric.Canvas('c');

	// Get data from local storage
	// Use id passed by routing parameter for bookmarks
	var oAnSeq = locDat.getAnim($routeParams.anid);

	// Run the event stack
	playAn.runAni(oAnSeq, canv);


	// Set the canvas modified event
	canv.on('object:modified', function(options){ 

		// See what has changed
		trckDif.findDif(options, oAnSeq);
	})


	// Undo the last action
	$scope.unDo = function(){
		//var lstIt = oAnSeq.aDat[oAnSeq.aDat.length - 1];
		var lstIt = oAnSeq.aDat.pop();
		console.log('undo');
		console.log(lstIt);
		if(lstIt.cAct === 'an'){
			console.log('animate');
			// Unanimate the event
			playAn.unAni(oAnSeq, canv, lstIt);
		} else {
			console.log('ad shape');
			var iT = canv.getObjects().length - 1
			console.log(iT);
			var remIt = canv.getObjects();
			console.log(remIt[iT]);
			canv.remove(remIt[iT]);
			//$scope.$apply();
		}
	}

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
	
}]);