// Controller for the home screen
myap.controller('homeCont', 
	['$scope', '$location', '$filter', 'locDat', 'playAn', 'jsonServ', 
	function ($scope, $location, $filter, locDat, playAn, jsonServ) {

	init();
	// Initialises the home controller screen
	function init(){

		$scope.msg = 'hello';
		$scope.showCanv = false;
		$scope.showAdd = true;
		$scope.showSav = false;
		$scope.showEdN = false;
		$scope.mod = {anName: '', edName: ''};


		// create a wrapper around native canvas element (with id="c")
		$scope.canv = new fabric.StaticCanvas('c');

		// Runs the data initialisation routine
		$scope.oAnims = locDat.getAnims();
		// Get the animation count
		$scope.anCnt = $scope.oAnims.aDAn.length;
		// Runs the animation
		if($scope.anCnt === 0){
			$scope.msg = 'No saved animations found:';
			//$scope.showAdd = true;
		} else {
			// Or show the number of saved animations
			$scope.msg = $scope.anCnt + ' saved animations found:';
		}
		// Get a list of sample files from a json file 
		$scope.getDat = jsonServ.get({fileName: 'files'}, function(jdat) {
			// Store the sample names to a var
			$scope.oSamp = jdat;
		});
	}


	// Show the sample animations
	$scope.showSamp = function(fname){
		// Get the data from the server
		$scope.getDat = jsonServ.get({fileName: fname}, function(jdat) {
			//console.log(jdat);
			$scope.showCanv = true;
			playAn.runAni(jdat, $scope.canv);
		});
	}

	// Switch to the editor screen
	$scope.showEd = function(iD){
		// Switch location and pass id as a parameter
		$location.path('edit/' + $scope.iEd); 
	}

	// Plays animation when button clicked
	$scope.playDat = function(){
		playAni();
	}


	// Play the animation data
	function playAni(){
		// Get the animation data
		var oAnSeq = locDat.getAnim($scope.iEd);
		// Show canvas and run the event stack
		$scope.showCanv = true;
		playAn.runAni(oAnSeq, $scope.canv);
	}


	// Update an animation name
	$scope.upAName = function(iEd) {

		// Get the record to update
		var oAn = $filter('getByProp')('iD', iEd, $scope.oAnims.aDAn);
		// Set the name property
		oAn.name = $scope.mod.edName;
		// Save local data
		locDat.savDatA($scope.oAnims);
	}


	// Edit a local animation 
	$scope.edAName = function(iD) {

		$scope.showAdd = false;
		$scope.showEdN = true;
		// Create ref to make data easier to work with
		var aDat = $scope.oAnims.aDAn;
		// Get the record to edit
		var oAn = $filter('getByProp')('iD', iD, aDat);
		// Get the animation name and id
		$scope.mod.edName = oAn.name;
		// Save the ID of the current active animation
		$scope.iEd = iD;
		// Play the animation
		playAni();
	}


	// Add a new animation
	$scope.addAnim = function() {

		// Create the template
		var oAI = {name: $scope.mod.anName};
		// Increment object counter and save 
		var iLID = $scope.oAnims.iLID + 1;
		$scope.oAnims.iLID = iLID; oAI.iD = iLID;
		// Add it to the data 
		$scope.oAnims.aDAn.push(oAI);
		// Clear the add box
		$scope.mod.anName = '';
		// Save local data
		locDat.savDatA($scope.oAnims);
		$scope.msg = $scope.oAnims.aDAn.length + ' saved animations found:';
		// Close add and show saved animations
		$scope.showAdd = false;
		$scope.showSav = true;

	}

}]);