# js-connect-the-dots-solver

A javascript solver of the connect-the-dots game.



How it works:


---

Click a couple of dots in the canvas area.  These click events will record x-y pairings in a Points array.

	var pointsArray = [];

The magic happens here:  We sort the points via a sorting delegate.

	points.sort(pointSortDelegate);

The resulting array forms a clock-wise polygon.  We then use standard canvas line-drawing capabilities to connect the dots.

TODO:  We can add animations in the line drawing.  But it is not necessary for this exercise.
