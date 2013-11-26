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
			//console.log(oAnims.aDAn);
		}
		// Get a list of sample files from a json file 
		$scope.oSamp = jsonServ.get({fileName: 'files'}, function(jdat) {
			//	console.log('files'); 
			console.log(jdat);
		});
	}


	// Switch to the editor screen
	$scope.showEd = function(){
		$location.path('edit'); // path not hash
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