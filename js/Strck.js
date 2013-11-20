/*
mf:2013-10-31::Strck.js

This is an Angular service that manages the tracking of differences in animations
*/
myap.service('trckDif', function (locDat) {

	// Check for differences in the state of the modified item
	this.findDif = function(options, oAnSeq){

		// Create ref to target and object for changes
		var oT = options.target;  var oChng = {};

		// Check the angle
		chkAng(oT, oChng);
		// Check scaling and position if not angle change
		if(typeof(oChng.angle) == 'undefined'){
			// Check for scale change
			chkScl(oT, oChng);
			// Check if the position has changed
			chkPos(oT, oChng);
		}
		upDat(oChng, oT, oAnSeq);
	}


	// Check if the angle has changed
	function chkAng(oT, oChng){

		// If the angle is different to the original state angle
		if(oT.angle !== oT.originalState.angle){

			// Save the new angle
			oChng.angle = oT.angle;
			//logEvent('angle has changed to ' + oT.angle);
		}
	}


	// Check if the scale has changed
	function chkScl(oT, oChng){

		// If the scaleX is different to the original state scaleX
		if(oT.scaleX !== oT.originalState.scaleX){
			// Save the new scaleX
			oChng.scaleX = oT.scaleX;
			//logEvent('ScaleX has changed to ' + oT.scaleX);
		}

		// If the scaleY is different to the original state scaleY
		if(oT.scaleY !== oT.originalState.scaleY){
			// Save the new scaleY
			oChng.scaleY = oT.scaleY;
			//logEvent('scaleY has changed to ' + oT.scaleY);
		}
	}


	// Check if the position has changed
	function chkPos(oT, oChng){

		// If the top is different to the original state top
		if(oT.top !== oT.originalState.top){
			// Save the new top
			oChng.top = oT.top;
			//logEvent('top has changed to ' + oT.top);
		}
		// If the left is different to the original state left
		if(oT.left !== oT.originalState.left){
			// Save the new left
			oChng.left = oT.left;
			//logEvent('left has changed to ' + oT.left);
		}
	}


	// Update the animation change
	function upDat(oChng, oT, oAnSeq){

		// Get a reference to the data
		var aD = oAnSeq.aDat;
		var j = 0; // Object counter

		// Loop through the data items (to find changed item)
		for (i = 0; i < aD.length; ++i) {
			// Is it an add object item (ignore animation events)
			if(aD[i].cAct == 'ad'){
				// Does ID match the changed item
				if(aD[i].iD == oT.xid){
					// Set the animation change item
					var oIt = {cAct: 'an', iT: j, oPt: oChng};
					// Add it to the data 
					aD.push(oIt);
					// Reset the sequence
					oAnSeq.iCnt = 0;
					// Save to local storage
					locDat.savDat(oAnSeq);
				}
				// Increase the object counter
				j = j + 1;
			}
		}
	}

})