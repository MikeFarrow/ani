/*
mf:2013-10-31::Splay.js

This is an Angular service that manages the playback of animations

It uses a recursive function to play the animation because it relies on an asycronous onComplete event in fabric.animate

*/
myap.service('playAn', function (mntCanv) {


	var oAE;


	// Undo an animation item
	this.unAni = function (oAnSeq, canv) {

		// Remove the last item from the queue
		var lstIt = oAnSeq.aDat.pop();
		// If an animation event
		if(lstIt.cAct === 'an'){
			// Set the item number, option array and undo flag
			oAE.iT = lstIt.iT;
			oAE.oPt = lstIt.oPt.oX;
			oAE.bUn = true;
			// Animate the undo event
			anEv(oAE, oAnSeq.iTL, canv, oAnSeq)
		} else { // An add event
			// Remove the shape from the canvas
			mntCanv.delShpe(canv);
		}
	}


	// Animation playback loop
	this.runAni = function (oAnSeq, canv) {

		// Clear the canvas
		canv.clear();
		// Reset the current frame pointer
		oAnSeq.iCnt = 0;
		// Run the recursive animation function
		runAn(oAnSeq, canv);

	}

	// Animation playback loop
	function runAn(oAnSeq, canv) {

		// Check we are not at the end of the events list
		if (oAnSeq.iCnt < oAnSeq.aDat.length) {

			// Get the next action event and increase counter
			oAE = oAnSeq.aDat[oAnSeq.iCnt];
			++oAnSeq.iCnt;

			// Check the action for add or animate
			if (oAE.cAct == 'an') {
				// Animate a shape
				anEv(oAE, oAnSeq.iTL, canv, oAnSeq);
			} else {
				// Add a shape
				adEv(oAE, oAnSeq, canv);
			}		
		}
	}

	// Animate an event
	function adEv(oAE, oAnSeq, canv) {

		// Add the shape to the canvas
		mntCanv.addShpe(oAE, oAnSeq, canv);
		// Do the next item when finished
		runAn(oAnSeq, canv);
	}


	// Animate an event
	function anEv(oAE, iTL, canv, oAnSeq) {

		// Animate the required canvas item
		canv.item(oAE.iT).animate(oAE.oPt, {
			// Set the time lapse
			duration: iTL,
			onChange: canv.renderAll.bind(canv),

			onComplete: function () {
				// Do the next item when finished
				// (if not a single undo item)
				if (!('bUn' in oAE)){
					runAn(oAnSeq, canv);
				}
			}
		})
	}

})