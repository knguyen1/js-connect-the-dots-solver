/**
 * Created by knguyen on 4/13/2015.
 */

$("#solve").click(
    function() {
        drawPolygon(pointsArray);
    }
);

/// <summary>
/// Draws a line between two points using HTMl canvas' context object functions.
/// </summary>
/// <param name="point1">The first point</param>
/// <param name="point2">The second point</param>
function drawLine(point1, point2) {
    //check arguments for null values
    if(!point1 || !point2)
        return false;

    //draw the lines
    context.beginPath();
    context.moveTo(point1.x, point1.y);
    context.lineTo(point2.x, point2.y);
    context.lineWidth = 3;
    context.strokeStyle = "#F00";
    context.stroke();

}

/// <summary>
/// Draw a polygon in an array of coordinates.
/// </summary>
/// <param name="points">The coordinate array.</param>
function drawPolygon(points) {
    //check arguments for null values
    if(!points)
        return false;

    //store the upper-left point, it should be excluded when we sort our array
    var upper = getUpperLeft(pointsArray);

    //sort the array first so we can draw a clockwise polygon
    points.sort(pointSortDelegate);

    //debug
    //console.log(points);

    var i;
    for(i = 0; i < points.length; i++)
        drawLine(points[i-1], points[i]);

    //draw the final line
    drawLine(points[i-1], points[0]);

    /// <summary>
    /// A custom sorting delegate that sorts point1 and point 2 based on their slope
    /// from the upper most point to the array of poinst
    /// </summary>
    /// <param name="point1">The first point</param>
    /// <param name="point2">The second point</param>
    /// <returns>Sorting order of point1 or point2</returns>
    function pointSortDelegate(point1, point2) {

        //the upper point should be excluded from sorting algorithm
        if(point1 === upper)
            return -1;
        if(point2 === upper)
            return 1;

        //find the slopes between point1 and point2, that is, if it were drawn through the upper point
        var m1 = upper.GetSlope(point1);
        var m2 = upper.GetSlope(point2);

        //if point1 and point2 form the same line towards upper
        if(m1 === m2) {
            //the point closest to the upper point will be first
            return point1.GetDistance(upper) < point2.GetDistance(upper) ? -1 : 1;
        }

        //if point1 is to the right of upper and point2 is to the left
        if(m1 <= 0 && m2 > 0)
            return -1;

        //if point2 is to the left of upper and point2 is to the right
        if(m1 > 0 && m2 <= 0)
            return 1;

        //if both slopes are either positive or negative
        return m1 > m2 ? -1 : 1;
    }
}

$("#reset").click(
  function() {
      context.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
      pointsArray = []; //clear the array
  }
);