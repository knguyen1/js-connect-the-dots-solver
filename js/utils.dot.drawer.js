/**
 * Created by knguyen on 4/13/2015.
 */

//globals for the canvas element and the points array
var pointsArray = [];
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

/// <summary>
/// A custom Point class that contains x and y coordinates of clicked points.
/// Can also calculate slope and distances between points.
/// </summary>
/// <param name="x">The x value</param>
/// <param name="y">The y value</param>
function Point(x, y) { //constructor
    //member variables
    this.x = x;
    this.y = y;

    //public methods
    this.GetDistance = function(that) {
        var dX = that.x - this.x;
        var dY = that.y - this.y;
        return Math.sqrt((dX*dX) + (dY*dY));
    }

    this.GetSlope = function(that) {
        var dX = that.x - this.x;
        var dY = that.y - this.y;
        return dY/dX;
    }
}


/// <summary>
/// Draws the dot and call the function to store the coordinate.
/// </summary>
/// <param name="e">TThe click event object</param>
function drawDot(e) {
    var position = getMousePosition(canvas, e);
    posx = position.x;
    posy = position.y;

    //keep a running list of coordinates
    storeCoordinate(posx, posy);

    //draw the dot
    context.fillStyle = "#F00";
    context.fillRect(posx, posy, 6, 6); //avoid drawing circles as it is more resource intensive
}

/// <summary>
/// Get the mouse position of the click relative to the canvas.
/// </summary>
/// <param name="c">The canvas object</param>
/// <param name="e">The click event object</param>
/// <returns>An object containing and 'x' and 'y' coordinate.</returns>
function getMousePosition(c, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left, y: e.clientY - rect.top
    };
}

/// <summary>
/// Store the x and y coordinates in the myDotsArray object.
/// </summary>
/// <param name="xVal">The 'x' value of the coordinate</param>
/// <param name="yVal">The 'y' value of the coordinate</param>
function storeCoordinate(xVal, yVal) {
    pointsArray.push(new Point(xVal, yVal));
}

/// <summary>
/// Get the upper left point from a coordinates array.  In case of a tie, get the left most point.
/// </summary>
/// <param name="points">The coordinates array</param>
/// <returns>The upper left point</returns>
function getUpperLeft(points) {
    var top = points[0];

    //loop through the array and get the upper left most point
    for(var i = 1; i < points.length; i++) {
        var temp = points[i];
        if(temp.y > top.y || (temp.y == top.y && temp.x < top.x)) {
            top = temp;
        }
    }
    return top;
}

window.drawDot = drawDot;