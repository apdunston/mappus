import {canvasToImage} from './otherPeoplesCode/canvas-to-image.js';
import {Square} from "./models/square.js";
import {Drawing, toggleSquare} from "./models/drawing.js";
import {View, drawView, zoomOut, zoomIn, resetZoom} from "./models/view.js";
import {init as initDrag} from "./drag.js";
import {init as initKeyboard} from "./keyboard.js";

var view = new View(50);

var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

drawView(canvas, view);

function dragCallback(x, y) {
  view.topLeftX = -x;
  view.topLeftY = -y;
  drawView(canvas, view);
}

initDrag(canvas, dragCallback, -view.topLeftX, -view.topLeftY);
initKeyboard(document, canvas, view);


// canvasToImage("main", document, {
//   name: 'myImage',
//   type: 'png',
//   quality: 1
// });
 