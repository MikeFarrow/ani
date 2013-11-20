// Controller for the home screen
myap.controller('homeCont', function ($scope, $location, locDat, playAn, jsonServ) {

	init();
	// Initialises the home controller screen
	function init(){

		$scope.msg = 'hello';
		$scope.showCanv = false;
		$scope.showAdd = true;
		$scope.showEdN = false;

		// create a wrapper around native canvas element (with id="c")
		$scope.canv = new fabric.Canvas('c');

		// Runs the data initialisation routine
		$scope.oAnims = locDat.getAnims();
		// Runs the animation
		if($scope.oAnims.iLID === 0){
			$scope.msg = 'No saved animations found:';
			//$scope.showAdd = true;
		} else {
			$scope.msg = $scope.oAnims.iLID + ' saved animations found:';
		}
	}

	// Get some remote data
	$scope.tstDat = function(){
		jsonServ.get(function(data){
			//$scope.name = data.name;
			console.log(data);
			playAn.runAni(data, $scope.canv);
		});
	}

	// Switch to the editor screen
	$scope.showEd = function(){
		$location.path('play'); // path not hash
	}

	// Plays animation
	$scope.playDat = function(){

		playAni();
	}


	// Play the animation data
	function playAni(){

		// Get the animation data
		var oAnSeq = locDat.getAnim();
		// Show canvas and run the event stack
		$scope.showCanv = true;
		playAn.runAni(oAnSeq, $scope.canv);
	}

	// Update an animation name
	$scope.upAName = function(iEd) {

		// Add it to the data 
		$scope.oAnims.aDAn[iEd].name = $scope.edName;
		// Save local data
		locDat.savDatA($scope.oAnims);
		$scope.showAdd = true;
		$scope.showEdN = false;
	}


	// Add shape to canvas
	$scope.edAName = function(iD) {

		$scope.showAdd = false;
		$scope.showEdN = true;
		var aDat = $scope.oAnims.aDAn;
		// Loop through the animations
		for (var i = 0, len = aDat.length; i < len; i++) {
			// If the ids match
			if(aDat[i].iD === iD){
				// Get the animation name and id
				$scope.edName = aDat[i].name;
				$scope.iEd = i;
			}
		}
		// Set the current active animation in local data
		locDat.setCurAni($scope.oAnims.aDAn[$scope.iEd].iD);
		// Play the animation
		playAni();

	}

	// Add a new animation
	$scope.addAnim = function() {

		// Create the template
		var oAI = {name: $scope.animName};
		// Increment object counter and save 
		var iLID = $scope.oAnims.iLID + 1;
		$scope.oAnims.iLID = iLID; oAI.iD = iLID;
		// Add it to the data 
		$scope.oAnims.aDAn.push(oAI);
		// Clear the add box
		$scope.animName = '';
		// Save local data
		locDat.savDatA(oAnims);
		$scope.msg = $scope.oAnims.iLID + ' saved animations found:';

	}

});



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