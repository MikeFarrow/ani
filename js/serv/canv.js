/*
mf:2013-11-02::Scanv.js

This is an Angular service that manages the playback of animations

It uses a recursive function to play the animation because it relies on an asycronous onComplete event in fabric.animate

*/
myap.service('mntCanv', function (locDat) {


	// Animation playback loop
	this.delShpe = function (canv) {

			// Get the number of canvas objects
			var iT = canv.getObjects().length - 1;
			// Get the canvas objects
			var remIt = canv.getObjects();
			// Remove the last item
			canv.remove(remIt[iT]);
	}


	// Animation playback loop
	this.addShpe = function (oAE, oAnSeq, canv) {

		// Add the shape
		adEv(oAE, oAnSeq, canv);

	}


	// Add shape to canvas
	function adEv(oAE, oAnSeq, canv) {

		// Create the required canvas item
		switch (oAE.cShpe)
		{
		case 'rect':
			// Create the rectangle
			var oShpe = new fabric.Rect(oAE.oPt);
			break;
		case 'circ':
			// Create the Circle
			oAE.oPt.radius = 30;
			var oShpe = new fabric.Circle(oAE.oPt);
			break;
		case 'elli':
			// Create the Ellipse rx: 50, ry:40,
			oAE.oPt.rx = 30;
			oAE.oPt.ry = 15;
			var oShpe = new fabric.Ellipse(oAE.oPt);
			break;
		case 'tria':
			// Create the Triangle
			var oShpe = new fabric.Triangle(oAE.oPt);
			break;
		case 'line':
			// Create the Line strokeWidth: 2,
			oAE.oPt.stroke = oAE.oPt.fill;
			oAE.oPt.strokeWidth = 1;
			var oShpe = new fabric.Line([50, 50, 200, 100], oAE.oPt);
			break;
		case 'text':
			// Create the text item
			var oShpe = new fabric.Text(oAE.txt, oAE.oPt);
			break;
		}

		// Set the shape ID
		oShpe.xid = oAE.iD;
		// Add the rectangle to the canvas
		canv.add(oShpe);

	}

})