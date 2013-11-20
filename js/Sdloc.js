/*
mf:2013-11-02::Sdloc.js

This is an Angular service that manages local persisted data

It saves data to a local data store after stringifying it

*/

// This service returns a JSON file from the server
myap.factory('jsonServ', function($resource) {
  return $resource('dat/tst.json');
});

myap.service('locDat', function () {

	// Datastore variable name constants
	var CAMC = 'animsgcom', CAMDC = 'animsgdotcom';
	// Current animation name, used to keep track between screens
	var cAName;

	this.getAnim = function () {

		// Check if the data store exists
		if (localStorage.getItem(cAName) !== null) {
			// Get data from local store
			return JSON.parse(localStorage[cAName]);
		} else {
			// Initialise the data
			return initDat();
		}
	};

	// Set the current animation name
	this.setCurAni = function (iD) {
		// Build the animation name
		cAName = CAMC + padTo3(iD);
	}

	function padTo3(number) {
		if (number<=999) { number = ("00"+number).slice(-3); }
		return number;
	}

	// Get the list of animations
	this.getAnims = function () {

		// Check if the data store exists
		if (localStorage.getItem(CAMDC) !== null) {
			// Get data from local store
			oAnims = JSON.parse(localStorage[CAMDC]);
		} else {
			// Initialise and save the data
			oAnims = initFil();
			saveLDat(oAnims, CAMDC)

		}
		return oAnims;
	};


	// Save a list of animations
	this.savDatA = function (oAnims) {
		// Save to local storage 
		saveDatA(oAnims);
	}

	// Save the animation data
	function saveDatA(oAnims){
		// Save to local storage
		localStorage[CAMDC] = angular.toJson(oAnims);
	}

	// Initialise a list of animations
	function initFil(){

		return {
			 "iLID": 0,
			 "aDAn": []
		}
	}


	// Save an animation sequence
	this.savDat = function (oAnSeq) {
		// Save to local storage 
		saveDat(oAnSeq);
	}


	// Initialise data method
	this.inDat = function () {
		// Get the initialise data from onject literal
		oAnSeq = initDat();
		// Save to local storage
		saveDat(oAnSeq);

		return initDat(oAnSeq);
	}


	// Save the animation data
	function saveLDat(oDat, key){
		// Save to local storage
		localStorage[key] = JSON.stringify(oDat);
	}

	// Save the animation data
	function saveDat(oAnSeq){
		// Save to local storage
		localStorage[cAName] = JSON.stringify(oAnSeq);
	}


	function initDat(){

		return {
			 "iCnt": 0,
			 "iTL": 1000,
			 "iLID": 0,
			 "aDat": []
		}
	}
});