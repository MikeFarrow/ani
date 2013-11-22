/*
mf:2013-10-31::Splay.js

This is an Angular service that manages the playback of animations

It uses a recursive function to play the animation because it relies on an asycronous onComplete event in fabric.animate

*/
myap.service('playAn', function (mntCanv) {


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
				anEv(oAE, oAnSeq, canv);
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
	function anEv(oAE, oAnSeq, canv) {

		// Animate the required canvas item
		canv.item(oAE.iT).animate(oAE.oPt, {
			duration: oAnSeq.iTL,
			onChange: canv.renderAll.bind(canv),

			onComplete: function () {
				// Do the next item when finished
				runAn(oAnSeq, canv);
			}
		})
	}

})